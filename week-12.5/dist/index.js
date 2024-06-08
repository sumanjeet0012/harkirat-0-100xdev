"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.create({
            data: {
                username: "sumanjeet",
                password: "93456454",
                firstName: "Sumanjeet",
                lastName: "Kumar",
                email: "sumanjeet0012@gmail.com",
            },
        });
        console.log(user);
    });
}
function updateData() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.update({
            where: {
                id: 2,
            },
            data: {
                password: "123456789",
                lastName: "NA",
            },
        });
        console.log(user);
    });
}
function getUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.findFirst({
            where: {
                username: username
            }
        });
        console.log(user);
    });
}
function addTodo() {
    return __awaiter(this, void 0, void 0, function* () {
        const todo = yield prisma.todo.create({
            data: {
                title: "Learn Prisma 2nd time",
                description: "Learn Prisma and start to use in your project 2",
                userId: 1,
            }
        });
    });
}
addTodo();
