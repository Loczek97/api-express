const express = require("express");
const { accessLogger } = require("./middleware");
const { json } = require("body-parser");
const cors = require("cors");
const dbConnection = require("./db/dbConnection");
const postsRouter = require("./routes/postsRouter");

const app = express();
const port = process.env.PORT || 3000;

app.use(json());
app.use(accessLogger);
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}))

app.use("/posts", postsRouter);

dbConnection();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});