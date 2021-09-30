import * as express from "express";

import usersController from "../controllers/users.controller";

const router = express.Router();

router.get("/", usersController.getUserInfo);

module.exports = router;
