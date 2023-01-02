import express from "express";
import userRouter from "./routes/user.route";
import postRouter from "./routes/post.route";

const app = express();

app.use(express.json());

// test route
app.get("/", (_, res) => res.sendStatus(200));

// user Routes
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

app.listen(8008, () => console.log("listing on Port " + 8008));
