import express from "express";
import { Membership } from "../models/membership.js";
import { ReadingList } from "../models/readinglist.js";
import { Blog } from "../models/blog.js";
import { tokenExtractor } from "./blogs.js";

const router = express.Router();

router.post("/", tokenExtractor, async (req, res, next) => {
  try {
    const entry = await Membership.create({
      blogId: req.body.blogId,
      readingListId: req.body.readingListId,
    });
    res.status(201).json(entry);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", tokenExtractor, async (req, res, next) => {
  try {
    const membership = await Membership.findByPk(req.params.id);
    if (!membership) {
      return res.status(404).json({ error: "Reading list entry not found" });
    }
    await membership.update({ read: req.body.read });
    res.json(membership);
  } catch (error) {
    next(error);
  }
});

router.get("/", tokenExtractor, async (_req, res, next) => {
  try {
    const entries = await Membership.findAll({
      include: [
        { model: ReadingList, attributes: ["name"] },
        { model: Blog, attributes: ["title", "author", "url"] },
      ],
    });
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

export { router };
