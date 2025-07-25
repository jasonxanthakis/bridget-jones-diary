const { Router } = require('express');

const diaryController = require('../controllers/diary.js');

const diaryRouter = Router();

diaryRouter.get('/', diaryController.index);
diaryRouter.get('/categories/', diaryController.listCat);
diaryRouter.get('/:id', diaryController.show);
diaryRouter.get('/title/:title', diaryController.titles);
diaryRouter.get('/categories/:category', diaryController.categories);
diaryRouter.get('/date/:date', diaryController.dates);
diaryRouter.post('/', diaryController.create);
diaryRouter.patch('/:id', diaryController.update);
diaryRouter.delete('/:id', diaryController.destroy);

module.exports = diaryRouter;