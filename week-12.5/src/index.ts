import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.create({
        data: {
            username: "sumanjeet",
            password: "93456454",
            firstName: "Sumanjeet",
            lastName: "Kumar",
            email: "sumanjeet0012@gmail.com",
        },
    });
    console.log(user);
}

async function updateData() {
    const user = await prisma.user.update({
        where: {
            id: 2,
        },
        data: {
            password: "123456789",
            lastName: "NA",
        },
    });
    console.log(user);
}

async function getUser(username: string) {
    const user = await prisma.user.findFirst({
      where: {
          username: username
      }
    })
    console.log(user);
}

async function addTodo() {
    const todo = await prisma.todo.create({
        data: {
            title: "Learn Prisma",
            description: "Learn Prisma and start to use in your project",
            userId: 1,
        }
    })
}

async function getTodoAndUser() {
    const todo = await prisma.todo.findMany({
        where: {
            userId: 1
        },
        select: {
            title: true,
            description: true,
            user: true
        }
    })
    console.log(todo);
}

getTodoAndUser();
