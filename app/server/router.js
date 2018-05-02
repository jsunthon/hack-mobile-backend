const express = require('express');

const router = express.Router();

const ticketMasterRoute = require('./components/ticketmaster/ticketmaster-route');
const userRoute = require('./components/user/user-route');

router.use('/api/ticketmaster', ticketMasterRoute);
router.use('/api/users', userRoute);

module.exports = router;