import users from "../repositories/users";

export default class {
  static async getUserInfo(req, res) {
    let response = await users.getUserInfo(req.body, req.userId);
    return res.send(response);
  }
}
