import express from "express";
import { PORT } from "./util/config.js";
import { connectToDatabase } from "./util/db.js";
import { router as blogsRouter, errorHandler } from "./controllers/blogs.js";
import {
  router as usersRouter,
  userErrorHandler,
} from "./controllers/users.js";
import { router as loginRouter } from "./controllers/login.js";
import { router as authorRouter } from "./controllers/authors.js";
import { router as readingListRouter } from "./controllers/readinglists.js";
import { router as logOutRouter } from "./controllers/logout.js";

const app = express();

app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/authors", authorRouter);
app.use("/api/readinglists", readingListRouter);
app.use("/api/logout", logOutRouter);
app.use(errorHandler);
app.use(userErrorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
