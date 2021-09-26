import accounts from "../repositories/accounts";

export default class {
    static async addAccount(req, res) {
        let account = await accounts.addAccount(req.body);
        return res.send({ account });
      }
}