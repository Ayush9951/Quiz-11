const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  //user name
  name: {
    type: String,
    required: true,
  },
  // user email
  email: {
    type: String,
    required: true,
  },
  marks: {
    type: String,
    required: true,
  },
  // test title
  title: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: String,
  },
  testKey: {
    type: String,
    required: true,
  },
});

const resultModal = mongoose.model("Result", resultSchema);

module.exports = resultModal;
