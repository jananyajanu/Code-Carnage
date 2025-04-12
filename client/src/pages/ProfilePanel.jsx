import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { Nav, Tab, Row, Col, Card, Dropdown } from "react-bootstrap";
import "./ProfilePanel.css";

const ProfilePanel = () => {
  const [userInfo, setUserInfo] = useState({});
  const [globalLeaderboard, setGlobalLeaderboard] = useState([]);
  const [weeklyLeaderboard, setWeeklyLeaderboard] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Fetching user info with token:", token);
        const res = await axios.get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("User info fetched:", res.data);
        setUserInfo(res.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    const fetchLeaderboard = async () => {
      try {
        console.log("Fetching leaderboard data");
        const [globalRes, weeklyRes] = await Promise.all([
          axios.get("/leaderboard/global"),
          axios.get("/leaderboard/weekly"),
        ]);
        console.log("Global leaderboard:", globalRes.data);
        console.log("Weekly leaderboard:", weeklyRes.data);
        setGlobalLeaderboard(globalRes.data);
        setWeeklyLeaderboard(weeklyRes.data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchUserInfo();
    fetchLeaderboard();
  }, []);

  const renderUserCard = (user, index) => {
    console.log("Rendering user card for:", user);
    return (
      <Card className="mb-3 text-center shadow-sm" key={index}>
        <Card.Img variant="top" src={user.avatar || "/default-avatar.png"} />
        <Card.Body>
          <h5>@{user.username}</h5>
          <p>Points: {user.points || user.totalPoints || 0}</p>
          {user.badge && <span className="badge bg-success">{user.badge}</span>}
        </Card.Body>
      </Card>
    );
  };

  const filterLeaderboard = (data) => {
    console.log("Filtering leaderboard with filter:", filter);
    if (filter === "All") return data;
    return data.filter((user) => user.topic === filter);
  };

  return (
    <div className="container mt-4">
      {/* User Info */}
      <Card className="mb-4 shadow">
        <Card.Body>
          <h4>Welcome, {userInfo.username}</h4>
          <p>Email: {userInfo.email}</p>
        </Card.Body>
      </Card>

      {/* Leaderboard Tabs */}
      <Tab.Container defaultActiveKey="global">
        <Nav variant="tabs" className="mb-3">
          <Nav.Item>
            <Nav.Link eventKey="global">Global</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="weekly">Weekly</Nav.Link>
          </Nav.Item>
        </Nav>

        <Dropdown className="mb-3">
          <Dropdown.Toggle variant="secondary" id="dropdown-topic">
            Filter: {filter}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {["All", "Energy", "Waste", "Biodiversity"].map((topic) => (
              <Dropdown.Item
                key={topic}
                onClick={() => {
                  console.log("Filter selected:", topic);
                  setFilter(topic);
                }}
              >
                {topic}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <Tab.Content>
          <Tab.Pane eventKey="global">
            <Row>
              {filterLeaderboard(globalLeaderboard).map(renderUserCard)}
            </Row>
          </Tab.Pane>

          <Tab.Pane eventKey="weekly">
            <Row>
              {filterLeaderboard(weeklyLeaderboard).map(renderUserCard)}
            </Row>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default ProfilePanel;
