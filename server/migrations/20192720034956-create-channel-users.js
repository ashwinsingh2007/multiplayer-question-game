"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("channel_users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      channelsId: {
        type: Sequelize.INTEGER,
        field: "channels_id"
      },
      tries: {
        type: Sequelize.INTEGER,
        field: "tries"
      },
      correct: {
        type: Sequelize.BOOLEAN,
        field: "correct"
      },
      username: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable("channel_users");
  }
};
