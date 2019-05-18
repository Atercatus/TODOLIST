import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import flash from "connect-flash";
import session from "express-session";
import path from "path";

import globalRouter from "./routers/globalRouter";
import todolistRouter from "./routers/todolistRouter";
import routes from "./routes";

import { localToGlobals } from "./middlewares";

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// module
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false
  })
);
app.use(flash());
app.use(localToGlobals);

app.use("/static", express.static(path.join(__dirname, "static")));

// router
app.use(routes.home, globalRouter);
app.use(routes.todolist, todolistRouter);

export default app;
