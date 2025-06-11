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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../src/generated/prisma");
const prisma = new prisma_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hi there");
});
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const existingUser = yield prisma.user.findUnique({
            where: {
                username: username
            }
        });
        if (existingUser) {
            res.status(400).json({ error: "User already exists" });
            return;
        }
        const user = yield prisma.user.create({
            data: {
                username: username,
                password: password
            }
        });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}));
app.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield prisma.user.findUnique({
            where: {
                username,
                password
            }
        });
        if (!user) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}));
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
