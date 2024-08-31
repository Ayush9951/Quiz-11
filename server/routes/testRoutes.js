const express = require("express");

const {
  createTestController,
  getAllTestsController,
  getTest,
  deleteAllTests,
  checkTestKey,
} = require("../controllers/testController");
const { checkTestAttempt } = require("../controllers/resultController");

const router = express.Router();

router.post("/create-test", createTestController);

router.get("/get-all-tests", getAllTestsController);

router.get("/get-test/:testKey", getTest);

router.delete("/delete-all-tests", deleteAllTests);

router.get("/checkTestKey/:testKey", checkTestKey);

module.exports = router;
