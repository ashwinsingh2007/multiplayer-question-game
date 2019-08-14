const Users = require("../models").Users;

module.exports = {
  async create(req, res) {
    const { username, password } = req.body;
    const users = await Users.findAll({
      where: { username }
    });
    if (users && users[0] && users[0].username) {
      return res.status(200).send({
        error: "username already exist. Please select other username !"
      });
    }
    return Users.create({
      username,
      password
    })
      .then(() => {
        res.status(200).send({ username });
      })
      .catch(e => console.log(e));
  },
  validate(req, res) {
    const { username, password } = req.body;
    return Users.findAll({
      where: { username, password }
    })
      .then(users => {
        if (users[0] && users[0].username) {
          return res.status(200).send({ username });
        } else {
          return res
            .status(200)
            .send({ error: "Username or Password is wrong !" });
        }
      })
      .catch(e => console.log(e));
  }
};
