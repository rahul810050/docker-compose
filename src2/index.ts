import express, { Request, Response } from "express"
import { PrismaClient } from "../src/generated/prisma"

const prisma = new PrismaClient();

const app = express()


app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hi there")
})

app.post("/signup", async (req: Request , res: Response)=> {
  const {username, password} = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        username: username
      }
    })
    if (existingUser) {
      res.status(400).json({error: "User already exists"})
      return
    }
    const user = await prisma.user.create({
      data: {
        username: username,
        password: password
      }
    })
    console.log(user);
    res.json(user)
  } catch (error) {
    res.status(500).json({error: "Internal server error"})
  }
})

app.post("/signin", async (req: Request , res: Response)=> {
  const {username, password} = req.body;
  try{
    const user = await prisma.user.findUnique({
      where: {
        username,
        password
      }
    })
    if (!user) {
      res.status(401).json({error: "Invalid credentials"})
      return
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({error: "Internal server error"})
  }
})

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})