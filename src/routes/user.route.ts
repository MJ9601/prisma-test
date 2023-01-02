import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const { user } = new PrismaClient();

router.get("/", async (req, res) => {
  const users = await user.findMany({
    select: { username: true, posts: true },
  });

  return res.status(200).send(users);
});

router.post("/", async (req: Request, res) => {
  const { username } = req.body;
  const userExists = await user.findUnique({ where: { username } });
  if (!userExists) {
    const newUser = await user.create({
      data: { username },
      select: { username: true },
    });
    return res.status(201).send(newUser);
  } else {
    return res.status(403).send("username is already exist!");
  }
});

export default router;
