var http = require("http");
var fs = require("fs");
function myFunction(request, response) {
  if (request.url == "/") {
    console.log(response);
    response.writeHeader(200, { "Context-Type": "text-plain" });

    /*   var degisken = "<html><body><h1>";
    for (a = 1; a < 10; a++) {
      degisken += a + ".Ayhans Server<br>";
    }
    degisken += "</h1></body></html>";
    response.write(degisken);
    response.end();
   */
    fs.createReadStream("./tester.html").pipe(response);
  } else {
    response.writeHeader(404, { "Context-Type": "text-plain" });
    response.write("error in loading");
    response.end();
  }
}
exports.myDate = function () {
  return Date;
};

http.createServer(myFunction).listen(8000);
console.log("Srver running");
