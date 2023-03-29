import express from "express";
import {
  deleteUser,
  getAllUsers,
  getMyProfile,
  getSingleUser,
  login,
  logout,
  register,
  updateUser,
} from "../controller/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/user/new", register);

router.post("/user/login", login);

router.get("/user/logout", isAuthenticated, logout);

router.get("/user/all", getAllUsers);

router.get("/me", isAuthenticated, getMyProfile);

router.route("/user/:id").get(getSingleUser).put(updateUser).delete(deleteUser);

export default router;
