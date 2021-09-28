import dao from "./dao";
const bcrypt = require("bcrypt");

export default class {
  static async transferCash(originAccountId, destinyAccountId, amount) {
    const updateOriginBalance = `
    UPDATE accounts
    SET balance = ((SELECT balance from accounts where account_id = '${originAccountId}') - '${amount}')
    WHERE account_id = '${originAccountId}';
    `;
    const updateDestinyBalance = `
    UPDATE accounts
    SET balance = ((SELECT balance FROM accounts where account_id = '${destinyAccountId}') + '${amount}')
    WHERE account_id = '${destinyAccountId}';
    `;
    await dao.run(updateOriginBalance).catch((error) => console.log(error));
    await dao.run(updateDestinyBalance).catch((error) => console.log(error));
  }

  static async getTransfer(transferId) {
    return dao.get(
      `SELECT * FROM transfers WHERE transfer_id = '${transferId}';`
    );
  }

  static async validateAccount(accountId, userId) {
    return dao.get(
      `SELECT * FROM accounts WHERE account_id = '${accountId}' and user_id='${userId}';`
    );
  }

  static async validatePin(pin, originAccountPin) {
    return bcrypt.compare(pin, originAccountPin);
  }

  static async setStatusDone(transferId) {
    await dao
      .run(`UPDATE transfers SET status = 'done';`)
      .catch((error) => console.log(error));
  }
}
