"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("messages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      channelUsersId: {
        type: Sequelize.INTEGER,
        field: "channel_users_id"
      },
      channelId: {
        type: Sequelize.INTEGER,
        field: "channel_id"
      },
      message: {
        type: Sequelize.TEXT,
        field: "message"
      },
      username: {
        type: Sequelize.STRING
      },
      replied: {
        type: Sequelize.BOOLEAN
      },
      repliedAnswer: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        field: "created_at"
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        field: "updated_at"
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("messages");
  }
};
