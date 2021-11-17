import { Schema, model } from 'mongoose';
import { BooksInterface } from '../interface';

const booksSchema = new Schema<BooksInterface>({
  title: {
    type: String,
  },
  writer: {
    type: String,
  },
  yearsPublisher: {
    type: String,
  },
});

const BooksModel = model('books', booksSchema);
export default BooksModel;
