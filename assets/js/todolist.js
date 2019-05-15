import axios from "axios";
import routes from "../../routes";

// todolist detail
const popupBtn = document.getElementById("jsPopupBtn");

// task block
const container = document.getElementById("jsTaskContainer");
const modifyIcons = document.querySelectorAll("#jsModifyIcon");
const deleteIcons = document.querySelectorAll("#jsDeleteIcon");

// todolist form
const taskId = document.getElementById("jsFormTaskId");
const todoForm = document.getElementById("jsPopup");
const taskBlockTitle = document.getElementById("jsFormTitle");
const taskBlockDescription = document.getElementById("jsFormDescription");
const taskBlockPriority = document.getElementById("jsFormPriority");
const taskBlockStartDate = document.getElementById("jsStartDate");
const taskBlockDeadline = document.getElementById("jsDeadline");
const closeBtn = document.getElementById("jsCloseBtn");
const submitBtn = document.getElementById("jsSubmitBtn");

// modify button
const handleModifyBtn = event => {
  event.preventDefault();

  try {
    if (
      taskBlockTitle.value === "" ||
      taskBlockDescription.value === "" ||
      taskBlockStartDate.value === "" ||
      taskBlockDeadline.value === "" ||
      taskBlockPriority.value === ""
    ) {
      throw Error("Fill all of the options");
    }

    const task = {
      id: taskId.id,
      taskTitle: taskBlockTitle.value,
      description: taskBlockDescription.value,
      startDate: taskBlockStartDate.value,
      deadline: taskBlockDeadline.value,
      priority: taskBlockPriority.value
    };

    // id 는 전달 용도로만 사용하고 제거한다.
    // 이후 수정
    taskId.id = "";

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
    if (
      taskBlockTitle.value === "" ||
      taskBlockDescription.value === "" ||
      taskBlockStartDate.value === "" ||
      taskBlockDeadline.value === "" ||
      taskBlockPriority.value === ""
    ) {
      throw Error("Fill all of the options");
    }

    const task = {
      taskTitle: taskBlockTitle.value,
      description: taskBlockDescription.value,
      startDate: taskBlockStartDate.value,
      deadline: taskBlockDeadline.value,
      priority: taskBlockPriority.value
    };

    postNewTask(task);
    unpop();
  } catch (err) {
    window.alert(err);
  }
};

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
      window.alert(err);
    });
};

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
      window.alert(err);
    });
};

const modifyTask = task => {
  const taskBlock = document.getElementById(task.id).parentNode;

  const title = taskBlock.querySelector("#jsTaskTitle");
  title.innerHTML = task.taskTitle;
  const description = taskBlock.querySelector("#jsTaskDescription");
  description.innerHTML = task.description;
  const priority = taskBlock.querySelector("#jsTaskPriority");
  priority.innerHTML = task.priority;
  const startDate = taskBlock.querySelector("#jsTaskStartDate");
  startDate.innerHTML = task.startDate;
  const deadline = taskBlock.querySelector("#jsTaskDeadline");
  deadline.innerHTML = task.deadline;
};

const addTaskRow = task => {
  const div = document.createElement("div");
  div.classList.add("task-container");
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
  div.appendChild(i_status);

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

const handleTaskModify = event => {
  event.preventDefault();

  const taskBlock = event.target.parentNode;

  // 템플릿 재활용 위해
  submitBtn.removeEventListener("click", handleSubmitBtn);
  submitBtn.addEventListener("click", handleModifyBtn);

  const task = {
    id: taskBlock.querySelector(".task__id").id,
    taskTitle: taskBlock.querySelector("#jsTaskTitle").innerHTML,
    priority: taskBlock.querySelector("#jsTaskPriority").innerHTML,
    startDate: taskBlock.querySelector("#jsTaskStartDate").innerHTML,
    deadline: taskBlock.querySelector("#jsTaskDeadline").innerHTML,
    description: taskBlock.querySelector("#jsTaskDescription").innerHTML
  };

  popup(task);
};

const handleTaskDelete = event => {
  event.preventDefault();

  const taskBlock = event.target.parentNode;
  const id = taskBlock.querySelector(".task__id").id;

  deleteTask(id);
};

const deleteTask = async id => {
  await axios({
    url: `/todolist${routes.deleteTask(id)}`,
    method: "DELETE"
  })
    .then(response => {
      deleteTaskRow(id);
    })
    .catch(err => {
      console.log(err);
      window.alert(err);
    });
};

const deleteTaskRow = id => {
  const row = document.getElementById(id).parentNode;
  row.parentNode.removeChild(row);
};

const popup = task => {
  // 수정
  if (task) {
    taskId.id = task.id;
    taskBlockTitle.value = task.taskTitle;
    taskBlockDescription.value = task.description;
    taskBlockPriority.value = task.priority;
    taskBlockStartDate.value = task.startDate;
    taskBlockDeadline.value = task.deadline;
  }
  // 추가
  else {
    const date = new Date();
    const year = date.getFullYear();
    let month = new String(date.getMonth() + 1);
    let day = new String(date.getDate());

    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }

    const dateFormat = `${year}-${month}-${day}`;
    taskBlockStartDate.value = dateFormat;
    taskBlockDeadline.value = dateFormat;
    taskBlockTitle.value = "";
    taskBlockDescription.value = "";
    taskBlockPriority.value = 1;
  }

  todoForm.classList.remove("unpop");
  todoForm.classList.add("popup");
};

const unpop = () => {
  todoForm.classList.remove("popup");
  todoForm.classList.add("unpop");
};

const handlePopBtn = () => {
  // 템플릿 재활용 위해
  submitBtn.removeEventListener("click", handleModifyBtn);
  submitBtn.addEventListener("click", handleSubmitBtn);

  popup();
};

const handleCloseBtn = () => {
  unpop();
};

const init = () => {
  popupBtn.addEventListener("click", handlePopBtn);
  closeBtn.addEventListener("click", handleCloseBtn);
  submitBtn.addEventListener("click", handleSubmitBtn);

  modifyIcons.forEach(icon => {
    icon.addEventListener("click", handleTaskModify);
  });
  deleteIcons.forEach(icon => {
    icon.addEventListener("click", handleTaskDelete);
  });
};

if (todoForm) {
  init();
}
