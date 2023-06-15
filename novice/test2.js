var http = require("http");
var fs = require("fs");
var rs = fs.createReadStream("./exampletxt.txt");
rs.on("open", function (request, response) {
  console.log("This file is open!!");
});
