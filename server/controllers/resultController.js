const resultModal = require("../models/resultModel");

exports.submitTest = async (req, res) => {
  try {
    const { name, email, marks, title, submittedAt, testKey } = req.body;

    const result = new resultModal({
      name,
      email,
      marks,
      title,
      submittedAt,
      testKey,
    });

    await result.save();

    return res.send({
      success: true,
      result,
    });
  } catch (error) {
    return res.send({
      success: false,
      error,
    });
  }
};

exports.getResultByTestKey = async (req, res) => {
  try {
    const { testKey } = req.params;

    const result = await resultModal.find({ testKey });

    if (result.length === 0) {
      return res.send({
        success: false,
        message: "nobody submitted test yet",
      });
    }

    return res.send({
      success: true,
      result,
    });
  } catch (error) {
    return res.send({
      status: false,
      error,
    });
  }
};

exports.getUserResult = async (req, res) => {
  try {
    const { email } = req.body;

    const result = await resultModal.find({ email });

    if (result.length == 0) {
      return res.send({
        status: false,
        message: "No Test attempted yet",
      });
    }

    return res.send({
      success: true,
      attemptCount: result.length,
      result,
    });
  } catch (error) {
    return res.send({
      success: false,
      error,
    });
  }
};

exports.checkTestAttempt = async (req, res) => {
  try {
    const { email, testKey } = req.body;

    const result = await resultModal.find({ email, testKey });

    // a user can give test only time with same testKey
    if (result.length > 0) {
      return res.send({
        success: false,
        message: "you have already attempted the test!",
      });
    }

    return res.send({
      success: true,
    });
  } catch (error) {
    return res.send({
      success: false,
      error,
    });
  }
};

exports.getAllResults = async (req, res) => {
  try {
    const allResults = await resultModal.find({});

    return res.send({
      success: true,
      allResults,
    });
  } catch (error) {
    return res.send({
      success: false,
      error,
    });
  }
};
