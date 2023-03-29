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

router.post("/new", register);

router.post("/login", login);

router.get("/logout", isAuthenticated, logout);

router.get("/all", getAllUsers);

router.get("/me", isAuthenticated, getMyProfile);

router.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUser);

export default router;
