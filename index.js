const express = require("express");
const { accessLogger } = require("./middleware");
const { json } = require("body-parser");
const cors = require("cors");
const dbConnection = require("./db/dbConnection");

const app = express();

app.use(json());
app.use(accessLogger);
app.use(cors());

dbConnection();

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/post", (req, res) => {
  const { title, content } = req.body;
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
