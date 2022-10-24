import app from "../app";
import Book from "./book.model";
import bookService from "./book.service";
import mongooseService from "../Common/services/mongoose.service";
import supertest from "supertest";
import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

const dbTeardown = async () => {
  await Book.deleteMany({});
};

describe("Book Crud Test", () => {
  afterAll(async () => {
    await dbTeardown();
    mongooseService.closeConnection();
  });

  describe("book crud ", () => {
    let bookId: string;
    it("should create a new book", async function () {
      const response = await supertest(app).post("/books").send({
        title: "test book",
        author: "test author",
        year: 2022,
      });
      bookId = response.body.data._id;
      expect(response.statusCode).toBe(201);
    });

    it("should return book by id ", async function () {
      const response = await supertest(app).get(`/books/${bookId}`).send();
      expect(response.statusCode).toBe(200);
      expect(response.body.data).not.toBeNull();
      expect(response.body.data.title).toEqual("test book");
      expect(response.body.data.author).toEqual("test author");
      expect(response.body.data.year).toEqual(2022);
    });

    it("should return array of books", async function () {
      const response = await supertest(app).get(`/books`).send();
      expect(response.statusCode).toBe(200);
      expect(response.body.data).not.toBeNull();
      expect(response.body.data.length).toEqual(1);
    });

    it("should update a book ", async function () {
      const response = await supertest(app).put(`/books/${bookId}`).send({
        title: "update test book",
        author: "test author",
        year: 2022,
      });
      expect(response.statusCode).toBe(200);
      expect(response.body.data.title).toEqual("update test book");
    });

    it("should delete a book ", async function () {
      const response = await supertest(app).delete(`/books/${bookId}`).send();
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("Book Deleted Successfully");
      const responseShow = await supertest(app).get(`/books/${bookId}`).send();
      expect(responseShow.statusCode).toBe(404);
    });
  });
});
