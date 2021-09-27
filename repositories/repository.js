import dao from "./dao";
const bcrypt = require("bcrypt");
const saltRounds = 10;

export default class {
/*   static async getAllItems() {
    return dao.all("SELECT * FROM items", []);
  }

  static async getItemById(id) {
    return dao.get("SELECT * FROM items WHERE id = ?", [id]);
  } */

  static async getUserByUsername(username) {
    return dao.get("SELECT * FROM users WHERE username =?", [username]);
  }

  static async getUserById(id) {
    return dao.get("SELECT * FROM users WHERE user_id = ?", [id]);
  }
}
