const resultModal = require("../models/resultModel");
const testModel = require("../models/testModel");

exports.createTestController = async (req, res) => {
  try {
    const { title, time, branch, subject, questions } = req.body;

    if (!title || !time || !branch || !subject) {
      return res.send({
        success: false,
        message: "Please fill all the fields",
      });
    }

    if (questions.length === 0) {
      return res.send({
        success: false,
        message: "Need to add 1 question atleast",
      });
    }

    // create a testKey
    const testKey = Math.floor(new Date().getTime());

    const newTest = new testModel({
      title,
      time,
      branch,
      subject,
      questions,
      testKey,
    });

    await newTest.save(0);

    return res.send({
      success: true,
      message: "Test created successfully",
      testKey: newTest.testKey,
    });
  } catch (error) {
    return res.send({
      status: false,
      error,
    });
  }
};

exports.getAllTestsController = async (req, res) => {
  try {
    const allTests = await testModel.find({});

    return res.send({
      success: true,
      count: allTests.length,
      allTests,
    });
  } catch (error) {
    return res.send({
      status: false,
      error,
    });
  }
};

// get test details using test key

exports.getTest = async (req, res) => {
  try {
    const { testKey } = req.params;

    // const checkAttempt = await resultModal.find({ testKey, email });

    // if (checkAttempt) {
    //   return res.send({
    //     status: false,
    //     message: "You have aready attempted the test",
    //   });
    // }

    const test = await testModel.find({ testKey });

    if (test.length === 0) {
      return res.send({
        success: false,
        message: "No test found",
      });
    }

    return res.send({
      success: true,
      test,
    });
  } catch (error) {
    return res.send({
      success: false,
      error,
    });
  }
};

exports.deleteAllTests = async (req, res) => {
  try {
    const { data } = await testModel.deleteMany({});

    return res.send({
      data,
    });
  } catch (error) {
    return res.send({
      success: false,
      error,
    });
  }
};

exports.checkTestKey = async (req, res) => {
  const { testKey } = req.params;
  try {
    const test = await testModel.find({ testKey });

    if (test.length == 0) {
      return res.send({
        success: false,
        message: "Invalid Test Key",
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
