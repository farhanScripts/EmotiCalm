const express = require('express');
const router = express.Router();
const diaryController = require('../controllers/diaryControllers');
const { isAuthenticated } = require('../middleware/isAuthenticated');

router.get('/', isAuthenticated, diaryController.getAllDiary);
router.get('/add', diaryController.addDiary);
router.post('/add', diaryController.newDiary);
router.get('/:id', diaryController.getDiaryDetail);
router.put('/:id', diaryController.updateDiary);
router.delete('/:id/delete', diaryController.deleteDiary);
module.exports = router;
