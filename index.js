const express = require("express");
const app = express();
const cors = require('cors');
const axios = require('axios');
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin:"*"
}))

let data = [];

// Make a request for a user with a given ID
axios.get('https://apitest2.smartsevak.com/places')
  .then(function (response) {
    // handle success
    data = response.data.data;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });

  function distance(lat1,lat2, lon1, lon2)
    {
        // The math module contains a function
        // named toRadians which converts from
        // degrees to radians.
        lon1 =  lon1 * Math.PI / 180;
        lon2 = lon2 * Math.PI / 180;
        lat1 = lat1 * Math.PI / 180;
        lat2 = lat2 * Math.PI / 180;
   
        // Haversine formula
        let dlon = lon2 - lon1;
        let dlat = lat2 - lat1;
        let a = Math.pow(Math.sin(dlat / 2), 2)
                 + Math.cos(lat1) * Math.cos(lat2)
                 * Math.pow(Math.sin(dlon / 2),2);
               
        let c = 2 * Math.asin(Math.sqrt(a));
   
        // Radius of earth in kilometers. Use 3956
        // for miles
        let r = 6371;
   
        // calculate the result
        return(c * r);
    }
 

app.use(express.json());
app.get("/params",function(req,res){
    for(place in data)
    {
        data[place].dist = distance(req.body.lat,data[place].lat,req.body.lng,data[place].lng);
    }
    data.sort((data1,data2) => (data1.dist > data2.dist ? 1:-1));
    res.send(data);
})

app.listen(PORT,function(){
    console.log(`The app is listening in port ${PORT}`);
})