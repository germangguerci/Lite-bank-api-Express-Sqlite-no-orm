import {
  CREATE_USERS_TABLE,
  CREATE_DEPOSITS_TABLE,
  CREATE_TRANSFERS_TABLE,
  CREATE_ACCOUNTS_TABLE,
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
      /*   let password = "Azucar1234!";
      bcrypt.hash(password, saltRounds, function (err, hash) {
        const insertUsers = `INSERT INTO users (full_name, date_of_birth, dni, phone, email, username, password)
        VALUES ('Pedro Picapiedra', julianday('1996-12-12'), '40130620', '542257624787', 'pedropicapiedra@gmail.com', 'pedropicapiedra', '${hash}'),
        ('Marge Simpson', julianday('1985-10-11'), '30130620', '542257624787', 'pedropicapiedra@gmail.com', 'pedropicapiedra', '${hash}');`;
        db.run(insertUsers);
      }); */
    });
    //  db.close();
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
