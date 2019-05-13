import express from "express";
import routes from "../routes";
import { showTodolist } from "../controllers/todolistController";

const todolistRouter = express.Router();

todolistRouter.get("/", showTodolist);

export default todolistRouter;
