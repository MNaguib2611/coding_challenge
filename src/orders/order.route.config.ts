import { RouteConfig } from "../Common/common.route.config";
import { Application } from "express";
import OrderController from "./order.controller";
import multer from "multer";

const upload = multer();

export class OrderRoutes extends RouteConfig {
  constructor(app: Application) {
    super(app, "OrderRoutes");
  }

  configureRoutes() {
    //user routes
    this.app
      .route("/orders")
      .post(upload.single("file"), OrderController.store);
    this.app.route("/orders/:file_name").get(OrderController.show);

    return this.app;
  }
}
