const mongoose = require('mongoose');
const { MONGO_DB_URI } = require('../constants.js');

mongoose.Promise = global.Promise;
mongoose.connect(`${MONGO_DB_URI}`, { useNewUrlParser: true });

module.exports = { mongoose };
