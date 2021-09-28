import dao from "./dao";
import transfersService from "./transfers-service";

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

    //Comprobar fondos suficientes.
    if (originData.balance < amount) {
      return {
        success: false,
        error: "insufficient funds",
      };
    }

    //Buscar destinyAccountId a partir de destiny_cbu
    const destinyAccountId = await dao
      .get(`SELECT account_id FROM accounts where cbu = '${destiny_cbu}'; `)
      .then((data) => data.account_id)
      .catch((error) => console.log(error));
    if (typeof destinyAccountId === "undefined") {
      return {
        success: false,
        error: `Cant find cbu linked to our clients database`,
      };
    }
    //Generar transferencia
    await dao.run(`INSERT INTO transfers (origin_account, destiny_account, value, remaining_balance)
    VALUES (
    '${account_id}',
    '${destinyAccountId}',
    '${amount}',
    '${originData.balance}'
    ) ;`);
    //Obtener id de transferencia generada.
    const transfer_id = await dao
      .get(`select max(transfer_id) as 'id' from transfers;`)
      .catch((error) => console.log(error));
    const newBalance = originData.balance - amount;
    //Si el monto es menor o igual a $10000,00 (1000000) Int.
    if (amount <= 1000000) {
      await transfersService.transferCash(account_id, destinyAccountId, amount);
      //Actualizar estado.
      await dao.run(
        `UPDATE transfers set status = 'done', remaining_balance = '${newBalance}' where transfer_id = '${transfer_id.id}';`
      );
    } else {
      return {
        success: true,
        data: {
          message: "pending",
          transfer_id,
        },
      };
    }
    return {
      success: true,
      data: {
        origin_cbu: originData.cbu,
        destiny_cbu,
        origin_account_id: account_id,
        destiny_account_id: destinyAccountId,
        amount,
      },
    };
  }

  static async confirmTransfer(payload, userId) {
    const { transfer_id, pin } = payload;
    //Obtener transferencia
    const transfer = await transfersService.getTransfer(transfer_id);
    if (!transfer) {
      return { success: false, error: "Invalid transfer_id" };
    }
    if (transfer.status !== "pending") {
      return { succes: false, error: "Transfer already confirmed" };
    }
    //Validar que la cuenta pertenezca a el usuario.
    const originAccount = await transfersService.validateAccount(
      transfer.origin_account,
      userId
    );
    if (!originAccount) {
      return {
        success: false,
        error: `Current user can't confirm the transfer with id: ${transfer_id}`,
      };
    }
    //Comprobar pin
    const pinIsValid = await transfersService.validatePin(
      pin,
      originAccount.pin
    );
    if (!pinIsValid) {
      return {
        success: false,
        error: `Invalid PIN`,
      };
    }
    //SI el pin es valido cursar transferencia
    const remainingBalance = await transfersService
      .transferCash(
        transfer.origin_account,
        transfer.destiny_account,
        transfer.value
      )
      .catch((error) => console.log(error));
    //Actualizar el estado de la transferencia.
    await transfersService.setStatusDone(transfer_id, remainingBalance);
    return {
      success: true,
    };
  }
}
