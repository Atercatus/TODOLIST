// GLOBAL
const HOME = "/";
const NEWLIST = "/newlist";
const SHOWLIST = "/showlist";

// TODOLIST
const TODOLIST = "/todolist";
const TODOLIST_DETAIL = "/:id";

const routes = {
  home: HOME,
  showlist: SHOWLIST,
  todolist: TODOLIST,
  todolistDetail: id => {
    if (id) {
      return `/todolist/${id}`;
    } else {
      return TODOLIST_DETAIL;
    }
  },
  newlist: NEWLIST
};

export default routes;
