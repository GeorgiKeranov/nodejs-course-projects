const request = require('request');

const apiUrl = 'http://api.weatherstack.com/current?access_key=8dd121b76715aba773d70afa5db41a05&query=New%20York';

request({ url: apiUrl, json: true }, (error, response) => {
    console.log(response.body.current);
});