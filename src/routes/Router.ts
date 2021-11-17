import { Router } from 'express';
import { welcomeApi, addBooks, getAllBooks, deleteBook } from '../controllers/API';

const router = Router();

router.route('/api/v1').get(welcomeApi);
router.route('/api/v1/books').post(addBooks).get(getAllBooks);
router.route('/api/v1/books/:id').delete(deleteBook);

export default router;
