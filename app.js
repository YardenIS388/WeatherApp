const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));





app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");

});

app.post("/",function(req,res){




    const query = req.body.cityName;
    const apiKey="e6810c3da330773666be4c53dced3496";
    const units = "metric";
    const myUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ query+ "&appid="+ apiKey+ "&units=" +units+ "";


    https.get(myUrl, function(response) {
      console.log(response.statusCode);
      response.on("data",function(data){

        const weatherData = JSON.parse(data);

        console.log(data);

        const temp        = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const cityName    = weatherData.name;
        const icon        = weatherData.weather[0].icon;
        const imageURL    = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";

        console.log(temp);
        console.log(description);


        res.write("<h1>The temprature in "+ cityName +" is " + temp + " degress celcius with " + description + "</h1>");
        res.write("<img src="+ imageURL +">");
        res.send();
    });

  })
})









app.listen(3000, function() {
  console.log("Server is running on port 3000.");
})
