import dao from "./dao";

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
}
