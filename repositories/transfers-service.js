import dao from "./dao";
const bcrypt = require("bcrypt");
import { getAccountBalance } from "./account-service";
import repository from "./repository";

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

    const originBalance = await getAccountBalance(originAccountId)
      .then((data) => data.balance)
      .catch((error) => console.log(error));

    await repository.addMovement(
      originAccountId,
      `TR.${originAccountId} D:${destinyAccountId}`,
      -amount,
      originBalance
    );

    await dao.run(updateDestinyBalance).catch((error) => console.log(error));

    const destinyBalance = await getAccountBalance(destinyAccountId)
    .then((data) => data.balance)
    .catch((error) => console.log(error));

    await repository.addMovement(
      originAccountId,
      `TR.${originAccountId} D:${destinyAccountId}`,
      amount,
      destinyBalance
    );

    return getAccountBalance(originAccountId);
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

  static async setStatusDone(transferId, remainingBalance) {
    console.log(remainingBalance);
    await dao
      .run(
        `UPDATE transfers SET status = 'done', remaining_balance = '${remainingBalance}' where transfer_id = '${transferId}';`
      )
      .catch((error) => console.log(error));
  }

  static async getPaginatedTransfers(
    accountId,
    fromDate,
    untilDate,
    page,
    limit
  ) {
    return dao.all(`SELECT * FROM transfers
    WHERE origin_account = '${accountId}'
    AND created_at
    BETWEEN '${fromDate}' AND '${untilDate}'
    LIMIT '${limit}' OFFSET '${limit * (page - 1)}';
    `);
  }
}
