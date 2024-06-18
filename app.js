const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/app.html");
});

app.post("/getWeather", function (req, res) {
  //   console.log(req.body);
  const city = req.body.cityName;
  const unit = "metric";
  const apiKey = "1b3e770b2c098a00c382a91cd80088eb";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=" +
    unit +
    "&appid=" +
    apiKey;
  //   console.log(url);
  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.setHeader("Content-Type", "text/html");
      res.write(
        "<h3>The weather currently in " + city + " is " + description + ".</h3>"
      );
      res.write(
        "<h1>The temperature in " +
          city +
          " is " +
          temp +
          " degrees celsius.</h1>"
      );
      res.write("<img src=" + imageUrl + ">");
      res.send();
      //   console.log(imageUrl);
    });
  });
});

app.listen(3000, function (res) {
  console.log("Server is running on port 3000");
});
