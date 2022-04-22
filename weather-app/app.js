const request = require('request');

const apiUrl = 'http://api.weatherstack.com/current?access_key=8dd121b76715aba773d70afa5db41a05&query=Sofia,Bulgaria';

request({ url: apiUrl, json: true }, (error, response) => {
    const currentWeather = response.body.current;

    const currentTemperature = currentWeather.temperature;
    const currentTemperatureFeelsLike = currentWeather.feelslike;

    console.log(`It is currently ${currentTemperature} degrees out but if feels like a ${currentTemperatureFeelsLike}.`);
});