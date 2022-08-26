const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
//body parser allows to look thru the body of the post request.(accessed by name given in input)
const { Http2ServerRequest } = require("http2");




const app = express();

    app.use(bodyParser.urlencoded({extended: true}));
    app.get("/" , function(req,res){
      
        res.sendFile(__dirname + "/index.html")
    })


    // post request
    app.post("/" , function(req,res){
    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=68e0785a018c559ba5c627e1cbd5d8f4&units=metric"
        
        https.get(url , function(response){
        console.log(response.statusCode);
            
        response.on("data", function(data){
            // console.log(data);
            const weatherData = JSON.parse(data);
            console.log(weatherData);

             const temp = weatherData.main.temp;
            // console.log(temp);

            const  cityDescription = weatherData.weather[0].description;

            const wind = weatherData.wind.speed;
            // console.log(wind);

            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png"

            res.write("<p>The wind speed in" + query + " is " + wind + "</p>");
            res.write("The weather in "+ query + " is " + cityDescription);
            res.write("The temprature is currently "+ temp)

            res.write("<img src = " + imageURL + ">");
            res.send();

        })

        })
        // console.log("received");
    })




    app.listen(3000,function(){
        console.log("Server running on port 3000");
    })
    





   