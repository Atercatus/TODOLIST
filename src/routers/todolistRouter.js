import express from "express";
import routes from "../routes";
import {
  getTodolist,
  postNewTask,
  patchTask,
  deleteTask,
  patchTaskStatus,
  deleteList,
  modifyListTitle
} from "../controllers/todolistControllers";

const todolistRouter = express.Router();

todolistRouter.get(routes.todolistDetail(), getTodolist);
todolistRouter.delete(routes.deleteList(), deleteList);
todolistRouter.patch(routes.modifyListTitle(), modifyListTitle);

todolistRouter.post(routes.addTask(), postNewTask);
todolistRouter.patch(routes.patchTask(), patchTask);
todolistRouter.delete(routes.deleteTask(), deleteTask);
todolistRouter.patch(routes.patchTaskStatus(), patchTaskStatus);

export default todolistRouter;
