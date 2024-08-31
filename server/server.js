const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const questionRoutes = require("./routes/questionRoutes");
const testRoutes = require("./routes/testRoutes");
const resultRoutes = require("./routes/resultRoutes");

// env config
dotenv.config();

// create connection
connectDB();

// app
const app = express();

// middlewares
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/questions", questionRoutes);
app.use("/api/v1/tests", testRoutes);
app.use("/api/v1/results", resultRoutes);

// port
const PORT = process.env.PORT;

// listen
app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
