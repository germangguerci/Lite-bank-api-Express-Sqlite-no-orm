import accounts from "../repositories/accounts";

export default class {
  static async addAccount(req, res) {
    let response = await accounts.addAccount(req.body);

    if (response.success) {
      return res.send({ response });
    } else {
      return res.status(400).send({ response });
    }
  }

  static async createPin(req, res) {
    let response = await accounts.createPin({
      ...req.body,
      user_id: req.userId,
    });
    if (response.success) {
      return res.send({ response });
    } else {
      return res.status(400).send({ response });
    }
  }

  static async devDeposit(req, res) {
    let response = await accounts.devDeposit(req.body);
    if (response.success) {
      return res.send({ response });
    } else {
      return res.status(400).send({ response });
    }
  }
}
