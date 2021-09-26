import express from "express";
import dao from "./repositories/dao";
import { authenticated, authMiddleware } from "./controllers/auth.controller";
import authRoutes from "./routes/auth.routes";
import itemsRoutes from "./routes/items.routes";
import accountsRoutes from "./routes/accounts.routes";
const session = require("express-session");
import * as sqlite3 from "sqlite3";
import sqliteStoreFactory from "express-session-sqlite";

const port = 3000;
export const app = express();

app.listen(port, () =>
  console.log(`Authentication example app listening on port ${port}!`)
);
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
app.use("/api/items", authenticated, itemsRoutes);
app.use("/api/accounts", accountsRoutes);
