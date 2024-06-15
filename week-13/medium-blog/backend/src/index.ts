import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string
	}
}>();

/*
  `//@ts-ignore` it is used to ignore type check on next line.
*/

app.get("/", (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  return c.text("Hello Hono!");
});

app.post("/api/v1/user/signup", (c) => {
  return c.text("This is a signup route");
});

app.post("/api/v1/user/signin", (c) => {
  return c.text("This is a signin route");
});

app.post("/api/v1/blog", (c) => {
  return c.text("This is a blog route");
});

app.put("/api/v1/blog", (c) => {
  return c.text("This is a blog route");
});

app.get("/api/v1/blog/:id", (c) => {
  return c.text("This is a blog route with id");
});

app.get("/api/v1/blog/bulk", (c) => {
  return c.text("This is a blog route with bulk");
});

export default app;
