import { Router } from "express";
import multer from "multer";
import storage from "./config/multer.js";

import authMiddleware from "./app/middlewares/auth.js";

import UserController from "./app/controllers/usercontroller.js";
import SessionController from "./app/controllers/sessionControllers.js";
import ProductController from "./app/controllers/productControllers.js";
import CategoryController from "./app/controllers/categoryController.js";
import OrderController from "./app/controllers/OrderController.js";
import CreatePaymentIntentController from "./app/controllers/stripe/CreatePaymentIntentController.js";

const routes = new Router();
const upload = multer({ storage });


routes.post("/users", UserController.store);
routes.post("/session", SessionController.store);
routes.post("/create-payment-intent", CreatePaymentIntentController.store);

routes.get("/", (req, res) => {
  return res.json({
    status: "ok",
    message: "DevBurger API is running",
  });
});

routes.use(authMiddleware);


routes.post("/products", upload.single("file"), ProductController.store);
routes.get("/products", ProductController.index);
routes.put("/products/:id", upload.single("file"), ProductController.update);
routes.delete("/products/:id", ProductController.delete);


routes.post("/categories", upload.single("file"), CategoryController.store);
routes.put("/categories/:id", upload.single("file"), CategoryController.update);
routes.get("/categories", CategoryController.index);


routes.post("/orders", OrderController.store);
routes.get("/orders", OrderController.index);
routes.put("/orders/:id", OrderController.update);

export default routes;
