import Book from "./book.model";
import { IBook } from "./book.interface";
class BookService {
  async findAll() {
    return Book.find({}).exec();
  }

  async findBookById(_id: string) {
    return Book.findOne({ _id }).exec();
  }

  async storeBook(data: IBook) {
    try {
      const book = Book.build(data);
      await book.save();
      return book;
    } catch (e) {
      if (e instanceof Error) throw new Error(String(e));
    }
  }

  async updateById(_id: string, data: IBook) {
    try {
      await Book.findOneAndUpdate({ _id }, { ...data }).exec();
      return Book.findOne({ _id }).exec();
    } catch (e) {
      if (e instanceof Error) throw new Error(String(e));
    }
  }

  async deleteById(_id: string) {
    try {
      await Book.deleteOne({ _id }).exec();
    } catch (e) {
      if (e instanceof Error) throw new Error(String(e));
    }
  }
}

export default new BookService();
