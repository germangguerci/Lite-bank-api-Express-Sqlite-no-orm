import dao from "./dao";
import repository from "./repository";
import usersService from "./users-service";
import { Promise as BPromise } from "bluebird";

export default class {
  static async getUserInfo(payload, userId) {
    try {
      //Obener informacion del usuario
      const user = await repository
        .getUserById(userId)
        .then((data) => {
          const { user_id, full_name, date_of_birth, dni, phone, email } = data;
          return { user_id, full_name, date_of_birth, dni, phone, email };
        })
        .catch((error) => console.log(error));
      //Obtener cuentas del usuario
      const userAccounts = await dao.all(
        `SELECT account_id, cbu, currency, balance FROM accounts WHERE user_id = ${userId};`
      );
      //Calcular fechas.
      const { today, fiveDaysAgo } = usersService.getUserInfoDates();
      //Obtener movimientos de los ultimos 5 dias por cada cuenta.
      const accountsMovements = [];

      await BPromise.mapSeries(userAccounts, async (item) => {
        const accountId = item.account_id;
        const movements = await dao
          .all(
            `SELECT description, created_at, import_value, balance FROM movements
        WHERE account_id = '${accountId}'
        AND created_at >= '${fiveDaysAgo}' AND created_at <= '${today}'; `
          )
          .catch((error) => console.log(error));
        accountsMovements.push({
          account_id: accountId,
          last_five_days_movements: movements,
        });
      });
      return {
        success: true,
        data: {
          user,
          userAccounts,
          accountsMovements,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }
}
