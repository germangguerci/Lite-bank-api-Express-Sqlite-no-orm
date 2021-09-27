import * as express from "express";

import accountsController from "../controllers/accounts.controller";

const router = express.Router();

router.post("/", accountsController.addAccount);
router.post("/pin", accountsController.createPin);
router.put("/devDeposit", accountsController.devDeposit);

module.exports = router;
