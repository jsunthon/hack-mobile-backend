const config = require('config');
const rp = require('request-promise');
const logger = require('winston');

const API_KEY = config.get('app.service.ticketmaster.apiKey');
const BASE_URL = config.get('app.service.ticketmaster.url');

function getEvents({ size = 10, zipCode, type, genre }) {
    const uri = `${BASE_URL}/events.json?size=${size}&classificationName=${type},${genre}&postalCode=${zipCode}&apikey=${API_KEY}`;

    logger.info(`Making req to uri: ${uri}`);

    const options = {
        uri,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };

    return rp(options).then(results => results._embedded.events);
}

module.exports = {
    getEvents
};