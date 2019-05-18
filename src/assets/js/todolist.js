import axios from "axios";
import routes from "../../routes";

// todolist detail
const popupBtn = document.getElementById("jsPopupBtn");
const listTitle = document.getElementById("jsListTitle");
const listTitleSaveBtn = document.getElementById("jsListSave");
const listDeleteBtn = document.getElementById("jsListDelete");

// task block
const container = document.getElementById("jsTaskContainer");
const bell = document.getElementById("jsAlert");

// todolist form
const taskId = document.getElementById("jsFormTaskId");
const todoForm = document.getElementById("jsPopup");
const taskBlockTitle = document.getElementById("jsFormTitle");
const taskBlockStatusText = document.getElementById("jsStatusText");
const taskBlockStatus = document.getElementById("jsFormStatus");
const taskBlockDescription = document.getElementById("jsFormDescription");
const taskBlockPriority = document.getElementById("jsFormPriority");
const taskBlockStartDate = document.getElementById("jsStartDate");
const taskBlockDeadline = document.getElementById("jsDeadline");
const taskBlockDeadlineBtn = document.getElementById("jsDeadlineBtn");
const taskBlockDeadlinePlaceholder = document.getElementById("jsDeadlinePH");
const closeBtn = document.getElementById("jsCloseBtn");
const submitBtn = document.getElementById("jsSubmitBtn");

///////////////////////////////////////////////////
// UTILS
///////////////////////////////////////////////////
const getDateFormat = date => {
  const year = date.getFullYear();
  let month = new String(date.getMonth() + 1);
  let day = new String(date.getDate());

  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }

  return `${year}-${month}-${day}`;
};

const getDateSubtract = (start, end) => {
  const subs = end - start;

  return subs;
};

///////////////////////////////////////////////////
// TODOLIST CRUD
///////////////////////////////////////////////////
const deleteList = async () => {
  if (confirm("Are you sure you want to delete?")) {
    const todolistId = window.location.href.split("/todolist/")[1];
    await axios({
      url: `/todolist/${routes.deleteList(todolistId)}`,
      method: "DELETE"
    })
      .then(response => {
        window.location.replace(routes.home);
      })
      .catch(err => {
        console.log(err);
        window.alert(err.response.data.message);
      });
  }
};

const modifyListTitle = async () => {
  const todolistId = window.location.href.split("/todolist/")[1];

  await axios({
    url: `/todolist${routes.modifyListTitle(todolistId)}`,
    method: "PATCH",
    data: {
      title: listTitle.value
    }
  })
    .then(response => {
      setListTitle(response.data);
    })
    .catch(err => {
      window.alert(err.response.data.message);
    });
};

const setListTitle = title => {
  listTitle.value = title;
};

///////////////////////////////////////////////////
// TODOLIST DETAIL EVENT
///////////////////////////////////////////////////
const focusListTitle = () => {
  listTitle.readOnly = false;
};
const focusoutListTitle = () => {
  listTitle.readOnly = true;
};

///////////////////////////////////////////////////
// TODOLIST FORM EVENT
///////////////////////////////////////////////////
// 추가 및 수정 시 사용되는 폼을 popup한다
const popup = task => {
  // 수정
  if (task) {
    taskId.id = task.id;
    taskBlockTitle.value = task.taskTitle;
    taskBlockDescription.value = task.description;
    taskBlockPriority.value = task.priority;
    taskBlockStartDate.value = task.startDate;
    taskBlockDeadline.value = task.deadline;
    taskBlockStatus.dataset.status = task.status;
  }
  // 추가
  else {
    const date = new Date();
    const dateFormat = getDateFormat(date);

    taskBlockStartDate.value = dateFormat;
    taskBlockDeadline.value = "";
    taskBlockTitle.value = "";
    taskBlockDescription.value = "";
    taskBlockPriority.value = 1;
    taskBlockStatus.dataset.status = 0;
  }

  if (taskBlockDeadline.value === "") {
    deadlineBtnOff();
  } else {
    dealineBtnOn();
  }

  setFormStatusStyle(taskBlockStatus);
  todoForm.classList.remove("unpop");
  todoForm.classList.add("popup");
};

const unpop = () => {
  todoForm.classList.remove("popup");
  todoForm.classList.add("unpop");
  taskId.id = "";
};

const dealineBtnOn = () => {
  taskBlockDeadlineBtn.dataset.toggle = "on";
  taskBlockDeadline.classList.remove("deadline-off");
  taskBlockDeadline.classList.add("deadline-on");
  taskBlockDeadlineBtn.classList.remove("fa-calendar-plus");
  taskBlockDeadlineBtn.classList.add("fa-calendar-minus");
  taskBlockDeadlinePlaceholder.classList.remove("header__deadline-off");
  taskBlockDeadlinePlaceholder.classList.add("header__deadline-on");
  taskBlockDeadline.type = "date";
  taskBlockDeadline.readOnly = false;
  if (taskBlockDeadline.value === "") {
    taskBlockDeadline.value = getDateFormat(new Date());
  }
};

const deadlineBtnOff = () => {
  taskBlockDeadlineBtn.dataset.toggle = "off";
  taskBlockDeadline.classList.remove("deadline-on");
  taskBlockDeadline.classList.add("deadline-off");
  taskBlockDeadlineBtn.classList.remove("fa-calendar-minus");
  taskBlockDeadlineBtn.classList.add("fa-calendar-plus");
  taskBlockDeadlinePlaceholder.classList.remove("header__deadline-on");
  taskBlockDeadlinePlaceholder.classList.add("header__deadline-off");

  taskBlockDeadline.type = "text";
  taskBlockDeadline.value = "";
  taskBlockDeadline.readOnly = true;
};

const handleDeadlineBtn = event => {
  if (event.target.dataset.toggle === "on") {
    deadlineBtnOff();
  } else {
    dealineBtnOn();
  }
};

// 경고 표시 스타일 변경
const setCautionStyle = caution => {
  const parent = caution.parentNode;
  const deadline = parent.querySelector("#jsTaskDeadline");
  const status = parent.querySelector("#jsTaskStatus");

  let s_date = new Date();
  s_date = s_date.toDateString();
  s_date = new Date(s_date);

  let e_date = new Date(deadline.innerHTML);
  if (deadline.innerHTML === "") {
    e_date = new Date();
  }

  if (getDateSubtract(s_date, e_date) < 0 && status.dataset.status !== "2") {
    caution.classList.add("fa-exclamation-triangle");
    if (status.dataset.status === "0") alertTask(caution.parentNode);
  }
};

const handleFormStatus = event => {
  event.target.parentNode.dataset.status =
    (parseInt(event.target.parentNode.dataset.status) + 1) % 3;
  setFormStatusStyle(event.target.parentNode);
};

const setFormStatusStyle = formStatus => {
  const icon = formStatus.querySelector("#jsFormStatusIcon");

  icon.classList.remove("fa-circle");
  icon.classList.remove("fa-play-circle");
  icon.classList.remove("fa-check-circle");

  icon.classList.remove("statusIcon-nonProgress");
  icon.classList.remove("statusIcon-onProgress");
  icon.classList.remove("statusIcon-completed");

  const status = formStatus.dataset.status;

  if (status === "0") {
    icon.classList.add("fa-circle");
    icon.classList.add("statusIcon-nonProgress");
    taskBlockStatusText.innerHTML = "Waiting";
  } else if (status === "1") {
    icon.classList.add("fa-play-circle");
    icon.classList.add("statusIcon-onProgress");
    taskBlockStatusText.innerHTML = "In Progress";
  } else {
    icon.classList.add("fa-check-circle");
    icon.classList.add("statusIcon-completed");
    taskBlockStatusText.innerHTML = "Completed";
  }
};

// 현재 작업 상태 변경
const handleTaskStatus = event => {
  let taskStatus = event.target.dataset.status;
  const id = event.target.parentNode.querySelector(".task__id").id;

  const task = {
    id: id,
    status: taskStatus
  };

  updateStatus(task);
};
// 현재 작업 상태 model 변경
const updateStatus = async task => {
  const taskId = task.id;

  await axios({
    url: `/todolist${routes.patchTaskStatus(taskId)}`,
    method: "PATCH",
    data: {
      task: task
    }
  })
    .then(response => {
      setStatus(response.data);
    })
    .catch(err => {
      console.log(err);
      window.alert(err.response.data.message);
    });
};
// 작업 상태 View에 반영
const setStatus = task => {
  const taskBlock = document.getElementById(task.id).parentNode;
  const status = taskBlock.querySelector("#jsTaskStatus");

  status.dataset.status = task.status;

  setStatusStyle(status);
};
// 작업 상태 style 적용
const setStatusStyle = status => {
  const parent = status.parentNode;
  const caution = parent.querySelector("#jsTaskCaution");

  // 기존 스타일 제거
  parent.classList.remove("task-container-nonProgress");
  parent.classList.remove("task-container-onProgress");
  parent.classList.remove("task-container-completed");
  parent
    .querySelector("#jsTaskTitle")
    .classList.remove("task__title-completed");

  status.classList.remove("fa-circle");
  status.classList.remove("fa-play-circle");
  status.classList.remove("fa-check-circle");

  const statusValue = status.dataset.status;
  // 이 이후에 스타일 적용
  caution.classList.remove("fa-exclamation-triangle");
  setCautionStyle(caution);

  if (statusValue === "0") {
    parent.classList.add("task-container-nonProgress");
    status.classList.add("fa-circle");
  } else if (statusValue === "1") {
    parent.classList.add("task-container-onProgress");
    status.classList.add("fa-play-circle");
  } else if (statusValue === "2") {
    parent.classList.add("task-container-completed");
    parent.querySelector("#jsTaskTitle").classList.add("task__title-completed");
    parent
      .querySelector("#jsTaskCaution")
      .classList.remove("fa-exclamation-triangle");

    status.classList.add("fa-check-circle");
  }
};

// 우선 순위 style 적용
const setPriorityStyle = priority => {
  const task_container = priority.parentNode;
  task_container.classList.remove("task-container-low");
  task_container.classList.remove("task-container-middle");
  task_container.classList.remove("task-container-high");

  priority.classList.remove("task__priority-low");
  priority.classList.remove("task__priority-middle");
  priority.classList.remove("task__priority-high");
  // low
  if (priority.innerHTML === "1") {
    priority.classList.add("task__priority-low");
    priority.innerHTML = "Low";
    task_container.classList.add("task-container-low");
  }
  // middle
  else if (priority.innerHTML === "2") {
    priority.classList.add("task__priority-middle");
    priority.innerHTML = "Middle";
    task_container.classList.add("task-container-middle");
  }
  // high
  else {
    priority.classList.add("task__priority-high");
    priority.innerHTML = "High";
    task_container.classList.add("task-container-high");
  }
};

// modify button
const handleModifyBtn = event => {
  event.preventDefault();

  try {
    // 공백 체크
    if (
      taskBlockTitle.value === "" ||
      taskBlockStartDate.value === "" ||
      taskBlockPriority.value === ""
    ) {
      throw Error("Please fill all of the options");
    }

    // 날짜 체크
    if (
      getDateSubtract(
        new Date(taskBlockStartDate.value),
        new Date(taskBlockDeadline.value)
      ) < 0
    ) {
      throw Error("Please enter a valid date");
    }

    const task = {
      id: taskId.id,
      taskTitle: taskBlockTitle.value,
      description: taskBlockDescription.value,
      startDate: taskBlockStartDate.value,
      deadline: taskBlockDeadline.value,
      priority: taskBlockPriority.value,
      status: taskBlockStatus.dataset.status
    };

    patchTask(task);
    unpop();
  } catch (err) {
    window.alert(err);
  }
};

// submit button
const handleSubmitBtn = event => {
  event.preventDefault();

  try {
    // 공백 체크
    if (
      taskBlockTitle.value === "" ||
      taskBlockStartDate.value === "" ||
      taskBlockPriority.value === ""
    ) {
      throw Error("Please fill all of the options");
    }

    // 날짜 체크
    if (
      getDateSubtract(
        new Date(taskBlockStartDate.value),
        new Date(taskBlockDeadline.value)
      ) < 0
    ) {
      throw Error("Please enter a valid date");
    }

    const task = {
      taskTitle: taskBlockTitle.value,
      description: taskBlockDescription.value,
      startDate: taskBlockStartDate.value,
      deadline: taskBlockDeadline.value,
      priority: taskBlockPriority.value,
      status: taskBlockStatus.dataset.status
    };

    postNewTask(task);
    unpop();
  } catch (err) {
    window.alert(err);
  }
};

// Task model 변경
const patchTask = async task => {
  const taskId = task.id;

  await axios({
    url: `/todolist${routes.patchTask(taskId)}`,
    method: "PATCH",
    data: {
      task: task
    }
  })
    .then(response => {
      modifyTask(response.data);
    })
    .catch(err => {
      console.log(err);
      window.alert(err.response.data.message);
    });
};

// 변경된 Task 를 View 에 반영
const modifyTask = task => {
  const taskBlock = document.getElementById(task.id).parentNode;

  const title = taskBlock.querySelector("#jsTaskTitle");
  title.innerHTML = task.taskTitle;
  const description = taskBlock.querySelector("#jsTaskDescription");
  description.innerHTML = task.description;
  const priority = taskBlock.querySelector("#jsTaskPriority");
  priority.innerHTML = task.priority;
  setPriorityStyle(priority);
  const startDate = taskBlock.querySelector("#jsTaskStartDate");
  startDate.innerHTML = task.startDate;
  const deadline = taskBlock.querySelector("#jsTaskDeadline");
  deadline.innerHTML = task.deadline;
  const status = taskBlock.querySelector("#jsTaskStatus");
  status.dataset.status = task.status;
  const caution = taskBlock.querySelector("#jsTaskCaution");
  setCautionStyle(caution);
  setStatusStyle(status);
};

// 새로운 Task  추가
const postNewTask = async task => {
  const todolistId = window.location.href.split("/todolist/")[1];
  await axios({
    url: `/todolist/${routes.addTask(todolistId)}`,
    method: "POST",
    data: {
      task: task
    }
  })
    .then(response => {
      addTaskRow(response.data);
    })
    .catch(err => {
      console.log(err);
      window.alert(err.response.data.message);
    });
};

// 추가된 Task 를 View에 반영
// 실시간 처럼 보이기 위함
const addTaskRow = task => {
  const div = document.createElement("div");
  div.classList.add("task-container");
  div.addEventListener("animationend", handleAlertEnd);
  div.id = "jsTaskContainer";

  const div_taskId = document.createElement("div");
  div_taskId.classList.add("task__id");
  div_taskId.id = task._id;
  div.appendChild(div_taskId);

  const div_taskDescription = document.createElement("div");
  div_taskDescription.classList.add("task__description");
  div_taskDescription.innerHTML = task.description;
  div_taskDescription.id = "jsTaskDescription";
  div.appendChild(div_taskDescription);

  const i_caution = document.createElement("i");
  i_caution.classList.add("fas");
  i_caution.classList.add("task__caution");
  i_caution.id = "jsTaskCaution";
  div.appendChild(i_caution);

  const a_title = document.createElement("a");
  a_title.innerHTML = task.taskTitle;
  a_title.classList.add("task__title");
  a_title.id = "jsTaskTitle";
  div.appendChild(a_title);

  const a_priority = document.createElement("a");
  a_priority.innerHTML = task.priority;
  a_priority.classList.add("task__priority");
  a_priority.id = "jsTaskPriority";
  div.appendChild(a_priority);
  setPriorityStyle(a_priority);

  const a_startDate = document.createElement("a");
  a_startDate.innerHTML = task.startDate;
  a_startDate.classList.add("task__startDate");
  a_startDate.id = "jsTaskStartDate";
  div.appendChild(a_startDate);

  const a_tilde = document.createElement("a");
  a_tilde.innerHTML = "~";
  a_tilde.classList.add("task__tilde");
  div.appendChild(a_tilde);

  const a_deadline = document.createElement("a");
  a_deadline.innerHTML = task.deadline;
  a_deadline.classList.add("task__deadline");
  a_deadline.id = "jsTaskDeadline";
  div.appendChild(a_deadline);

  const i_status = document.createElement("i");
  i_status.classList.add("far");
  i_status.classList.add("fa-check-circle");
  i_status.id = "jsTaskStatus";
  i_status.dataset.status = task.status;
  i_status.addEventListener("click", handleTaskStatus);
  div.appendChild(i_status);
  setStatusStyle(i_status);

  const i_modify = document.createElement("i");
  i_modify.classList.add("far");
  i_modify.classList.add("fa-edit");
  i_modify.id = "jsModifyIcon";
  i_modify.addEventListener("click", handleTaskModify);
  div.appendChild(i_modify);

  const i_delete = document.createElement("i");
  i_delete.classList.add("far");
  i_delete.classList.add("fa-trash-alt");
  i_delete.id = "jsDeleteIcon";
  i_delete.addEventListener("click", handleTaskDelete);
  div.appendChild(i_delete);

  container.appendChild(div);
};

// 수정 버튼 클릭 이벤트
const handleTaskModify = event => {
  event.preventDefault();

  const taskBlock = event.target.parentNode;

  // 템플릿 재활용 위해
  submitBtn.removeEventListener("click", handleSubmitBtn);
  submitBtn.addEventListener("click", handleModifyBtn);

  let priority = taskBlock.querySelector("#jsTaskPriority").innerHTML;

  if (priority === "Low") {
    priority = "1";
  } else if (priority === "Middle") {
    priority = "2";
  } else {
    priority = "3";
  }

  const task = {
    id: taskBlock.querySelector(".task__id").id,
    taskTitle: taskBlock.querySelector("#jsTaskTitle").innerHTML,
    priority: priority,
    startDate: taskBlock.querySelector("#jsTaskStartDate").innerHTML,
    deadline: taskBlock.querySelector("#jsTaskDeadline").innerHTML,
    description: taskBlock.querySelector("#jsTaskDescription").innerHTML,
    status: taskBlock.querySelector("#jsTaskStatus").dataset.status
  };

  popup(task);
};

// Task 삭제 버튼 이벤트 핸들러
const handleTaskDelete = event => {
  event.preventDefault();

  const taskBlock = event.target.parentNode;
  const id = taskBlock.querySelector(".task__id").id;

  deleteTask(id);
};

// Task 삭제 요청
const deleteTask = async id => {
  await axios({
    url: `/todolist${routes.deleteTask(id)}`,
    method: "DELETE"
  })
    .then(() => {
      deleteTaskRow(id);
    })
    .catch(err => {
      console.log(err);
      window.alert(err.response.data.message);
    });
};

// 삭제된 Task 를 View에 반영
const deleteTaskRow = id => {
  const row = document.getElementById(id).parentNode;
  row.parentNode.removeChild(row);
};

// 수정과 추가의 폼을 재활용하기 위해
// submit button 의 클릭 이벤트를 변경한다.
const handlePopBtn = () => {
  // 템플릿 재활용 위해
  submitBtn.removeEventListener("click", handleModifyBtn);
  submitBtn.addEventListener("click", handleSubmitBtn);

  popup();
};

const handleCloseBtn = () => {
  unpop();
};

const handleAlertEnd = e => {
  e.target.classList.remove("shake");
};

const alertTask = task => {
  task.classList.add("shake");
};

// Task들의 현재 상태를 style에 반영
const setTasksStyle = () => {
  const modifyIcons = document.querySelectorAll("#jsModifyIcon");
  const deleteIcons = document.querySelectorAll("#jsDeleteIcon");
  const priorities = document.querySelectorAll("#jsTaskPriority");
  const statuses = document.querySelectorAll("#jsTaskStatus");
  const cautions = document.querySelectorAll("#jsTaskCaution");
  const formStatuses = document.querySelectorAll("#jsFormStatus");

  modifyIcons.forEach(icon => {
    icon.addEventListener("click", handleTaskModify);
  });
  deleteIcons.forEach(icon => {
    icon.addEventListener("click", handleTaskDelete);
  });
  priorities.forEach(priority => {
    setPriorityStyle(priority);
  });
  statuses.forEach(status => {
    status.addEventListener("click", handleTaskStatus);
    setStatusStyle(status);
  });
  cautions.forEach(caution => {
    setCautionStyle(caution);
  });
  formStatuses.forEach(formstatus => {
    formstatus.addEventListener("click", handleFormStatus);
  });
};

const init = () => {
  const tasks = document.querySelectorAll("#jsTaskContainer");
  tasks.forEach(task => {
    task.addEventListener("animationend", handleAlertEnd);
  });
  popupBtn.addEventListener("click", handlePopBtn);
  closeBtn.addEventListener("click", handleCloseBtn);
  submitBtn.addEventListener("click", handleSubmitBtn);
  bell.addEventListener("click", () => {
    const overTasks = container.querySelectorAll(".fa-exclamation-triangle");
    overTasks.forEach(task => {
      alertTask(task.parentNode);
    });
  });

  listTitleSaveBtn.addEventListener("click", modifyListTitle);
  listDeleteBtn.addEventListener("click", deleteList);

  listTitle.addEventListener("click", focusListTitle);
  listTitle.addEventListener("focusout", focusoutListTitle);

  taskBlockDeadlineBtn.addEventListener("click", handleDeadlineBtn);

  setTasksStyle();
};

if (container) {
  init();
}
