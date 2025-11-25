import express from "express";
const router = express.Router();

import { Session } from "../models/session.js";

router.post("/", async (request, response) => {
  const authorization = request.get("authorization");

  const session = await Session.findOne({
    where: { token: authorization.slice(7) },
  });
  session.destroy();

  return response.status(401).json({
    message: "log out succesful",
  });
});

export { router };
