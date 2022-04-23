const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const weather = require('./utils/weather.js');

const app = express();

// Define the root directory to be the parent one of that file
const rootDirectory = path.join(__dirname, '..');

// Setup template engine and templates directory
app.set('views', rootDirectory + '/views/templates');
app.set('view engine', 'hbs');
hbs.registerPartials(rootDirectory + '/views/partials');

// Setup static files directory
app.use(express.static(rootDirectory + '/public'));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Hello from dynamic title'
    });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/weather', (req, res) => {
    const requestQuery = req.query;
    
    if (!requestQuery.address) {
        res.send({
            error: 'Please provide an "address" property to get the current weather!'
        });

        return;
    }

    geocode(requestQuery.address, (error, locationData) => {
        if (error) {
            res.send({ error });
        }

        weather(locationData, (error, currentWeather) => {
            if (error) {
                res.send({ error });
            }
            
            res.send(currentWeather);
        })
    });
});

app.get('*', (req, res) => {
    res.render('404');
});

app.listen(3000, () => {
    console.log('Server is up and running on port 3000.')
});