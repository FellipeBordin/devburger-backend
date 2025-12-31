
import express from "express";
import routes from "./routes.js";
import path from "path";
import { resolve } from "node:path";
import { fileURLToPath } from "url";
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


app.use(express.json());
app.use(cors());


app.use(express.urlencoded({ extended: true }));


app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use("/product-files", express.static(resolve(__dirname, "..", "uploads")));
app.use("/category-files", express.static(resolve(__dirname, "..", "uploads")));


app.use(routes);

export default app;
