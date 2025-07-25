const { Router } = require('express');

const diaryController = require('../controllers/diary.js');

const diaryRouter = Router();

diaryRouter.get('/', diaryController);
diaryRouter.get('/:id', diaryController);
diaryRouter.get('/search', diaryController);
diaryRouter.post('/', diaryController);
diaryRouter.patch('/:id', diaryController);
diaryRouter.delete('/:id', diaryController);

module.exports = diaryRouter;