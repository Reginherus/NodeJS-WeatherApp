const request = require('request');
require('./../config/config');

getWeather = (lat,lng, callback) => {
    request({
        url: `https://api.forecast.io/forecast/${process.env.FORECASTIOAPIKEY}/${lat},${lng}`,
        json: true
    }, (error, response ,body) => {
        if(!error && response.statusCode === 200) {
            callback(undefined, {
                time: body.currently.time,
                summary: body.currently.summary,
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature,
                pressure: body.currently.pressure
            });
        } else {
            callback('Unable to fetch data from forecast.io');
        }
    });
}

module.exports.getWeather = getWeather;
