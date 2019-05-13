import Todolist from "../models/Todolist";
import routes from "../routes";

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

    console.log(newList);
    console.log(newList._id);

    res.redirect(`${routes.todolistDetail(newList._id)}`);
  } catch (err) {
    req.flash("error", err.message);
    res.redirect(routes.newlist);
  }
};

export const getTodolist = (req, res) => {
  res.render("todolistDetail.pug", { pageTitle: "TODOLIST DETAIL" });
};

export const postNewTask = (req, res) => {
  //add task
};
