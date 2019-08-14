"use strict";

module.exports = (sequelize, DataTypes) => {
  const Channels = sequelize.define(
    "Channels",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      title: DataTypes.STRING,
      word: DataTypes.STRING,
      username: DataTypes.STRING,
      createdAt: { type: DataTypes.DATE, field: "created_at" },
      updatedAt: { type: DataTypes.DATE, field: "updated_at" }
    },
    { tableName: "channels" }
  );
  return Channels;
};
