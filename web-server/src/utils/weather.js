const request = require('request');

function weather({ lat, lng }, callback) {
    const url = 'http://api.weatherstack.com/current?access_key=8dd121b76715aba773d70afa5db41a05&query=' + lat +',' + lng;
        
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback(error);
            return;
        }
        
        if (body.hasOwnProperty('error')) {
            callback(body.error.info);
            return;
        }    

        const currentWeather = body.current;
        
        callback(false, {
            description: currentWeather.weather_descriptions[0],
            temperature: currentWeather.temperature,
            temperatureFeelsLike: currentWeather.feelslike
        });
    });
}

module.exports = weather;