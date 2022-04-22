const request = require('request');

// Get the console arguments
const consoleArguments = process.argv;
// Remove the first two elements because they are the path and the name of the file
consoleArguments.splice(0, 2);
// Combine all of the left arguments from console
const placeToCheckTheWeather = consoleArguments.join(' ');

const mapboxApiUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + placeToCheckTheWeather.replace(' ', '%20') +
    '.json?access_token=pk.eyJ1IjoiZ2tlcmFub3YiLCJhIjoiY2wyYWt2dzJrMDBtYjNjcnozYnczaWtpciJ9.rOci68dTvbiZzIVPKznnXw';

request({ url: mapboxApiUrl, json: true }, (error, response) => {
    if (error) {
        console.log(error);
        return;
    }

    const features = response.body.features;

    if (!features.length) {
        console.log('There are not found places that match your search.');
        return;
    }

    const placeCordinates = features[0].center;
    const lng = placeCordinates[0];
    const lat = placeCordinates[1];
    
    const weatherApiUrl = 'http://api.weatherstack.com/current?access_key=8dd121b76715aba773d70afa5db41a05&query=' + lat +',' + lng;
    
    request({ url: weatherApiUrl, json: true }, (error, response) => {
        if (error) {
            console.log(error);
            return;
        }

        const responseBody = response.body;

        if (responseBody.hasOwnProperty('error')) {
            console.log(responseBody.error.info);
            return;
        }    

        const currentWeather = responseBody.current;
    
        const currentTemperature = currentWeather.temperature;
        const currentTemperatureFeelsLike = currentWeather.feelslike;
        const weatherDescription = currentWeather.weather_descriptions[0];
    
        console.log(`It is ${weatherDescription} here in ${placeToCheckTheWeather}.`);
        console.log(`It is currently ${currentTemperature} degrees out.`);
        console.log(`It feels like a ${currentTemperatureFeelsLike} degrees.`);
    });
});
