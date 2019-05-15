// GLOBAL
const HOME = "/";
const NEW_LIST = "/newlist";
const SHOW_LIST = "/showlist";

// TODOLIST
const TODOLIST = "/todolist";
const TODOLIST_DETAIL = "/:id";
const ADD_TASK = "/:id/addtask";
const MODIFY_TASK = "/task/:id/patch";
const DELETE_TASK = "/task/:id/delete";

const routes = {
  home: HOME,
  showList: SHOW_LIST,
  todolist: TODOLIST,
  todolistDetail: id => {
    if (id) {
      return `/todolist/${id}`;
    } else {
      return TODOLIST_DETAIL;
    }
  },
  newList: NEW_LIST,
  addTask: id => {
    if (id) {
      return `${id}/addtask`;
    } else {
      return ADD_TASK;
    }
  },
  patchTask: taskId => {
    if (taskId) {
      return `/task/${taskId}/patch`;
    } else {
      return MODIFY_TASK;
    }
  },
  deleteTask: taskId => {
    if (taskId) {
      return `/task/${taskId}/delete`;
    } else {
      return DELETE_TASK;
    }
  }
};

export default routes;
