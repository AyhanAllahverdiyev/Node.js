//const blackBackground = "\u001b[40m";
//const resetStyle = "\u001b[0m";

var http = require("http");
//const users = require("./users.json");
const fs = require("fs");
http
  .createServer((request, response) => {
    if (request.url === "/") {
      console.log("Server Status running in 2Terminal");
      // users.forEach((user) => {
      //  response.write(JSON.stringify(user));
      // });
      // response.write("Server status running in Server");
      //console.log(request.url);
      // response.write(user.name);
      // response.write(user.id);
      // response.write(user.age);
      //response.write(user.address);
      //response.setHeader("Content-Type", "application/json");
      // response.write(JSON.stringify(users));
      fs.readFile("./users.json", "utf-8", (err, jsonstr) => {
        console.log(jsonstr);
        response.setHeader("Content-Type", "application/json");
        response.write(jsonstr);
        response.end();
      });
    } else if (request.url === "names") {
      response.write(JSON.stringify(users.name));
      response.end();
    }
  })
  .listen(8090);
