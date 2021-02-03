// const request = require("request")

// const forecast = (latitude, longitude, callback) => {
//     const url = 'http://api.weatherstack.com/current?access_key=5de61a99e1c94f12edf1f5e7a78541b2&query=' + latitude + ',' + longitude + '&units=m'

//     request({url: url, json: true}, (error, response) => {
//         if (error) {
//             callback('Unable to connect to weather forecast!', undefined)
//         } else if (response.body.error) {
//             callback('Unable to find location. Try another search.', undefined)
//         } else {
//             callback(undefined, response.body.current.weather_descriptions[0] + response.body.current.temperature + response.body.current.feelslike)
            
//         }
//     })
// }

// module.exports = forecast

const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e84129bc20b99e3b1452c36379b4e3ff&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out. There is " + body.current.precip + " % chance of rain")
        }
    })
}

module.exports = forecast

