const logger = require('winston');

const Sequelize = require('sequelize');
const db = require('../../common/db');

const BadRequestError = require('../../common/errors/BadRequestError');
const ResourceNotFoundError = require('../../common/errors/ResourceNotFoundError');

const tickerMasterWorker = require('../ticketmaster/ticketmaster-worker');

const User = db.define('user', {
    name: {
        type: Sequelize.STRING
    },
    music: {
        type: Sequelize.STRING
    },
    sports: {
        type: Sequelize.STRING
    },
    zipCode: {
        type: Sequelize.INTEGER
    }
});

User.sync({force: true});

function createUser({ name, zipCode, sports, music }) {
    return User.findAll({ where: { name }, raw: true}).then(users => {
        if (users.length > 0) {
            throw new BadRequestError();
        }
        return User.create({ name, zipCode, sports, music }).then(savedUser => savedUser);
    });
}

function updateUser({ name, zipCode, sports, music }) {
    return User.findAll({ where: { name }, raw: true}).then(users => {
        if (users.length > 0) {
            return User.update({ name, zipCode, sports, music }, { where: { name }});
        } else {
            return User.create({ name, zipCode, sports, music });
        }
    });
}

function getUser(name) {
    return User.findAll({ where: { name }, raw: true }).then(users => {
        if (users.length > 0) {
            return users[0];
        }
        throw new ResourceNotFoundError();
    });
}

function getEventsForUser({ name, type }) {
    return this.getUser(name).then(user => {
        return tickerMasterWorker.getEvents({ zipCode: user.zipCode, type, genre: user[type] });
    });
}

module.exports = {
    createUser,
    updateUser,
    getUser,
    getEventsForUser
};