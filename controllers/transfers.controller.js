import transfers from "../repositories/transfers";

export default class {
  static async addTransfer(req, res) {
    let response = await transfers.addTransfer(req.body, req.userId);
    return res.send({ response });
  }
}
