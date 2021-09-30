import users from "../repositories/users";

export default class {
  static async getUserInfo(req, res) {
    let response = await users.getUserInfo(req.body, req.userId);
    if (response.success) {
      return res.send({ response });
    } else {
      return res.status(400).send({ response });
    }
  }
}
