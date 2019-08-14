const ChannelUsers = require("../models").ChannelUsers;
const Channels = require("../models").Channels;
const Messages = require("../models").Messages;

module.exports = {
  async findOrCreate(req, res) {
    const { channelsId, username } = req.body;
    let result = await Channels.findAll({
      where: { id: parseInt(channelsId) }
    }).then(res => {
      return {
        by: res[0].username,
        send: null,
        answerStatus: null,
        tries: 0
      };
    });

    if (result.by === username) {
      const messages = await Messages.findAll({
        where: { channelId: channelsId }
      });
      result.listen = username;
      result.messages = messages.map(msg => ({
        username: msg.username,
        channelsId,
        channelUserId: msg.channelUsersId,
        messageId: msg.id,
        receiver: msg.username,
        send: msg.username + msg.channelUsersId,
        token: msg.username + msg.channelUsersId,
        replied: msg.replied,
        originalMessage: msg.message,
        message: msg.message
      }));
      return res.json(result);
    }

    const channelUser = await ChannelUsers.findAll({
      where: { channelsId: parseInt(channelsId), username }
    });
    if (channelUser && channelUser[0] && channelUser[0].id) {
      result.id = channelUser[0].id;
      console.log('00000', channelUser[0].tries)
      // result.answerStatus = channelUser[0].correct;
      if (channelUser[0].tries >= 20) {
        result.answerStatus = "limit";
      }
      result.tries = channelUser[0].tries;
    } else {
      await ChannelUsers.create({
        channelsId,
        tries: 0,
        correct: null,
        username
      })
        .then(res => {
          result.id = res.id;
          return res;
        })
        .catch(e => console.log(e));
    }
    const messages = await Messages.findAll({
      where: { channelUsersId: parseInt(result.id) }
    });
    result.listen = username + result.id;
    result.token = username + result.id;
    result.send = result.by;
    result.channelUserId = result.id;
    result.channelsId = channelsId;
    result.messages = [];
    result.attemptLeft = 20 - result.tries;
    messages.forEach(element => {
      result.messages.push(element);
      if (element.replied) {
        result.messages.push({
          ...result.messages,
          username: result.by,
          message: element.repliedAnswer
        });
      }
    });
    return res.json(result);
  },

  create(req, res) {
    const { channelsId, username = "anonymous" } = req.body;
    return ChannelUsers.create({
      channelsId,
      tries: 0,
      correct: null,
      username
    })
      .then(() => {
        res.status(200).send("ok");
      })
      .catch(e => console.log(e));
  },

  async update(data) {
    const { objectId, userAnswer } = data;
    let channelUsers = await ChannelUsers.findAll({
      where: { id: objectId }
    });

    channelUsers = channelUsers[0];
    const { channelsId } = channelUsers;
    let channel = await Channels.findAll({
      where: { id: channelsId }
    });
    channel = channel[0];
    const { tries, correct } = channelUsers;
    const { word } = channel;
    if (tries >= 20) {
      return { answerStatus: "limit", attemptLeft: 0 };
    }
    return ChannelUsers.update(
      {
        tries: tries + 1,
        correct: userAnswer ? userAnswer === word : null
      },
      { where: { id: objectId } }
    )
      .then(() => {
        if (userAnswer === word) {
          return { answerStatus: true, attemptLeft: 20 - (tries + 1) };
        }
        if (tries + 1 >= 20) {
          return "limit";
        }
        return {
          answerStatus: userAnswer === word,
          attemptLeft: 20 - (tries + 1)
        };
      })
      .catch(e => console.log(e));
  }
};
