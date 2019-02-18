let { MONGODB_URI, PORT } = process.env;
const { NODE_ENV } = process.env;

if (!MONGODB_URI) {
  MONGODB_URI = (!NODE_ENV || NODE_ENV === 'development')
    ? 'mongodb://localhost:27017/GymApp'
    : 'mongodb://localhost:27017/GymAppTest';
}

if (!PORT) {
  PORT = (!NODE_ENV || NODE_ENV === 'development')
    ? 3456
    : 3455;
}

module.exports = {
  MONGODB_URI,
  PORT
};
