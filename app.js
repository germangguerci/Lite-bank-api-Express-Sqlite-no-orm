import express from "express";
import dao from "./repositories/dao";
const session = require("express-session");
import * as sqlite3 from "sqlite3";
import sqliteStoreFactory from "express-session-sqlite";

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

app.use(session({ secret: "super secret string" }));
const SqliteStore = sqliteStoreFactory(session);
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "MAGIC SECRET STRING",
    store: new SqliteStore({
      driver: sqlite3.Database,
      path: "dbtest.sqlite",
      ttl: 604800000, // 1 week in miliseconds
    }),
  })
);

dao.setupDbForDev();

app.use("/api/auth", authRoutes);
app.use("/api/accounts", authenticated, accountsRoutes);
app.use("/api/transfers", authenticated, transfersRouter);
app.use("/api/users", authenticated, usersRouter);
