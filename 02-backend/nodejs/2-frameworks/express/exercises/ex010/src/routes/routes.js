import { Router } from "express";
import message from "../app/controllers/HelloController.js"

const routes = new Router();

routes.get("/hello", message.hello)
