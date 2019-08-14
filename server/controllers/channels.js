const ChannelUsers = require("../models").ChannelUsers;
const Channels = require("../models").Channels;

module.exports = {
  async create(req, res) {
    try {
      const { title, word, username } = req.body;
      await Channels.create({
        title,
        word,
        username
      });
      res.status(200).send("ok");
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  },

  async list(req, res) {
    try {
      let channelUsers = await ChannelUsers.findAll({
        attributes: ["id", "channelsId"]
      });
      const channels = await Channels.findAll({
        attributes: ["id", "title", "word", "username"],
        order: [["createdAt", "DESC"]]
      });

      const formatedChannels = channels.map(nw => ({
        by: nw.username,
        id: nw.id,
        title: nw.title,
        word: nw.word,
        attempted: channelUsers.filter(ch => ch.correct === true),
        attempting: channelUsers.filter(ch => ch.correct === false)
      }));
      res.status(200).json(formatedChannels);
    } catch (e) {
      res.status(400).send(e);
    }
  }
};
