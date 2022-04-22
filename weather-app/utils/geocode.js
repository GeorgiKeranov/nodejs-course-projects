const request = require('request');

function geocode(keyWords, callback) {
    const keyWordsEncodedForURL = encodeURIComponent(keyWords);

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + keyWordsEncodedForURL + '.json?'
        + 'access_token=pk.eyJ1IjoiZ2tlcmFub3YiLCJhIjoiY2wyYWt2dzJrMDBtYjNjcnozYnczaWtpciJ9.rOci68dTvbiZzIVPKznnXw';

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback(error);
            return;
        }

        const features = response.body.features;

        if (!features.length) {
            callback('There are not found places that match your search.');
            return;
        }

        const placeCordinates = features[0].center;
        const lng = placeCordinates[0];
        const lat = placeCordinates[1];

        callback(false, {
            lat,
            lng
        });
    });
}

module.exports = geocode;