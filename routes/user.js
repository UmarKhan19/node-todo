import express from "express";
import { createUser, getAllUsers, getSingleUser } from "../controller/user.js";

const router = express.Router();

router.get("/user/all", getAllUsers);

router.post("/user/new", createUser);

router.get("/user/:id", getSingleUser);

export default router;
