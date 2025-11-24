import { Model, DataTypes } from "sequelize";

import { sequelize } from "../util/db.js";

class Membership extends Model {}

Membership.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "blog_id",
      references: { model: "blogs", key: "id" },
    },
    readingListId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "reading_list_id",
      references: { model: "reading_lists", key: "id" },
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "membership",
  }
);

export { Membership };
