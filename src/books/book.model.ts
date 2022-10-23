import MongooseService from "../Common/services/mongoose.service";
import { Schema, Model, Document } from "mongoose";
import { IBook } from "./book.interface";

export interface BookDocument extends Document, IBook {}

interface BookModel extends Model<BookDocument> {
  build(attrs: IBook): BookDocument;
}

export const BookSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
});

BookSchema.statics.build = (attrs: IBook) => {
  return new Book(attrs);
};

const Book = MongooseService.getInstance().model<BookDocument, BookModel>(
  "Book",
  BookSchema
);

export default Book;
