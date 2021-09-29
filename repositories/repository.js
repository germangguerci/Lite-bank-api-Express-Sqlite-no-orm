import dao from "./dao";

export default class {
  static async getUserByUsername(username) {
    return dao.get("SELECT * FROM users WHERE username =?", [username]);
  }

  static async getUserById(id) {
    return dao.get("SELECT * FROM users WHERE user_id = ?", [id]);
  }

  static async addMovement(accountId, description, importValue, balance) {
    return dao
      .run(
        `
    INSERT INTO movements
    (account_id, import_value, description, balance)
    VALUES (
    '${accountId}',
    '${importValue}',
    '${description}',
    '${balance}'
    ) ;`
      )
      .catch((error) => console.log(error));
  }
}
