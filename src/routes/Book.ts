import express from 'express';
import { ValidateSchema, Schemas } from '../middleware/ValidateSchema';
import controller from '../controllers/Book';

const router = express.Router();

router.post('/create', ValidateSchema(Schemas.book.create), controller.createBook);
router.get('/get/:authorId', controller.readBook);
router.get('/get/', controller.readAll);
router.patch('/update/:authorId', ValidateSchema(Schemas.book.update), controller.updateBook);
router.delete('/delete/:authorId', controller.deleteBook);

export = router;
