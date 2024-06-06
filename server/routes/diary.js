const express = require('express');
const router = express.Router();
const diaryController = require('../controllers/diaryControllers');
const { isAuthenticated } = require('../middleware/isAuthenticated');

router.get('/', isAuthenticated, diaryController.getAllDiary);
router.get('/:id', diaryController.getDiaryDetail);
module.exports = router;
