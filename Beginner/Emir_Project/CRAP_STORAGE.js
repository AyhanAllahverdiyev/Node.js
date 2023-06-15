const http = require("http");
const fs = require("fs");

const server = http
  .createServer((request, response) => {
    if (request.url === "/modify") {
      response.write("Status: Running on server\n");
      response.end();

      fs.readFile("./users.json", "utf-8", (err, jsonSTR) => {
        if (err) {
          response.writeHead(500, { "Content-Type": "application/json" });
          response.write("Error while reading the file");
          console.log("Error while reading the file", err);
          response.end();
          return;
        }

        var parse = JSON.parse(jsonSTR);

        response.write("Previous data before being modified:\n");
        response.write(jsonSTR);
        console.log("Previous data before being modified:\n", jsonSTR);
        response.end();

        const data = {
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
        });

        fs.readFile("./users.json", "utf-8", (err, newjsonSTR) => {
          if (err) {
            response.writeHead(500, { "Content-Type": "application/json" });
            response.write(
              "Error occurred while reading the previously modified data\n"
            );
            response.end();
            return;
          }
          response.write("Latest modified data:\n");
          response.write(JSON.stringify(newjsonSTR));
          console.log("Latest modified data:", newjsonSTR);
        });
      });
    }
  })
  .listen(9000);

if (request.url === "/add") {
  const data = fs.readFileSync("./users.json");
  const parsed = JSON.parse(data);
  new_data = {
    id: 20,
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
  //const affirmative = fs.readFile("./users.json");
  fs.readFile("./users.json", "utf-8", (err, affirmative) => {
    if (err) {
      response.setHeader("Content-Type", "application/json");
      console.log("error occured while reading\n");
    }
    console.log("Latest version of JSON :\n", affirmative);
    response.setHeader("Content-Type", "application/json");
    response.write("New data:\n");
    response.write(JSON.stringify(affirmative));
    response.end();
  });
}

//DELETING

if (request.url === "/delete") {
  console.log("Server running\n");
  response.write("Server running\n");
  const jsonSTR = fs.readFileSync("./users.json", "utf-8", (err, jsonSTR) => {
    if (err) {
      response.writeHead(500, { "Context-Type": "application/json" });
      response.write("Error occured while reading");
      console.log("Error occured while reading");
    }
  });
  const parsed = JSON.parse(jsonSTR);
  function Delete_By_Index(id) {
    const index = parsed.findIndex((user) => user.id === id);
    if (index !== -1) {
      parsed.splice(index, 1);
      return true;
    }
    return false;
  }
  const User_To_Delete = 8;
  const Chech_If_Delete = Delete_By_Index(User_To_Delete);
  //   //response.setHeader("Content-Type", "application/json");
  //   if (Chech_If_Delete) {
  //     console.log("ID was found and deleted\n");
  //     fs.writeFile("./users.json", JSON.stringify(parsed), (err) => {
  //       if (err) {
  //         console.log("error occured while Writing", err);
  //         return;
  //       }
  //     });
  //     //const tester = fs.readFileSync("./users.json", "utf-8");
  //  ;
  //     fs.readFile("./users.json", "utf8", (err, tester) => {
  //       if (err) {
  //         console.log("Error", err);
  //       }
  //     });
  //     //tester = JSON.stringify(tester);
  //     console.log("FIlE AFTER UPDATE:", JSON.stringify(tester));
  //     response.write(JSON.stringify(tester));
  //   } else {
  //     console.log("ID WAS NOT FOUND IN FILE\n");
  //     response.write("ID WAS NOT FOUND IN FILE\n");
  //   }

  if (Chech_If_Delete) {
    console.log("Found and deleted");
    response.write("Found and deleted");
    fs.writeFile("./users.json", parsed);
    console.log("latest version:", fs.readFileSync("./users.json", "utf-8"));
  } else {
    console.log("Error accured:", err);
    response.write("Error accured");
  }
}
