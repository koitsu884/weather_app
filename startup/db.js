const db = require('../config/keys').mongoURI;
const mongoose = require('mongoose');
const csv = require("csvtojson");
path = require("path");
const csvFilePath = path.join(__dirname, "data/country-list.csv");
const { City } = require("../models/City");

async function loadData(){
    //Read from database
  let cityListFromDB = await City.find();
  if (!cityListFromDB || cityListFromDB.length == 0) {
    //   console.log('empty');
    //Read from csv
    await csv()
      .fromFile(csvFilePath)
      .then(res => {
        let cityListFromCSV = res.map(data => {
          return { country: data.country, name: data.capital };
        });
        //console.log(cityList);
        City.insertMany(cityListFromCSV);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = function () {
    mongoose
        .connect(db)
        .then(() => {
            console.log('MongoDB Connected');
            loadData();
        })
        .catch(error => console.log(error));
}