"use strict";

module.exports = (sequelize, DataTypes) => {
  const ChannelUsers = sequelize.define(
    "ChannelUsers",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      channelsId: { type: DataTypes.INTEGER, field: "channels_id" },
      username: DataTypes.STRING,
      tries: DataTypes.INTEGER,
      correct: DataTypes.BOOLEAN,
      createdAt: { type: DataTypes.DATE, field: "created_at" },
      updatedAt: { type: DataTypes.DATE, field: "updated_at" }
    },
    { tableName: "channel_users" }
  );

  // Classroom.associate = function(models) {
  //   Classroom.hasMany(models.Student, {
  //     foreignKey: 'classroom_id',
  //     as: 'students',
  //   });
  // };

  return ChannelUsers;
};
