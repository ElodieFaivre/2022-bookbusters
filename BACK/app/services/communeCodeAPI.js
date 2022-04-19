const debug = require('debug')('services:communeCodeAPI');

const fetch = require('node-fetch');

const city = {
    async findLocationByCommuneCode(communeCode) {
        const url = `https://api-adresse.data.gouv.fr/search/?q=citycode=${communeCode}`;

        const response = await fetch(url);
        const json = await response.json();

        const location = json.features[0].geometry.coordinates;
        debug (location);
        return location;
    },
};

module.exports = city;
