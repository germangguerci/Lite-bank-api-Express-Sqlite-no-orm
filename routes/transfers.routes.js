import * as express from "express";

import transfersController from "../controllers/transfers.controller";

const router = express.Router();

router.post("/", transfersController.addTransfer);
router.put("/confirm", transfersController.confirmTransfer);
router.get("/", transfersController.getTransfers);

module.exports = router;
