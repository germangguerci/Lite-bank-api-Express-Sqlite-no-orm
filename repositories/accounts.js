const bcrypt = require("bcrypt");

import dao from "./dao";
import repository from "./repository";

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
    //SI existe: obtener el user_id y validar contraseña. 
    if (findUser) {
      user_id = findUser.user_id;
      const user = await repository.getUserByUsername(username);
      const passwordIsValid = await bcrypt.compare(password, user.password);
      //Si el password no coincide con el password guardado en la bd, retornar error.  
      if(!passwordIsValid){
          return { error: "Invalid username or password" };
      }
    }
    //NO existe: crear usuario y obtener user_id
    else {
      const hashPassword = await bcrypt.hash(
        password,
        saltRounds
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
