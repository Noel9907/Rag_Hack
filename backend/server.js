const express = require("express");
const errorhandler = require("./middlewares/errorHandler");
const inputRouter = require("./router/input_router");
const cors = require("cors");
const dotenv = require("dotenv").config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/symptom", inputRouter);
app.use(errorhandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
