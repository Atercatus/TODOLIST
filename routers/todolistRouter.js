import express from "express";
import routes from "../routes";
import {
  getTodolist,
  postNewTask,
  patchTask,
  deleteTask
} from "../controllers/todolistControllers";

const todolistRouter = express.Router();

todolistRouter.get(routes.todolistDetail(), getTodolist);

todolistRouter.post(routes.addTask(), postNewTask);
todolistRouter.patch(routes.patchTask(), patchTask);
todolistRouter.delete(routes.deleteTask(), deleteTask);

export default todolistRouter;
