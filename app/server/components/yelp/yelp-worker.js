const yelp = require('yelp-fusion');

const API_KEY = 'MOQq90DN4LxgCv3uYFvXgoTAMUeyfUJgz3r1TTwxxe1pdRz59tfeNkjaaC50Jpqn0oCBH61gwc37nprJ7vcD6BhnZsyWxFyvoxEK2MPQmQFQIy3getO0UZZlAwXqWnYx';

const client = yelp.client(API_KEY);

function getBusinessesByCategory({ location, categories }) {
    return client.search({ location, categories }).then(results => {
        const businesses = results['jsonBody']['businesses'];

        return businesses.map(({ name, image_url, phone, location, is_closed }) => {
            let displayLoc = location.address1;

            if (location.address2) {
                displayLoc += `, ${location.address2}`;
            }

            displayLoc += `, ${location.city}, ${location.state} ${location.zip_code}`;

            return {
                name,
                image_url,
                phone,
                location: displayLoc,
                is_closed
            };
        });
    });
}

module.exports = {
    getBusinessesByCategory
};


