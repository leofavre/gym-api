const { expect } = require('chai');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../../index.js');
const { Training } = require('./model.js');

const day = 1000 * 60 * 60 * 24;
const today = new Date().getTime();
const yesterday = new Date(today - day).getTime();

const initialTrainings = [{
  _id: new ObjectID(),
  completedAt: yesterday,
  withTrainer: true
}, {
  _id: new ObjectID(),
  completedAt: today,
  withTrainer: false
}];

beforeEach(async () => {
  await Training.deleteMany({});
  await Training.insertMany(initialTrainings);
});

describe('POST /trainings', () => {
  it('Should create a new training.', done => {
    const validTraining = {
      completedAt: today,
      withTrainer: true
    };

    request(app)
      .post('/trainings')
      .send(validTraining)
      .expect(200)
      .expect(res => {
        expect(res.body.data[0]).to.include(validTraining);
      })
      .end(err => {
        if (err) {
          done(err);
          return undefined;
        }

        Training.find()
          .then(dbTrainings => {
            expect(dbTrainings.length).to.equal(3);
            expect(dbTrainings[2]).to.include(validTraining);
            done();
          })
          .catch(err => {
            done(err);
          });
      });
  });

  it('Should not create a new training with invalid data.', done => {
    request(app)
      .post('/trainings')
      .send({})
      .expect(400)
      .end(err => {
        if (err) {
          done(err);
          return undefined;
        }

        Training.find()
          .then(dbTrainings => {
            expect(dbTrainings.length).to.equal(2);
            done();
          })
          .catch(err => {
            done(err);
          });
      });
  });
});

describe('GET /trainings', () => {
  it('Should get all trainings.', done => {
    request(app)
      .get('/trainings')
      .expect(200)
      .expect(res => {
        expect(res.body.data.length).to.equal(2);

        res.body.data.forEach((item, index) => {
          expect(item).to.include({
            ...initialTrainings[index],
            _id: initialTrainings[index]._id.toHexString()
          });
        });
      })
      .end(done);
  });
});

describe('GET /trainings/:id', () => {
  it('Should get a single training by its id.', done => {
    request(app)
      .get(`/trainings/${initialTrainings[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.data.length).to.equal(1);

        res.body.data.forEach((item, index) => {
          expect(item).to.include({
            ...initialTrainings[index],
            _id: initialTrainings[index]._id.toHexString()
          });
        });
      })
      .end(done);
  });

  it('Should return a 404 if training is not found.', done => {
    const validId = new ObjectID().toHexString();

    request(app)
      .get(`/trainings/${validId}`)
      .expect(404)
      .end(done);
  });

  it('Should return a 404 if id is invalid.', done => {
    request(app)
      .get(`/trainings/bogusId`)
      .expect(404)
      .end(done);
  });
});

describe('DELETE /trainings/:id', () => {
  it('Should delete a single training by its id.', done => {
    request(app)
      .delete(`/trainings/${initialTrainings[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.data.length).to.equal(1);

        res.body.data.forEach((item, index) => {
          expect(item).to.include({
            ...initialTrainings[index],
            _id: initialTrainings[index]._id.toHexString()
          });
        });
      })
      .end(done);
  });

  it('Should return a 404 if training is not found.', done => {
    const validId = new ObjectID().toHexString();

    request(app)
      .delete(`/trainings/${validId}`)
      .expect(404)
      .end(done);
  });

  it('Should return a 404 if id is invalid.', done => {
    request(app)
      .delete(`/trainings/bogusId`)
      .expect(404)
      .end(done);
  });
});
