const express = require("express");
const app = express();
const https = require("https");

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.render("form");
})
app.post("/",function(req,res){
   
    var query = req.body.cityname;
    const apikey = "your api key
    const units = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+units;
    var date = new Date();
    var format = {
        weekday:"long",
        day:"numeric",
        month:"long"
    };
   
    var day=date.toLocaleDateString("en-UK",format);
    https.get(url,function(response)
    {
        response.on("data",function(data)
        {
            const weatherdata = JSON.parse(data);
            const temp = weatherdata.main.temp;
            const weatherDes = weatherdata.weather[0].description;
            const icon = weatherdata.weather[0].icon;
            const imgurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.render("index",{tempC:temp,weatherdes:weatherDes,dateday:day,img:imgurl,name:query});
        });
    })
})


app.listen(3000,function(){
    console.log("server up on 3000 port")
    console.log("Do not go on any other port you fucking idiot");
    
})
//weather[0].icon
