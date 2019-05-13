import routes from "./routes";

export const localToGlobals = (req, res, next) => {
  res.locals.siteName = "Atercatus's TODOLIST";
  res.locals.routes = routes;

  next();
};
