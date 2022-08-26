const express = require("express");
const https = require("https");
const { Http2ServerRequest } = require("http2");


const app = express()
    app.get("/" , function(req,res){
        const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=68e0785a018c559ba5c627e1cbd5d8f4&units=metric"
        
        https.get(url , function(response){

            console.log(response);
            

        })
        res.send("hi i am alive")
    })




    app.listen(3000,function(){
        console.log("Server running on port 3000");
    })
    