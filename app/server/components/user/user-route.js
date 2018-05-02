'use strict';

const express = require('express');
const router = express.Router();
const userWorker = require('./user-worker');
const BadRequestError = require('../../common/errors/BadRequestError');
const ResourceNotFoundError = require('../../common/errors/ResourceNotFoundError');

function createUser(req, res, next) {
    return userWorker.createUser({ name: req.body.name,
                                        zipCode: req.body.zipCode,
                                        music: req.body.music,
                                        sports: req.body.sports })
        .then((user) => res.status(200).send(user))
        .catch(error => {
            if (error instanceof BadRequestError) {
                return res.status(400).send(error);
            }
        });
}

function updateUser(req, res, next) {
    return userWorker.updateUser({ name: req.body.name,
                                     zipCode: req.body.zipCode,
                                     music: req.body.music,
                                     sports: req.body.sports })
        .then((user) => res.status(200).send(user))
        .catch(error => {
            if (error instanceof BadRequestError) {
                return res.status(400).send(error);
            }
        });
}

function getUser(req, res, next) {
    return userWorker.getUser(req.params.name)
        .then(user => res.status(200).send(user))
        .catch(error => {
            if (error instanceof ResourceNotFoundError) {
                return res.status(404).send(error);
            }
        });
}

function getEventsForUser(req, res, next) {
    return userWorker.getEventsForUser({ name: req.params.name, type: req.params.type })
        .then(events => res.status(200).send(events));
}

router.post('/', createUser);
router.put('/', updateUser);
router.get('/:name', getUser);
router.get('/:name/events/:type', getEventsForUser);

module.exports = router;