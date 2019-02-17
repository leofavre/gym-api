const { model } = require('mongoose');

const Training = model('Training', {
  completedAt: {
    type: Number,
    required: true
  },
  withTrainner: {
    type: Boolean,
    default: false
  }
});

module.exports = { Training };
