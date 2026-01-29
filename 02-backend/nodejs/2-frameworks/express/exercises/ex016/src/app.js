import "dotenv/config";

import express from "express";
import * as Sentry from "@sentry/node";
import { expressIntegration } from "@sentry/node";
import Youch from "youch";
import "express-async-errors";

import routes from "./routes/routes.js";

import "./database/index.js";

import sentryConfig from "./config/sentry.js";

// import auth from "./app/middlewares/auth.js";

class App {
  constructor() {
    this.server = express();

    Sentry.init({
      dsn: sentryConfig.dsn,
      environment: process.env.NODE_ENV,
      release: "ex016@1.0.0",
      integrations: [expressIntegration()],
      debug: true,
    });

    this.middlewares();
    this.routes();

    Sentry.captureMessage("Sentry iniciado com sucesso 🔥");
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(express.json());
    // this.server.use(auth);
    this.server.use(express.urlencoded({ extended: false }));
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      Sentry.captureException(err);

      if (process.env.NODE_ENV === "development") {
        Sentry.captureException(err); // 👈 força envio
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: "Internal server error" });
    });
  }
}

export default new App().server;
