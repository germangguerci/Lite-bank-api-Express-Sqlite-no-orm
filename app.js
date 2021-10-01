import express from "express";
import dao from "./repositories/dao";

import { authenticated, authMiddleware } from "./controllers/auth.controller";
import authRoutes from "./routes/auth.routes";
import accountsRoutes from "./routes/accounts.routes";
import transfersRouter from "./routes/transfers.routes";
import usersRouter from "./routes/users.routes";

const port = 3000;
export const app = express();

app.listen(port, () => console.log(`Api-bancaria listening on port ${port}!`));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(authMiddleware);
dao.setupDbForDev();

app.use("/api/auth", authRoutes);
app.use("/api/accounts", authenticated, accountsRoutes);
app.use("/api/transfers", authenticated, transfersRouter);
app.use("/api/users", authenticated, usersRouter);
