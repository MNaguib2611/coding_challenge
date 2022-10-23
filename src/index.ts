import express, { Express, Application, Request, Response } from "express";
import * as http from "http";
import cors from "cors";
import helmet from "helmet";
import { RouteConfig } from "./Common/common.route.config";
import debug, { IDebugger } from "debug";
import dotenv from "dotenv";
dotenv.config({});

var bodyParser = require("body-parser");
const app: Express = express();
const routes: Array<RouteConfig> = [];

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(helmet());
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;
const debugLog: IDebugger = debug("app");

if (process.env.DEBUG) {
  process.on("unhandledRejection", function (reason) {
    debugLog("Unhandled Rejection:", reason);
    process.exit(1);
  });
} else {
}
app.route(`/`).get((req, res) => {
  console.log(req);
  res.json({ message: "hello" });
});

const server: http.Server = http.createServer(app);
server.listen(PORT, () => {
  debugLog(`Server is running on ${PORT}`);

  routes.forEach((route: RouteConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });
});
