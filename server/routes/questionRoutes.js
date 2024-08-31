const express = require("express");

const {
  addQuestionController,
  getAllQuestionsController,
  updateQuestionController,
  deleteQuestionController,
} = require("../controllers/questionController");

const router = express.Router();

router.post("/add-question", addQuestionController);

router.get("/get-all-questions", getAllQuestionsController);

router.put("/edit-question/:id", updateQuestionController);

router.delete("/delete-question/:id", deleteQuestionController);

module.exports = router;
