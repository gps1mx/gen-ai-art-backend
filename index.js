const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

const routes = require("./routes/api");

const port = process.env.PORT || 5500;

app.use(cors());
app.use(express.static("images"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});
