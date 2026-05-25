const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

// Logger middleware
const logger = require("./middleware/loggerMiddleware");
app.use(logger);

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));

app.get("/", (req, res) => {
  res.send("LMS API Running...");
});

// Error middleware
const errorHandler = require("./middleware/errorMiddleware");
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});