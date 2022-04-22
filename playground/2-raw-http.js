const http = require('http');

const url = 'http://api.weatherstack.com/current?access_key=8dd121b76715aba773d70afa5db41a05&query=Sofia%20Buglaria';

const request = http.request(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
        data += chunk.toString();
    });

    response.on('end', () => {
        const body = JSON.parse(data);
        console.log(`The current temperature is ${body.current.temperature}`);
    });
});

request.on('error', function(error) {
    console.log(error);
});

request.end();
