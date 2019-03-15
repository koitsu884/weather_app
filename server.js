const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const error = require('./middleware/error');
const {City} = require('./models/City');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Middle ware
app.use(error);
require('./startup/db')();

app.get('/api/cities', async (req, res) => {
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
    cityList = await City.find();
    res.send(cityList);
})

app.delete('/api/cities/:id', async (req, res) => {
    City.findById(req.params.id)
        .then(city => {
            city.remove()
                .then(() => res.json({success: true}))
                .catch(() => res.status(500).json({success: false}))
        })
        .catch(err => res.status(404).json({citynotfound: 'No city found'}));
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));