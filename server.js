const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const error = require("./middleware/error");
const { City, validateInput } = require("./models/City");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Middle ware
app.use(error);
require("./startup/db")();

app.get("/api/cities", async (req, res) => {
  //Get city list from CSV or Database
  let cityList;
  //test
  // cityList = [
  //     {
  //         name: 'Tokyo',
  //         country: 'Japan'
  //     },
  //     {
  //         name: 'Wellington',
  //         country: 'New Zealand'
  //     }
  // ];
  cityList = await City.find().sort('name');
  res.send(cityList);
});

app.delete("/api/cities/:id", async (req, res) => {
  City.findById(req.params.id)
    .then(city => {
      city
        .remove()
        .then(() => res.json({ success: true }))
        .catch(() => res.status(500).json({ success: false }));
    })
    .catch(err => res.status(404).json({ citynotfound: "No city found" }));
});

app.post("/api/cities", async (req, res) => {
    const { errors, isValid} = validateInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }

  City.findOne({ name: req.body.name, country: req.body.country }).then(
    city => {
      if (city) {
        return res.status(400).json({db:"The city is already exist"});
      }
      const newCity = new City({
        name: req.body.name,
        country: req.body.country
      });
      newCity
        .save()
        .then(city => res.json(city))
    }
  ).catch(err => {
    console.log(err);
    res.status(500).json("Failed to add the city");
  });
});

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
