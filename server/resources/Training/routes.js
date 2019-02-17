const { ObjectID } = require('mongodb');
const { Training } = require('./model.js');

module.exports = app => {
  app.post('/trainings', async (req, res) => {
    const training = new Training(req.body);

    try {
      const dbTraining = await training.save();

      res.send({ data: [dbTraining] });
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.get('/trainings', async (req, res) => {
    try {
      const dbTrainings = await Training.find();

      res.send({ data: dbTrainings });
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.get('/trainings/:id', async (req, res) => {
    const { id } = req.params;

    if (!ObjectID.isValid(id)) {
      res.status(404).send();
      return undefined;
    }

    try {
      const dbTraining = await Training.findById(id);

      if (dbTraining) {
        res.send({ data: [dbTraining] });
      } else {
        res.status(404).send();
      }
    } catch (err) {
      res.status(400).send(err);
    }
  });
};
