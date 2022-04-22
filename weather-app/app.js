const request = require('request');

const apiUrl = 'http://api.weatherstack.com/current?access_key=YOUR_API_KEY_HERE&query=New%20York';

request({ url: apiUrl }, (error, response) => {
    const responseObj = JSON.parse(response.body);

    console.log(responseObj.current);
});