const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9cba1d2d2534501881c28836cabb51e2&query=' + latitude + ',' + longitude

    request({url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!')
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            const data = body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out.";
            callback(undefined, data)
        }
    })
}

module.exports = forecast