import { Request, Response } from 'express';
import BooksModel from '../models/Books';

const welcomeApi = (_req: Request, res: Response): void => {
  res.send('Hello welcome to api');
};

const addBooks = async (req: Request, res: Response) => {
  const { title, writer, publish } = req.body;

  try {
    const newBook = new BooksModel({
      title,
      writer,
      yearsPublisher: publish,
    });
    await BooksModel.create(newBook);

    res.status(201).json({ status: 'success', msg: 'success create new book' });
  } catch (error) {
    res.status(403).json({ status: 'error', msg: 'failed create new books', errorMessage: error });
  }
};

const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedBook = await BooksModel.deleteOne({ _id: id });
    if (deletedBook.deletedCount < 1) {
      throw 'book not found';
    }

    res.status(200).json({ status: 'success', msg: 'success delete book' });
  } catch (error) {
    res.status(400).json({ status: 'error', msg: 'failed delete book', errorMsg: error });
  }
};

const getAllBooks = async (req: Request, res: Response) => {
  const limit: any = req.query.limit;
  const page: any = req.query.page;

  const offset: number = (parseInt(page) - 1) * parseInt(limit);

  try {
    const books = await BooksModel.find().limit(parseInt(limit)).skip(offset);

    res.status(200).json({ status: 'success', msg: 'success get all books', books });
  } catch (error) {
    res.status(403).json({ status: 'error', msg: error });
  }
};

const detailBook = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const book = await BooksModel.findOne({ _id: id });

    if (!book) {
      throw 'book id is wrong';
    }

    res.status(200).json({ status: 'success', msg: 'success get detail book', book });
  } catch (error) {
    res.status(400).json({ status: 'error', msg: error });
  }
};

const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, writer, publish } = req.body;

  try {
    const updatedBook = await BooksModel.updateOne(
      { _id: id },
      {
        title,
        writer,
        yearsPublisher: publish,
      }
    );

    if (updatedBook.matchedCount < 1) {
      throw "Book doesn't exist";
    }

    res.status(201).json({ status: 'success', msg: 'success update book' });
  } catch (error) {
    res.status(400).json({ status: 'error', msg: error });
  }
};

export { welcomeApi, addBooks, getAllBooks, deleteBook, detailBook, updateBook };
