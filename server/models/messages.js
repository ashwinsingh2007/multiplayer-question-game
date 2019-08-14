"use strict";

module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define(
    "Messages",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      channelUsersId: { type: DataTypes.INTEGER, field: "channel_users_id" },
      channelId: { type: DataTypes.INTEGER, field: "channel_id" },
      username: DataTypes.STRING,
      message: DataTypes.TEXT,
      replied: DataTypes.BOOLEAN,
      repliedAnswer: DataTypes.TEXT,
      createdAt: { type: DataTypes.DATE, field: "created_at" },
      updatedAt: { type: DataTypes.DATE, field: "updated_at" }
    },
    { tableName: "messages" }
  );

  // Classroom.associate = function(models) {
  //   Classroom.hasMany(models.Student, {
  //     foreignKey: 'classroom_id',
  //     as: 'students',
  //   });
  // };

  return Messages;
};
