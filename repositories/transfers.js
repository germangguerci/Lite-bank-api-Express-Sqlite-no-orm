import dao from "./dao";

export default class {
  static async addTransfer(payload, userId) {
    const { account_id, destiny_cbu, amount } = payload;
    //Comprobar cuenta de origen
    const originData = await dao
      .get(
        `SELECT cbu, balance FROM accounts where account_id = '${account_id}' and user_id = '${userId}'`
      )
      .catch((error) => console.log(error));
    if (typeof originData.cbu === "undefined") {
      return {
        success: false,
        error: `Cant find account with account_id: ${account_id} for linked to current user`,
      };
    }
    //Buscar destinyAccountId a partir de destiny_cbu
    const destinyAccountId = await dao
      .get(`SELECT account_id FROM accounts where cbu = '${destiny_cbu}'; `)
      .catch((error) => console.log(error));
    if (typeof destinyAccountId?.account_id === "undefined") {
      return {
        success: false,
        error: `Cant find cbu linked to our clients database`,
      };
    }
    //Generar transferencia
    await dao.run(`INSERT INTO transfers (origin_account, destiny_account, value, remaining_balance)
    VALUES (
    '${account_id}',
    '${destinyAccountId.account_id}',
    '${amount}',
    '${originData.balance}'
    ) ;`);
    //Si el monto es menor o igual a $10000,00 (1000000) Int.
    //Completar transferencia

    //No
    //Pedir pin
    //Comprobar pin

    //SI el pin es valido cursar transferencia
    //No devolver error

    //console.log(payload);
    return {
      success: true,
      data: {
        origin_cbu: originData.cbu,
        destiny_cbu,
        origin_account_id: account_id,
        destiny_account_id: destinyAccountId.destiny_account_id,
        amount,
      },
    };
  }
}
