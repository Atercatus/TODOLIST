import express from "express";
import routes from "../routes";
import { getTodolist } from "../controllers/todolistControllers";

const todolistRouter = express.Router();

todolistRouter.get(routes.todolistDetail(), getTodolist);

export default todolistRouter;
