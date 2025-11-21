import express from "express";
import { Blog } from "../models/index.js";
import { User } from "../models/index.js";
import { Op, fn, col, literal } from "sequelize";
import { sequelize } from "../util/db.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const authors = await Blog.findAll({
      attributes: [
        "author",
        [fn("COUNT", col("id")), "articles"],
        [fn("SUM", col("likes")), "likes"],
      ],
      group: ["author"],
      order: [[literal("likes"), "DESC"]],
    });

    res.json(authors);
  } catch (error) {
    next(error);
  }
});

export { router };
