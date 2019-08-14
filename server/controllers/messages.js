const ChannelUsers = require("../models").ChannelUsers;
const Messages = require("../models").Messages;

module.exports = {
  async createOrUpdate(data) {
    try {
      const {
        channelUsersId,
        message,
        username,
        channelId,
        answer = false,
        messageId
      } = data;
      if (answer) {
        const result = await Messages.update(
          {
            replied: true,
            repliedAnswer: answer
          },
          {
            where: { id: messageId }
          }
        );
        return result.id;
      }
      const result = await Messages.create({
        channelUsersId,
        message,
        username,
        replied: answer,
        channelId
      });
      return result.id;
    } catch (e) {
      console.log(e);
    }
  }
};
