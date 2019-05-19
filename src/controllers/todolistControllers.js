import Todolist from "../models/Todolist";
import routes from "../routes";
import Task from "../models/Task";

export const getNewList = (req, res) => {
  res.render("newlist.pug", {
    pageTitle: "NEW LIST",
    errmsg: req.flash("error")[0]
  });
};

export const postNewList = async (req, res) => {
  const {
    body: { title }
  } = req;

  try {
    // 공란 체크
    if (title === "") {
      throw new Error("Need title");
    }
    // 중복 체크
    if (await Todolist.findOne({ listTitle: title })) {
      throw Error("Title is duplicated");
    }

    const newList = await Todolist.create({
      listTitle: title
    });

    res.redirect(`${routes.todolistDetail(newList._id)}`);
  } catch (err) {
    console.log(err.message);
    req.flash("error", err.message);
    res.redirect(routes.newList);
  }
};

export const getTodolist = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    // find by id
    const list = await Todolist.findById(id);
    const todolist = await Todolist.findById(id).populate("tasks");

    res.render("todolistDetail.pug", {
      pageTitle: "TODOLIST DETAIL",
      todos: todolist,
      list: list,
      id: id
    });
  } catch (err) {
    req.flash("error", err.message);
    res.render("showlist.pug", {
      errmsg: req.flash("error")[0],
      pageTitle: "SHOW LIST",
      todolists: []
    });
  }
};

export const deleteList = async (req, res) => {
  try {
    const {
      params: { id }
    } = req;

    await Todolist.findByIdAndDelete(id);
    res.status(200).end();
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
    res.end();
  }
};

export const modifyListTitle = async (req, res) => {
  try {
    const {
      params: { id },
      body: { title }
    } = req;

    if (title === "") {
      throw Error("Please fill title");
    }

    await Todolist.findByIdAndUpdate(id, { $set: { listTitle: title } });
    res.write(JSON.stringify(title));
    res.status(200).end();
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
    res.end();
  }
};

// task
export const patchTask = async (req, res) => {
  let {
    params: { id },
    body: {
      task: { taskTitle, description, priority, startDate, deadline, status }
    }
  } = req;

  try {
    if (taskTitle === "" || priority === "" || startDate === "") {
      throw Error("Please fill in all fields");
    }

    const task = {
      taskTitle: taskTitle,
      description: description,
      priority: priority,
      startDate: startDate,
      deadline: deadline,
      status: status
    };

    task.id = id;
    res.write(JSON.stringify(task));
    res.status(200).end();
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
    res.end();
  }
};

export const postNewTask = async (req, res) => {
  let {
    params: { id },
    body: {
      task: { taskTitle, description, priority, startDate, deadline, status }
    }
  } = req;

  try {
    if (taskTitle === "" || priority === "" || startDate === "") {
      throw Error("Please fill in all fields");
    }

    const task = {
      taskTitle: taskTitle,
      description: description,
      priority: priority,
      startDate: startDate,
      deadline: deadline,
      status: status
    };

    const newTask = await Task.create(task);

    await Todolist.findByIdAndUpdate(
      { _id: id },
      { $push: { tasks: newTask } }
    );
    res.write(JSON.stringify(newTask));
    res.status(200).end();
  } catch (err) {
    res.status(400).json({ message: err.message });
    res.end();
  }
};

export const deleteTask = async (req, res) => {
  try {
    const {
      params: { id }
    } = req;

    const list = await Todolist.findOneAndUpdate(
      { tasks: id },
      { $pull: { tasks: id } }
    );
    console.log(list.tasks);

    await Task.findByIdAndDelete(id);
    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
    res.end();
  }
};

export const patchTaskStatus = async (req, res) => {
  try {
    const {
      params: { id },
      body: { task }
    } = req;

    task.status = parseInt(task.status);
    task.status = (task.status + 1) % 3;

    const test = await Task.findByIdAndUpdate(
      { _id: id },
      { $set: { status: task.status } }
    );

    res.write(JSON.stringify(task));
    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
    res.end();
  }
};
