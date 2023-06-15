var http = require("http");
var fs = require("fs");
const { Console } = require("console");
const { stringify } = require("querystring");
const { parse } = require("path");

http
  .createServer((request, response) => {
    if (request.url === "/") {
      console.log(" Status:Running on terminal ");
      response.write("Status: Running on server");
      response.end();
    } else if (request.url === "/users") {
      response.setHeader("Content-Type", "application/json");
      console.log(" Status:Running on terminal ");
      response.write("Status: Running on server");
      fs.readFile("./users.json", "utf-8", (err, jsonSTR) => {
        console.log(jsonSTR);
        response.write(jsonSTR);
        response.end();
      });
    } else if (request.url === "/names") {
      response.setHeader("Content-Type", "application/json");
      console.log(" Status:Running on terminal ");
      response.write("Status: Running on server");

      fs.readFile("./users.json", "utf-8", (err, jsonSTR) => {
        const parsedJSON = JSON.parse(jsonSTR);
        const names = parsedJSON.map((person) => person.name);

        console.log(names);
        response.write(JSON.stringify(names));
        response.end();
      });
    } else if (request.url === "/ages") {
      response.setHeader("Content-Type", "application/json");
      console.log(" Status:Running on terminal ");
      response.write("Status: Running on server");
      fs.readFile("./users.json", "utf-8", (err, jsonSTR) => {
        const parsed = JSON.parse(jsonSTR);
        const ages = parsed.map((person) => person.age);
        console.log(ages);
        response.write(JSON.stringify(ages));
        response.end();
      });
    } else if (request.url === "/id_address") {
      response.writeHead(200, { "Content-Type": "application/json" });
      console.log(" Status:Running on terminal ");
      response.write("Status: Running on server");
      fs.readFile("./users.json", "utf-8", (err, jsonSTR) => {
        const parsed = JSON.parse(jsonSTR);
        const id = parsed.map((person) => person.id);
        const address = parsed.map((person) => person.address);
        const data = {
          id: id,
          address: address,
        };
        console.log(data);

        response.write(JSON.stringify(data));

        response.end();
      });
    } else if (request.url === "/modify") {
      //Response.write  algilanmiyor
      //Buyuk ihtimalle bir setheader problemi yasaniyor
      //onun disinda Console tarafinda ve JSON dosyasinda veri basarili bir sekilde guncellenmis
      //error yok ama response tarafi bos
      response.write("Status: Running on server  \n ");
      response.end();
      fs.readFile("./users.json", "utf-8", (err, jsonSTR) => {
        if (err) {
          response.writeHead(500, { "Content-Type": "application/json" });
          response.write("Error  while reading the file");
          console.log("Error while reading the file", err);
          response.end();
          return;
        }
        var parse = JSON.parse(jsonSTR);

        response.write("Previous data before being modified:\n");
        response.write(jsonSTR);
        console.log("Previous data before being modified:", jsonSTR);
        response.end();
        data = {
          id: 10,
          name: "Ayhan",
          age: 20,
          address: "Golbasi/bahcelievler/296-51",
        };

        fs.writeFile("./users.json", JSON.stringify(data), "utf-8", (err) => {
          if (err) {
            console.log("Failed to modify data");
            response.writeHead(500, { "Content-Type": "application/json" });
            response.write("Failed to modify data");
            response.end();
            return;
          }
          console.log("Data modified");
          response.write("Data modified");
        });
        fs.readFile("./users.json", "utf-8", (err, newjsonSTR) => {
          if (err) {
            response.writeHead(500, { "Content-Type": "application/json" });
            response.write(
              "Error occured while reading the previously modified data \n"
            );
            response.end();
            return;
          }
          response.writeHead(200, { "Context-Type": "application/json" });
          response.write("Latest modified data :\n");
          response.write(JSON.stringify(newjsonSTR));
          console.log("Latest modified data:", newjsonSTR);
        });
      });
    } else if (request.url === "/find") {
      console.log("Server running...\n");
      response.write("Server running... \n");
      function findStringInJsonFile(filePath, searchString) {
        const fileData = fs.readFileSync(filePath);
        const jsonData = JSON.parse(fileData);

        const stack = [jsonData];

        while (stack.length > 0) {
          const currentItem = stack.pop();

          if (
            typeof currentItem === "string" &&
            currentItem.includes(searchString)
          ) {
            console.log("String found:", currentItem);
            return;
          }

          if (typeof currentItem === "object") {
            for (const key in currentItem) {
              stack.push(currentItem[key]);
            }
          }
        }

        console.log("String not found.");
      }

      const filePath = "./users.json";
      const searchString = " Oak";
    } else if (request.url === "/add") {
      const data = fs.readFileSync("./users.json");
      const parsed = JSON.parse(data);
      new_data = {
        id: 9,
        name: "Will Smith",
        age: 35,
        address: "298 East drive Surakhani",
      };
      parsed.push(new_data);
      const updated_json = JSON.stringify(parsed);
      fs.writeFile("./users.json", JSON.stringify(parsed), "utf-8", (err) => {
        if (err) {
          response.writeHead(500, { "Content-Type": "application/json" });
          response.write("error ocured");
          response.end();
        }
        console.log("New data written back successfully");
        response.write("New data written back successfully");
      });
      const affirmative = JSON.stringify(fs.readFileSync("./users.json"));
      console.log("Latest version of JSON :\n", affirmative);
      response.setHeader("Content-Type", "application/json");
      response.write("New data:\n");
      response.write(JSON.stringify(affirmative));
      response.end();
    } else {
    }
  })
  .listen(9000);
