const Sequelize = require('sequelize');
const config = require('config');

console.log(config.get('app.mysql.database'));
console.log(config.get('app.mysql.username'));
console.log(config.get('app.mysql.password'));
console.log(config.get('app.mysql.host'));

const dbConn = new Sequelize(config.get('app.mysql.database'), config.get('app.mysql.username'), config.get('app.mysql.password') + '', {
    host: config.get('app.mysql.host'),
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

dbConn.authenticate().then(() => console.log('successfully connected to db'), err => console.error(err));

module.exports = dbConn;