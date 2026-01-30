import "dotenv/config";

import express from "express";
import routes from "./routes/routes.js";

import "./database/index.js";

// import auth from "./app/middlewares/auth.js";

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.server.use(express.json());
    // this.server.use(auth);
  }
  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
