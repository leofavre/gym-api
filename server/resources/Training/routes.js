const { ObjectID } = require('mongodb');
const { Training } = require('./model.js');

const emptyData = { data: [] };

module.exports = app => {
  app.post('/trainings', async (req, res) => {
    const { completedAt, withTrainer } = req.body;
    const training = new Training({ completedAt, withTrainer });

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
      res.status(404).send(emptyData);
      return undefined;
    }

    try {
      const dbTraining = await Training.findById(id);

      if (dbTraining) {
        res.send({ data: [dbTraining] });
      } else {
        res.status(404).send(emptyData);
      }
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.delete('/trainings/:id', async (req, res) => {
    const { id } = req.params;

    if (!ObjectID.isValid(id)) {
      res.status(404).send(emptyData);
      return undefined;
    }

    try {
      const dbTraining = await Training.findByIdAndDelete(id);

      if (dbTraining) {
        res.send({ data: [dbTraining] });
      } else {
        res.status(404).send(emptyData);
      }
    } catch (err) {
      res.status(400).send(err);
    }
  });

  app.patch('/trainings/:id', async (req, res) => {
    const { withTrainer, completedAt } = req.body;
    const { id } = req.params;

    if (!ObjectID.isValid(id)) {
      res.status(404).send(emptyData);
      return undefined;
    }

    const patch = {};

    if (withTrainer != null) {
      patch.withTrainer = withTrainer;
    }

    if (completedAt != null) {
      patch.completedAt = completedAt;
    }

    try {
      const dbTraining = await Training
        .findByIdAndUpdate(id, { $set: patch }, { new: true });

      if (dbTraining) {
        res.send({ data: [dbTraining] });
      } else {
        res.status(404).send(emptyData);
      }
    } catch (err) {
      res.status(400).send(err);
    }
  });
};
