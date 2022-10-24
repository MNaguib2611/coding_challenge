import { Response, NextFunction } from "express";
import BookService from "./book.service";

class BookController {
  constructor() {}

  async index(req: any, res: Response, next: NextFunction) {
    try {
      const books = await BookService.findAll();
      return res.status(200).json({
        success: true,
        data: books,
      });
    } catch (error) {
      next(error);
    }
  }

  async show(req: any, res: Response, next: NextFunction) {
    try {
      const book = await BookService.findBookById(req.params._id);
      if (!book) {
        return res.status(404).json({
          success: false,
          message: "Book Doesn't exist",
        });
      }
      return res.status(200).json({
        success: true,
        data: book,
      });
    } catch (error) {
      next(error);
    }
  }

  async store(req: any, res: Response, next: NextFunction) {
    const { title, author, year } = req.body;
    try {
      const newBook = await BookService.storeBook({
        title,
        author,
        year,
      });
      return res.status(201).json({
        success: true,
        data: newBook,
        message: "Book Created Successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: any, res: Response, next: NextFunction) {
    const { title, author, year } = req.body;
    try {
      const newBook = await BookService.updateById(req.params._id, {
        title,
        author,
        year,
      });
      return res.status(200).json({
        success: true,
        data: newBook,
        message: "Book Updated Successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: any, res: Response, next: NextFunction) {
    try {
      const book = await BookService.findBookById(req.params._id);
      // book;
      if (!book) {
        return res.status(404).json({
          success: false,
          message: "Book Doesn't exist",
        });
      }
      await BookService.deleteById(req.params._id);
      return res.status(200).json({
        success: true,
        message: "Book Deleted Successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new BookController();
