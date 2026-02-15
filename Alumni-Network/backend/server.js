const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const dashboardRoutes = require("./routes/dashboardRoutes");
const cors = require("cors");


dotenv.config();

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("Backend running with DB");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
