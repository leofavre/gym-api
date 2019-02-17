const { expect } = require('chai');
const request = require('supertest');

const { app } = require('./index.js');
const { Training } = require('./resources/Training/model.js');

describe('POST /trainings', () => {
  beforeEach(done => {
    Training.deleteMany({}).then(() => done());
  });

  it('Should create a new training.', done => {
    const validTraining = {
      completedAt: 10050,
      withTrainner: true
    };

    request(app)
      .post('/trainings')
      .send(validTraining)
      .expect(200)
      .expect(res => {
        expect(res.body).to.include(validTraining);
      })
      .end(err => {
        if (err) {
          done(err);
          return undefined;
        }

        Training.find()
          .then(trainings => {
            expect(trainings.length).to.equal(1);
            expect(trainings[0]).to.include(validTraining);
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
          .then(trainings => {
            expect(trainings.length).to.equal(0);
            done();
          })
          .catch(err => {
            done(err);
          });
      });
  });
});
