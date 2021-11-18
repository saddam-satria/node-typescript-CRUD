import { Router } from 'express';
import { welcomeApi, addBooks, getAllBooks, deleteBook, detailBook, updateBook } from '../controllers/API';

const router = Router();

router.route('/api/v1').get(welcomeApi);
router.route('/api/v1/books').post(addBooks).get(getAllBooks);
router.route('/api/v1/books/:id').delete(deleteBook).get(detailBook).put(updateBook);

export default router;
