const bcrypt = require("bcrypt");

import dao from "./dao";

const saltRounds = 10;

export default class {
  static async addAccount(payload) {
    let user_id;
    const { full_name, date_of_birth, dni, phone, email, username, password } =
      payload;
    //Buscar usuario mediante dni.
    const findUser = await dao.get(`SELECT user_id FROM USERS where dni = ?`, [
      dni,
    ]);
    //SI existe: obtener el user_id
    if (findUser) {
      user_id = findUser.user_id;
    }
    //NO existe: crear usuario y obtener user_id
    else {
      const hashPassword = bcrypt.hash(
        password,
        saltRounds,
        (err, hash) => hash
      );
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
    //Crear cuentas
    //TRUE dolares: Crear caja de ahorro en pesos y caja de ahorro en dolares.
    //FALSE dolares: Crear caja de ahorro
    //Devolver informacion de cuentas creadas.
    return {
      succes: true,
      user_id,
      data: payload,
    };
  }
}
