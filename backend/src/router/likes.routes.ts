import { Hono } from "hono";
import { authMiddleware } from "../middleware/user";
import { countLikes, likePost, unLikePost } from "../controller/likesController";

export const likesRouter = new Hono()


likesRouter.post("/like/:postId",authMiddleware,likePost)
likesRouter.post("/unlike/:postId",authMiddleware,unLikePost)
likesRouter.get("/count/:postId",authMiddleware,countLikes)

