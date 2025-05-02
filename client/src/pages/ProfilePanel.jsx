import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { Nav, Tab, Row, Card, Dropdown } from "react-bootstrap";
import "./ProfilePanel.css";

const ProfilePanel = () => {
  const [userInfo, setUserInfo] = useState({});
  const [globalLeaderboard, setGlobalLeaderboard] = useState([]);
  const [weeklyLeaderboard, setWeeklyLeaderboard] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const [userRes, globalRes, weeklyRes] = await Promise.all([
          axios.get("/user/profile", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("/leaderboard/global"),
          axios.get("/leaderboard/weekly"),
        ]);

        setUserInfo(userRes.data);
        setGlobalLeaderboard(globalRes.data);
        setWeeklyLeaderboard(weeklyRes.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Something went wrong while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderUserCard = (user, index) => (
    <Card className="mb-3 text-center shadow-sm" key={index}>
      <Card.Img variant="top" src={user.avatar || "/default-avatar.png"} />
      <Card.Body>
        <h5>@{user.username}</h5>
        <p>Points: {user.points || user.totalPoints || 0}</p>
        {user.badge && <span className="badge bg-success">{user.badge}</span>}
      </Card.Body>
    </Card>
  );

  const filterLeaderboard = (data) => {
    if (filter === "All") return data;
    return data.filter((user) => user.topic === filter);
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center text-danger mt-5">{error}</div>;

  return (
    <div className="container mt-4">
      <Card className="mb-4 shadow">
        <Card.Body>
          <h4>Welcome, {userInfo.username}</h4>
          <p>Email: {userInfo.email}</p>
        </Card.Body>
      </Card>

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
              <Dropdown.Item key={topic} onClick={() => setFilter(topic)}>
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
