import dao from "./dao";

export default class {
    static async addAccount(payload) {
        //Buscar usuario mediante dni.
            //SI existe: obtener el user_id
            //NO existe: crear usuario y obtener user_id
        //Crear cuentas
            //TRUE dolares: Crear caja de ahorro en pesos y caja de ahorro en dolares. 
            //FALSE dolares: Crear caja de ahorro
        //Devolver informacion de cuentas creadas.
       return {
           "succes": true, 
           "data": payload
       };
    }
}