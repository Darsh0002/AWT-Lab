const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// connect database
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req,res)=>{
    res.send("API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);
