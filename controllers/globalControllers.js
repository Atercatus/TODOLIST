import Todolist from "../models/Todolist";

export const showlist = async (req, res) => {
  try {
    const todolists = await Todolist.find({}).sort({ _id: -1 });
    res.render("showlist.pug", {
      pageTitle: "SHOW LIST",
      todolists: todolists
    });
  } catch (err) {
    alert(err.message);
    req.flash("error", err.message);
    res.render("showlist.pug", { pageTitle: "SHOW LIST", todolists: [] });
  }
};

export const home = (req, res) => {
  res.render("home.pug", { pageTitle: "SHOW LIST", todolists: [] });
};
