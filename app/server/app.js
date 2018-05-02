const config = require('config');
const express = require('express');
const logger = require('winston');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false }));

// parse application/json this allows for images for up to 2mb even it says 2.6 when sets to 2mb it allows for 1.5mb max
app.use(bodyParser.json({limit:'5.0mb'}));

const router = require('./router');

app.use('/', router);


const HTTP_PORT = config.get('app.server.port');

const server = app.listen(HTTP_PORT, () => {
    logger.info(`Started server on port ${HTTP_PORT}`);
});