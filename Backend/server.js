const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectDB = require("./config/db");
const port = process.env.PORT;
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
connectDB();
app.use(express.urlencoded({ extended: false }));

app.use("/cpp/user", require(`./routes/userRoutes`));

app.listen(port, () => {
  console.log("Server Started and Port Number", port);
});
