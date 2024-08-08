import { Hono } from "hono";
 import { getPostsByTag, getTags } from "../controller/tagController";

export const tagRouter = new Hono();

tagRouter.get("/tags",getTags)
tagRouter.get("/getBlog/:tag",getPostsByTag)
