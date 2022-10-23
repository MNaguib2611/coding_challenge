import { RouteConfig } from "../Common/common.route.config";
import { Application } from "express";
import BookController from "./book.controller";

export class BookRoutes extends RouteConfig {
  constructor(app: Application) {
    super(app, "BookRoutes");
  }

  configureRoutes() {
    //user routes
    this.app.route("/books").get(BookController.index);
    this.app.route("/books/:_id").get(BookController.show);
    this.app.route("/books").post(BookController.store);
    this.app.route("/books/:_id").put(BookController.update);
    this.app.route("/books/:_id").delete(BookController.delete);

    return this.app;
  }
}
