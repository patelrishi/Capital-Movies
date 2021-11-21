import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import {
  authUser,
  registerUser,
  addToWatchList,
  removeFromWatchList,
  getUserDetails,
} from "../controller/userController.js";

const router = express.Router();

router.route("/").post(registerUser).get(getUserDetails);
router.post("/login", authUser);
router.post("/watchlist", addToWatchList);
router.post("/watchlist/remove", protect, removeFromWatchList);

export default router;
