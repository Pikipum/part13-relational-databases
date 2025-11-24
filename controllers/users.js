import express from "express";
import { Blog, ReadingList } from "../models/index.js";
import { User } from "../models/index.js";

const router = express.Router();

const userErrorHandler = (err, _req, res, next) => {
  console.error(err.message);
  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      error: "Validation failed",
      details: err.errors.map((e) => e.message),
    });
  }
  if (err.name === "NotFoundError") {
    return res.status(404).json({ error: err.message });
  }
  return res.status(500).json({ error: err.message });
};

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Blog,
        attributes: { exclude: ["userId"] },
      },
      {
        model: ReadingList,
        attributes: ["id", "name"],
        include: {
          model: Blog,
          attributes: ["id", "title", "author"],
          through: { attributes: ["id", "read"] },
        },
      },
    ],
  });
  res.json(users);
});

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    user.username = req.user.username;
    await user.save();
    res.json(req.user);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

export { router, userErrorHandler };
