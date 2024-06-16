import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { jwt, sign, verify } from "hono/jwt";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

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

app.post("/api/v1/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password,
      },
    });
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      jwt: token,
    });
  } catch (error) {
    console.log(error);
    return c.status(403);
  }
});

app.post("/api/v1/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      return c.status(403);
    }
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({ jwt: token });
  } catch (error) {
    console.log(error);
    c.status(403);
    return c.json({ error: "Invalid credentials" });
  }
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
