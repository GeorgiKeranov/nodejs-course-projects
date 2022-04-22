const geocode = require('./utils/geocode.js');
const weather = require('./utils/weather.js');

// Get the console arguments
const consoleArguments = process.argv;
// Remove the first two elements because they are the path and the name of the file
consoleArguments.splice(0, 2);
// Combine all of the left arguments from console
const placeToCheckTheWeather = consoleArguments.join(' ');

geocode(placeToCheckTheWeather, (error, placeData) => {
    if (error) {
        console.log(error);
        return;
    }
    
    weather(placeData, (error, weatherData) => {
        if (error) {
            console.log(error);
            return;
        }

        console.log(`It is ${weatherData.description} here in ${placeToCheckTheWeather}.`);
        console.log(`It is currently ${weatherData.temperature} degrees out.`);
        console.log(`It feels like a ${weatherData.temperatureFeelsLike} degrees.`);
    });
});