const express = require("express");
const {
  submitTest,
  getResultByTestKey,
  getUserResult,
  getAllResults,
  checkTestAttempt,
} = require("../controllers/resultController");

const router = express.Router();

router.post("/submit-test", submitTest);

router.get("/get-result/:testKey", getResultByTestKey);

router.post("/get-user-result", getUserResult);

router.post("/check-test-attempt", checkTestAttempt);

router.get("/all-results", getAllResults);

module.exports = router;
