const bcrypt = require("bcrypt");

import dao from "./dao";
import repository from "./repository";
import { generateCBU, getAccountBalance } from "./account-service";

const saltRounds = 10;

export default class {
  static async addAccount(payload) {
    try {
      let user_id;
      const {
        full_name,
        date_of_birth,
        dni,
        phone,
        email,
        username,
        password,
      } = payload;
      //Buscar usuario mediante dni.
      const findUser = await dao.get(
        `SELECT user_id FROM USERS where dni = ?`,
        [dni]
      );
      //SI existe: obtener el user_id y validar contraseña.
      if (findUser) {
        user_id = findUser.user_id;
        const user = await repository.getUserByUsername(username);
        const passwordIsValid = await bcrypt.compare(password, user.password);
        //Si el password no coincide con el password guardado en la bd, retornar error.
        if (!passwordIsValid) {
          return { error: "Invalid username or password" };
        }
      }
      //NO existe: crear usuario y obtener user_id
      else {
        const hashPassword = await bcrypt.hash(password, saltRounds);
        const insertUser = `INSERT INTO users (full_name, date_of_birth, dni, phone, email, username, password)
      VALUES ('${full_name}', julianday('${date_of_birth}'), '${dni}', '${phone}', '${email}', '${username}', '${hashPassword}') ;`;
        await dao
          .run(insertUser)
          .then(async () => {
            //obtener el user_id del nuevo usuario.
            const newUser = await dao.get(
              `SELECT user_id FROM USERS where dni = ?`,
              [dni]
            );
            user_id = newUser.user_id;
          })
          .catch((error) => {
            //SQLITE_CONSTRAINT: UNIQUE constraint failed: users.username
            console.log(error);
          });
      }
      //Obtener cbu y numero de cuenta.
      const lastAccountId =
        (await dao.get(`select max(account_id) as 'id' from accounts;`))?.id ||
        "100000000000";
      const cbu = generateCBU(999, 1, lastAccountId);
      const accountId = cbu.slice(9, 21);
      await dao.run(`INSERT INTO accounts (account_id, user_id, cbu, balance, currency )
    VALUES (
    '${accountId}',
    '${user_id}',
    '${cbu}',
    '0',
    'ARS'
    );`);
      const newAccount = await dao.get(
        `select * from accounts where account_id = '${accountId}';`
      );
      const today = new Date();
      return {
        succes: true,
        data: {
          user_data: {
            user_id,
            username: payload?.username,
          },
          created_account_data: {
            account_id: newAccount.account_id,
            cbu: newAccount.cbu,
            account_balance: newAccount.balance,
            currency: newAccount.currency,
            created_at: today.toString(),
          },
        },
      };
    } catch (error) {
      return {
        sucess: false,
        error: "Unexpected error, please retry in a few minutes.",
      };
    }
  }

  static async createPin(payload) {
    try {
      const { user_id, account_id, pin } = payload;
      //verificar que exista la cuenta asociada al usuario y que el pin sea distinto a ''.
      const response = await dao.get(
        `select pin from accounts where user_id = '${user_id}' and account_id = '${account_id}';`
      );
      if (typeof response === "undefined") {
        return {
          "succes:": false,
          error: "Cant find associated account",
        };
      }
      //Encriptar pin
      const hashPin = await bcrypt.hash(pin, saltRounds);
      //Realizar el update
      await dao.run(`UPDATE accounts
    SET pin = "${hashPin}"
    WHERE user_id = "${user_id}" AND account_id = "${account_id}";`);
      return {
        success: true,
      };
    } catch (error) {
      return {
        sucess: false,
        error: "Unexpected error, please retry in a few minutes.",
      };
    }
  }

  static async devDeposit(payload) {
    try {
      const { account_id, amount } = payload;
      await dao
        .run(
          `UPDATE accounts
    SET balance = ((SELECT balance FROM accounts where account_id = '${account_id}') + '${amount}')
    WHERE account_id = "${account_id}";`
        )
        .catch((error) => {
          console.log(error);
          return {
            success: false,
            error: "Error trying to update account.",
          };
        });
      const balance = await getAccountBalance(account_id)
        .then((data) => data.balance)
        .catch((error) => {
          console.log(error);
        });
      await repository.addMovement(
        account_id,
        "TEST Deposit from devDeposit endpoint",
        amount,
        balance
      );
      return {
        success: true,
        data: {
          amount,
          updated_balance: balance,
        },
      };
    } catch (error) {
      return {
        sucess: false,
        error: "Unexpected error, please retry in a few minutes.",
      };
    }
  }
}
