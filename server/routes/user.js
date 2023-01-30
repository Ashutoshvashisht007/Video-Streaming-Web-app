import express from "express";
import { deletee, dislike, getUser, like, subscribe, unsubscribe, update, } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// update user
router.put("/:id", verifyToken ,update)

//delete user
router.delete("/:id", verifyToken ,deletee);

//get user
router.get("/find/:id", getUser);

// subscribe user
router.put("/sub/:id", verifyToken ,subscribe);

//unsubscribet user
router.put("/unsub/:id", verifyToken ,unsubscribe);

//like a user
router.put("/like/:videoId", verifyToken ,like);

//dislike a user
router.put("/dislike/:videoId", verifyToken ,dislike);

export default router;