import Todolist from "../models/Todolist";
import Task from "../models/Task";

export const showlist = async (req, res) => {
  try {
    let todolists = await Todolist.find({}).sort({ createdAt: 1 });
    const tasknumList = [];
    const cautions = [];

    for (const todolist of todolists) {
      let tasks = todolist.tasks;
      let tasknum = 0;
      let cautionsLength = 0;

      for (let task of tasks) {
        task = await Task.findById(task);
        if (task.status !== 2) {
          tasknum++;
        }

        let deadline;
        if (task.deadline === "") {
          deadline = new Date();
        } else {
          deadline = new Date(task.deadline);
        }

        let today = new Date();
        today = today.toDateString();
        today = new Date(today);
        if (deadline - today < 0) {
          cautionsLength++;
        }
      }
      tasknumList.push(tasknum);
      cautions.push(cautionsLength);
    }

    for (let i = 0; i < todolists.length; i++) {
      todolists[i]["remainingTask"] = tasknumList[i];
      todolists[i]["cautions"] = cautions[i];
    }

    res.render("showlist.pug", {
      pageTitle: "SHOW LIST",
      todolists: todolists
    });
  } catch (err) {
    console.log(err);
    res.render("showlist.pug", {
      pageTitle: "SHOW LIST",
      todolists: [],
      errmsg: err.message
    });
  }
};

export const home = (req, res) => {
  res.render("home.pug", { pageTitle: "HOME" });
};
