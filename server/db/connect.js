const mongoose = require('mongoose');
const { DATABASE_URL } = require('../constants.js');

mongoose.Promise = global.Promise;
mongoose.connect(`${DATABASE_URL}/GymApp`, { useNewUrlParser: true });

module.exports = { mongoose };
