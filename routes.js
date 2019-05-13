// GLOBAL
const HOME = "/";

// TODOLIST
const TODOLIST = "/todolist";
const TODOLIST_DETAIL = "/:id";

const routes = {
  home: HOME,
  todolist: TODOLIST,
  todolistDetail: todolist => {
    if (todolist) {
      return `/todolist/${id}`;
    } else {
      return TODOLIST_DETAIL;
    }
  }
};

export default routes;
