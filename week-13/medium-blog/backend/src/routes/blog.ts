import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { jwt, sign, verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

blogRouter.post("/", (c) => {
  return c.text("This is a blog route");
});

blogRouter.put("/", (c) => {
  return c.text("This is a blog route");
});

blogRouter.get("/:id", (c) => {
  return c.text("This is a blog route with id");
});

blogRouter.get("/bulk", (c) => {
  return c.text("This is a blog route with bulk");
});
