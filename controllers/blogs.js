import express from "express";
//import { Blog } from "../models/blog.js";
//import { User } from "../models/user.js";

import { Blog } from "../models/index.js";
import { User } from "../models/index.js";
import { Op } from "sequelize";
import { sequelize } from "../util/db.js";

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

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

router.get("/", async (req, res, next) => {
  const where = {};

  if (req.query.search) {
    where.title = {
      [Op.substring]: req.query.search,
    };
    where.author = {
      [Op.substring]: req.query.search,
    };
  }

  try {
    const blogs = await Blog.findAll({
      attributes: { exclude: ["userId"] },
      include: {
        model: User,
        attributes: ["name"],
      },
      order: [["likes", "DESC"]],
      where,
    });

    res.json(blogs);
  } catch (error) {
    next(error);
  }
});

router.post("/", tokenExtractor, async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({
      ...req.body,
      userId: user.id,
      date: new Date(),
    });
    res.json(blog);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", blogFinder, async (req, res, next) => {
  try {
    req.blog.likes = req.body.likes + 1;
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

router.delete("/:id", blogFinder, tokenExtractor, async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (blog && blog.userId == req.userId) {
      await req.blog.destroy();
    }
  } catch (error) {
    next(error);
  }
});

export { router, errorHandler };
