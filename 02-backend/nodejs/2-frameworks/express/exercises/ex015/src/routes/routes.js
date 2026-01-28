import { Router } from "express";
import multer from "multer";
import multerConfig from "../config/multer.js";

import sessions from "../app/controllers/SessionsController.js";
import customers from "../app/controllers/CustomersController.js";
import contacts from "../app/controllers/ContactsController.js";
import users from "../app/controllers/UsersController.js";
import files from "../app/controllers/FilesController.js";

import auth from "../app/middlewares/auth.js";

const routes = new Router();
const upload = multer(multerConfig);

// Sessions 
routes.post("/sessions", sessions.create);

// Sessions Controller
routes.use(auth);

// Customers
routes.get("/customers", customers.index);
routes.get("/customers/:id", customers.show);
routes.post("/customers", customers.create);
routes.put("/customers/:id", customers.update);
routes.delete("/customers/:id", customers.destroy);

// Contacts
routes.get("/customers/:customerId/contacts", contacts.index);
routes.get("/customers/:customerId/contacts/:id", contacts.show);
routes.post("/customers/:customerId/contacts", contacts.create);
routes.put("/customers/:customerId/contacts/:id", contacts.update);
routes.delete("/customers/:customerId/contacts/:id", contacts.destroy);

// Users 
routes.get("/users", users.index);
routes.get("/users/:id", users.show);
routes.post("/users", users.create);
routes.put("/users/:id", users.update);
routes.delete("/users/:id", users.destroy);

// Files
routes.post("/files", upload.single("file"), files.create);

export default routes;
