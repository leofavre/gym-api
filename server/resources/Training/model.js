const { model } = require('mongoose');

const Training = model('Training', {
  completedAt: {
    type: Number,
    required: true
  },
  withTrainer: {
    type: Boolean,
    default: false
  }
});

module.exports = { Training };
