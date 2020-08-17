const moment = require('moment');

module.exports = (date) => moment(date).format('LL');