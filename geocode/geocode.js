const request = require('request');
require('./../config/config');

var geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address);
    request({
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.MAPQUESTAPIKEY}&location=${encodedAddress}`,
        json: true
    
    }, (error, response, body) => {
    
        if(!error && body.info.statuscode == 0) {
            callback(undefined, {
                latitude: body.results[0].locations[0].latLng.lat,
                longitude: body.results[0].locations[0].latLng.lng,
            });
        } else {
            callback(`Unable to connect to MapQuest Servers.`);
        }
    });	
};

module.exports.geocodeAddress = geocodeAddress;