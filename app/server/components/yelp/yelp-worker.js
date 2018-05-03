const yelp = require('yelp-fusion');

const API_KEY = 'MOQq90DN4LxgCv3uYFvXgoTAMUeyfUJgz3r1TTwxxe1pdRz59tfeNkjaaC50Jpqn0oCBH61gwc37nprJ7vcD6BhnZsyWxFyvoxEK2MPQmQFQIy3getO0UZZlAwXqWnYx';

const client = yelp.client(API_KEY);

function getBusinessesByCategory({ location, categories }) {
    return client.search({ location, categories }).then(results => results['jsonBody']['businesses']);
}

module.exports = {
    getBusinessesByCategory
};


