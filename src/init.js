import "@babel/polyfill";
import "./db";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();
import "./models/Todolist";
import "./models/Task";

const PORT = process.env.PORT || 5000;

const handleListen = () => {
  console.log(`Listening on : http://localhost:${PORT}`);
};

app.listen(PORT, handleListen);
