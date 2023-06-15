var express = require("express");
var app = express();
var fs = require("fs");

app.get("/sorgula", function (request, response) {
  response.end("kullanici sorgulayan cagiri");
});

app.get("/listele", function (request, response) {
  response.send("kullanicilari listeleyen cagiri");
});

app.get("/ekle", function (request, response) {
  //response.end("kullanici ekleyen cagiri");
  var yeni_Kullanici = {
    k3: {
      isim: "ahmet",
      sifre: 9999,
      email: "ahmet@gmail.com",
    },
  };
  fs.readFile("./users.json", "utf-8", function (err, data) {
    data = JSON.parse(data);
    data["k3"] = yeni_Kullanici["k3"];
    console.log(data);
    response.end(JSON.stringify(data));
  });
});

app.get("/sil", function (request, response) {
  response.end("kullanici silen cagiri");
});

var server = app.listen(8000, function () {
  console.log("sunucu calisiyor");
});
