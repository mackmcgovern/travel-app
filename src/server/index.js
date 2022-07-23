const dotenv = require('dotenv');
dotenv.config();
// call the config function
// const fetch = require("node-fetch");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
// const path = require("path");
const express = require("express");
const app = express()
// const request = require('request');
const cors = require("cors");

app.use(express.static('dist'))

const bodyParser = require("body-parser");
const { response } = require("express");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("dist"));


// Setup Server
app.listen(8082, () => {
  console.log("running on port 8082");
});


// GET Route
app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
  // res.sendFile(path.resolve('src/client/views/index.html'))
});

// API KEYS 
const GEO_USER = process.env.GEONAMES_USERNAME;
const WEATHER_KEY = process.env.WEATHERBIT_KEY;
const PIX_KEY = process.env.PIX_KEY;


app.post('/api', async (req, res) => {
  // geonames API 
  try {
  const geoRes = await fetch(`http://api.geonames.org/searchJSON?q=${req.body.city}&maxRows=10&username=${GEO_USER}`);
  const geoData = await geoRes.json();
    const geo = geoData.geonames[0];
    // console.log(geo);
      
      // weatherbit API 
      const weatherRes = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?units=i&lat=${geo.lat}&lon=${geo.lng}&key=${WEATHER_KEY}`);
      const weatherData = await weatherRes.json();
      // console.log(weatherData);


          // Pixabay API 
          const pixRes = await fetch(`https://pixabay.com/api/?key=28176767-0c7c5a9be01e7a2189dab9bab&q=${geo.toponymName}&image_type=photo$editors_choice=true&per_page=3`);
          const pixData = await pixRes.json();
          const pix = pixData.hits[0];
          // console.log(pix);

            res.send({ geo, weatherData, pixData });
  } catch(err) {
    res.send(err);
  }
          }) 
        
