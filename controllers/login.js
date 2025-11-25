import jwt from "jsonwebtoken";

import express from "express";

import { User } from "../models/index.js";

const router = express.Router();

import { SECRET } from "../util/config.js";
import { Session } from "../models/session.js";

router.post("/", async (request, response) => {
  const body = request.body;

  const user = await User.findOne({
    where: {
      username: body.username,
    },
  });

  const passwordCorrect = body.password === "secret";

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  if (user.disabled) {
    return response.status(401).json({
      error: "user is disabled",
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);
  await Session.create({ userId: userForToken.id, token: token });

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

export { router };
