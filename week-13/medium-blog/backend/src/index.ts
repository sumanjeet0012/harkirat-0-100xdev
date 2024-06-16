import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { jwt, sign, verify } from "hono/jwt";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

app.use("/api/v1/blog/*", async (c, next) => {
  const header = c.req.header("Authorization");
  const token = header?.split(" ")[1];
  if (!token) {
    return c.json({ error: "Unauthorized" });
  }
  try {
    const verified = await verify(token, c.env.JWT_SECRET);
    if(verified.id){
      await next();
    } else {
      c.status(403);
      return c.json({"error": "JWT verification failed"});
    }
  } catch (error) {
    c.json({"error": "JWT verification failed"});
    c.text("JWT verification failed");
    return c.status(403);
  }
  
})


/*
  `//@ts-ignore` it is used to ignore type check on next line.
*/

app.get("/", (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  return c.text("Hello Hono!");
});

export default app;
