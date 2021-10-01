import {
  CREATE_USERS_TABLE,
  CREATE_DEPOSITS_TABLE,
  CREATE_TRANSFERS_TABLE,
  CREATE_ACCOUNTS_TABLE,
  CREATE_MOVEMENTS_TABLE,
} from "../dbquerys";
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("bankDb.s3db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

export default class {
  static setupDbForDev() {
    db.serialize(function () {
      db.get("PRAGMA foreign_keys = ON");
      db.run(CREATE_USERS_TABLE);
      db.run(CREATE_ACCOUNTS_TABLE);
      db.run(CREATE_TRANSFERS_TABLE);
      db.run(CREATE_DEPOSITS_TABLE);
      db.run(CREATE_MOVEMENTS_TABLE);
    });
  }

  static all(stmt, params) {
    return new Promise((res, rej) => {
      db.all(stmt, params, (error, result) => {
        if (error) {
          return rej(error.message);
        }
        return res(result);
      });
    });
  }
  static get(stmt, params) {
    return new Promise((res, rej) => {
      db.get(stmt, params, (error, result) => {
        if (error) {
          return rej(error.message);
        }
        return res(result);
      });
    });
  }

  static run(stmt, params) {
    return new Promise((res, rej) => {
      db.run(stmt, params, (error, result) => {
        if (error) {
          return rej(error.message);
        }
        return res(result);
      });
    });
  }
}
