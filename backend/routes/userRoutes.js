import express from "express";
import { getUsers, getUser, searchUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.get("/search", searchUser);

export default router;
