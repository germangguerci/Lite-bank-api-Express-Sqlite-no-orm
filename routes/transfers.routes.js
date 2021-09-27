import * as express from "express";

import transfersController from "../controllers/transfers.controller";

const router = express.Router();

router.post("/", transfersController.addTransfer);

module.exports = router;
