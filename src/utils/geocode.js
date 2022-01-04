const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoidnJvdW15MiIsImEiOiJja3g2NGg0OXUwbG95Mm9uemJhN2c0ZGhsIn0.BmiNysxrYpPFs93g18GnvQ&limit=1'

    request({url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to locations services!')
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else if (body.message) {
            callback('No matching results', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode