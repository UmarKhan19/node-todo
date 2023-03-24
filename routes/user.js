import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from "../controller/user.js";

const router = express.Router();

router.get("/user/all", getAllUsers);

router.post("/user/new", createUser);

router.route("/user/:id").get(getSingleUser).put(updateUser).delete(deleteUser);

export default router;
