const questionModel = require("../models/questionModel");

exports.addQuestionController = async (req, res) => {
  try {
    const { title, description, options, branch, subject, answer } = req.body;

    if (
      !title ||
      !description ||
      options.length != 4 ||
      !branch ||
      !subject ||
      !answer
    ) {
      return res.send({
        success: false,
        message: "please fill all the fields",
      });
    }

    const newQuestion = new questionModel({
      title,
      description,
      options,
      branch,
      subject,
      answer,
    });

    await newQuestion.save();

    return res.send({
      success: true,
      message: "Question added successfully",
      newQuestion,
    });
  } catch (error) {
    return res.send({
      success: false,
      error,
    });
  }
};

exports.getAllQuestionsController = async (req, res) => {
  try {
    const allQuestions = await questionModel.find({});

    return res.send({
      success: true,
      count: allQuestions.length,
      allQuestions,
    });
  } catch (error) {
    return res.send({
      success: false,
      error,
    });
  }
};

exports.updateQuestionController = async (req, res) => {
  try {
    // const {
    //   title,
    //   description,
    //   options,
    //   branch,
    //   subject,
    //   correctAnswerNumber,
    // } = req.body;

    // if (
    //   !title ||
    //   !description ||
    //   options.length != 4 ||
    //   !branch ||
    //   !subject ||
    //   !correctAnswerNumber
    // ) {
    //   return res.send({
    //     success: false,
    //     message: "please fill all the fields",
    //   });
    // }

    const { id } = req.params;

    const updatedQuestion = await questionModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    return res.send({
      success: true,
      message: "Question updated successfully",
      updatedQuestion,
    });
  } catch (error) {
    return res.send({
      success: false,
      error,
    });
  }
};

exports.deleteQuestionController = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id);
    const deletedQuestion = await questionModel.findByIdAndDelete(id);

    return res.send({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (error) {
    return res.send({
      success: false,
      error,
    });
  }
};
