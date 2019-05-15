import express from "express";
import routes from "../routes";
import { home, showlist } from "../controllers/globalControllers";
import { getNewList, postNewList } from "../controllers/todolistControllers";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.showList, showlist);

globalRouter.get(routes.newList, getNewList);
globalRouter.post(routes.newList, postNewList);

export default globalRouter;
