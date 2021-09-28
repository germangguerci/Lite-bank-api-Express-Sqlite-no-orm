import dao from "./dao";
const bcrypt = require("bcrypt");

export default class {
  static async transferCash(
    originAccountId,
    destinyAccountId,
    originNewBalance,
    amount
  ) {
    await dao
      .run(
        `
        UPDATE accounts
        SET balance = '${originNewBalance}' 
        WHERE account_id = '${originAccountId}';
        `
      )
      .catch((error) => console.log(error));

    const updateDestinyBalance = `
    UPDATE accounts
    SET balance = ((SELECT balance FROM accounts where account_id = '${destinyAccountId}') + '${amount}')
    WHERE account_id = '${destinyAccountId}';
    `;
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
}
