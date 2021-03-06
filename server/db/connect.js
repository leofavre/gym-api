const mongoose = require('mongoose');
const { MONGODB_URI } = require('../constants.js');

mongoose.Promise = global.Promise;
mongoose.connect(`${MONGODB_URI}`, { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

module.exports = { mongoose };
