const { Training } = require('./model.js');

module.exports = app => {
  app.post('/trainings', async (req, res) => {
    const training = new Training(req.body);

    try {
      const response = await training.save();
      res.send(response);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.get('/trainings', async (req, res) => {
    try {
      const trainings = await Training.find();
      res.send({ trainings });
    } catch (err) {
      res.status(400).send(err);
    }
  });
};
