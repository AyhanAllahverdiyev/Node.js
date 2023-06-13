const express = require("express");
const app = express();
require("/src/controller/DB/dbConnection");
require("dotenv").config();
const port = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.json({
    message: "Hos Geldiniz!",
  });
});
app.listen(port, () => {
  console.log(`server ${port} portundan calisiyor...`);
});
