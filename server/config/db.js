<<<<<<< HEAD
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Loads variables from .env
=======
// server/config/db.js

const mongoose = require("mongoose");
>>>>>>> 50d7078 (ConnectingDB)

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
<<<<<<< HEAD
      useUnifiedTopology: true
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
=======
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
>>>>>>> 50d7078 (ConnectingDB)
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
