import express, { Express } from "express";
import * as http from "http";
import cors from "cors";
import helmet from "helmet";
import debug, { IDebugger } from "debug";
import dotenv from "dotenv";
dotenv.config();
import { RouteConfig } from "./Common/common.route.config";
import { BookRoutes } from "./books/book.route.config";

const app: Express = express();
const routes: Array<RouteConfig> = [];

app.use(helmet());
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;
const debugLog: IDebugger = debug("app");

if (process.env.DEBUG) {
  process.on("unhandledRejection", function (reason) {
    debugLog("Unhandled Rejection:", reason);
    process.exit(1);
  });
} else {
}

routes.push(new BookRoutes(app));

export default app;
