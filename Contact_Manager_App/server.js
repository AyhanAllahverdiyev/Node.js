const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
/*app.get("/", (req, res) => {
  res.send("Hello World!");
 });*/

app.use("/api/contacts", require("./Routes/contactRoutes"));

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
