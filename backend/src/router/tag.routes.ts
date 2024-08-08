import { Hono } from "hono";
 import { getPostsByTag, getTags } from "../controller/tagController";
import { authMiddleware } from "../middleware/user";

export const tagRouter = new Hono();

tagRouter.get("/tags",authMiddleware,getTags)
tagRouter.get("/getBlog/:tag",authMiddleware,getPostsByTag)
