const request = require('request');

function geocode(keyWords, callback) {
    const keyWordsEncodedForURL = encodeURIComponent(keyWords);

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${keyWordsEncodedForURL}.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback(error);
            return;
        }

        const features = body.features;

        if (!features.length) {
            callback('There are not found places that match your search.');
            return;
        }

        const placeCordinates = features[0].center;
        const lng = placeCordinates[0];
        const lat = placeCordinates[1];

        callback(false, { lat, lng });
    });
}

module.exports = geocode;