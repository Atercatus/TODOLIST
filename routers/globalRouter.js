import express from "express";
import routes from "../routes";
import { home, showlist } from "../controllers/globalControllers";
import { getNewList, postNewList } from "../controllers/todolistControllers";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.showlist, showlist);

globalRouter.get(routes.newlist, getNewList);
globalRouter.post(routes.newlist, postNewList);

export default globalRouter;
