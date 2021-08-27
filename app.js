const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
 res.sendFile(__dirname + "/index.html");
})


app.post("/", function(req, res){
  const query = req.body.cityName;
  const apiKey = process.env.API_KEY;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid="+apiKey;
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const weatherDes = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const iconURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<h1>The weather is currently "+ weatherDes + "</h1>");
      res.write("<h3>The temperature in "+query+" is " + temp + " degree Celcius</h3>");
      res.write("<img src="+iconURL+">")
      res.send()
    });
  });
})





app.listen(3000, function(){
  console.log("Server is Running");
})
