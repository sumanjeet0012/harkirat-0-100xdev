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

main();
