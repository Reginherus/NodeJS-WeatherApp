const request = require('request');
const yargs = require('yargs');
const axios = require('axios');

const argv = yargs 
.options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true
    }
})
.help()
.alias('help', 'h')
.argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=QYONmHYUzbLbBK7awacKMZnbjUChkY7Z&location=${encodedAddress}`

axios.get(geocodeUrl).then((response) => {
    if(response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address');
    }
    var lat = response.data.results[0].locations[0].latLng.lat;
    var lng = response.data.results[0].locations[0].latLng.lng;
    var weatherUrl = `https://api.forecast.io/forecast/06ac4b3ced893442259787f8168ba0d1/${lat},${lng}`
    console.log('===============================================================================================');
    var loc = response.data.results[0].locations[0];
    console.log(`Weather results for: ${loc.street}, ${loc.adminArea5}, ${loc.adminArea3}, ${loc.adminArea1}`);

    return axios.get(weatherUrl);
}).then((response) => {
    var temperature = response.data.currently.temperature,
        time = response.data.currently.time,
        summary = response.data.currently.summary,
        temperature = response.data.currently.temperature,
        apparentTemperature = response.data.currently.apparentTemperature,
        pressure = response.data.currently.pressure
        
        console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`);
        console.log(`The pressure is: ${pressure}`);
        console.log(`It is ${summary}`);
        console.log('===============================================================================================');
    
}).catch((e) => {
    if(e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API service.')
    } else {
        console.log(e.message);
    }
});






