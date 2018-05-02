'use strict';

const express = require('express');
const router = express.Router();
const ticketmasterWorker = require('./ticketmaster-worker');

function getEventsByZipCode(req, res, next) {

}

function getEvents(req, res, next) {
    return ticketmasterWorker.getEvents({ type: req.query.type, genre: req.query.genre, size: req.query.size, zipCode: req.query.zipCode })
        .then(events => res.status(200).send(events))
        .catch(err => res.status(500).send(err));
}

router.get('/events', getEvents);

module.exports = router;