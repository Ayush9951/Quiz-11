const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  questions: [],
  testKey: {
    type: String,
  },
});

const testModel = mongoose.model("Test", testSchema);

module.exports = testModel;
