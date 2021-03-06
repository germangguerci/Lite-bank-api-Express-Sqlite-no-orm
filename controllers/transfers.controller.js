import transfers from "../repositories/transfers";

export default class {
  static async addTransfer(req, res) {
    let response = await transfers.addTransfer(req.body, req.userId);
    if (response.success) {
      return res.send({ response });
    } else {
      return res.status(400).send({ response });
    }
  }

  static async confirmTransfer(req, res) {
    let response = await transfers.confirmTransfer(req.body, req.userId);
    if (response.success) {
      return res.send({ response });
    } else {
      return res.status(400).send({ response });
    }
  }

  static async getTransfers(req, res) {
    let response = await transfers.getTransfers(req.body, req.userId);
    if (response.success) {
      return res.send({ response });
    } else {
      return res.status(400).send({ response });
    }
  }
}
