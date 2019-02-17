require('./db/connect.js');
const app = require('./app/setup.js');
const { PORT } = require('./constants.js');

require('./resources/Training/route.js')(app);

app.listen(PORT, () => {
  console.log(`Started on port ${PORT}`);
});

module.exports = { app };
