import express from "express";
import { Blog } from "../models/blog.js";

const router = express.Router();

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

const errorHandler = (err, _req, res, next) => {
  console.error(err.message);
  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({ error: err.errors.map((e) => e.message) });
  }
  if (err.name === "NotFoundError") {
    return res.status(404).json({ error: err.message });
  }
  res.json(err.message);
  next(err);
};

router.get("/", async (req, res, next) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", blogFinder, async (req, res, next) => {
  try {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    res.json(req.blog);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", blogFinder, async (req, res, next) => {
  try {
    res.json(req.blog);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", blogFinder, async (req, res, next) => {
  try {
    await req.blog.destroy();
  } catch (error) {
    next(error);
  }
});

export { router, errorHandler };
