const request = require('request');

function weather(placeData, callback) {
    const url = 'http://api.weatherstack.com/current?access_key=8dd121b76715aba773d70afa5db41a05&query=' + placeData.lat +',' + placeData.lng;
        
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback(error);
            return;
        }

        const responseBody = response.body;

        if (responseBody.hasOwnProperty('error')) {
            callback(responseBody.error.info);
            return;
        }    

        const currentWeather = responseBody.current;
              
        callback(false, {
            description: currentWeather.weather_descriptions[0],
            temperature: currentWeather.temperature,
            temperatureFeelsLike: currentWeather.feelslike
        });
    });
}

module.exports = weather;