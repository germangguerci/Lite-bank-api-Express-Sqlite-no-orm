import accounts from "../repositories/accounts";

export default class {
    static async addAccount(req, res) {
        let account = await accounts.addAccount(req.body);
        //Insertar manejo de errores aqui, modificar status dependiendo el flujo. 
        return res.send({ account });
      }
    
    static async createPin(req, res) {
        let response = await accounts.createPin(req.body);
        return res.send({response})
    }
}