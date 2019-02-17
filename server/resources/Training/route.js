const { Training } = require('./model.js');

module.exports = app => {
  app.post('/trainings', async (req, res) => {
    console.log(req.body);

    const training = new Training(req.body);

    try {
      const doc = await training.save();
      res.send(doc);
    } catch (err) {
      res.status(400).send(err);
    }
  });
};
