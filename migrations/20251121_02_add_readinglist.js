import { DataTypes } from "sequelize";

const up = async ({ context }) => {
  await context.createTable("reading_lists", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.TEXT, allowNull: false, unique: true },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
      onDelete: "cascade",
    },
  });

  await context.createTable("memberships", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "blogs", key: "id" },
      onDelete: "cascade",
    },
    reading_list_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "reading_lists", key: "id" },
      onDelete: "cascade",
    },
  });
};

const down = async ({ context }) => {
  await context.dropTable("memberships");
  await context.dropTable("reading_lists");
};

export { up, down };
