const express = require("express");
const accessLogger = require("./middleware/AccessLogger");
const { json } = require("body-parser");
const cors = require("cors");
const dbConnection = require("./db/dbConnection");
const authRouter = require("./routes/authRouter");

const app = express();
const port = process.env.PORT || 3000;

app.use(json());
app.use(accessLogger);
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/auth", authRouter);

dbConnection();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
