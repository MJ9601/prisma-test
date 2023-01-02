import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const { post } = new PrismaClient();

router.get("/", async (req, res) => {
  const posts = await post.findMany({
    select: { user: true, title: true, post: true, updated_at: true },
  });

  return res.status(200).send(posts);
});

router.post("/", async (req, res) => {
  const { title, user_id, post: postText } = req.body;

  const newPost = await post.create({
    data: { post: postText, title, user_id },
  });

  return res.status(201).send(newPost);
});

export default router;
