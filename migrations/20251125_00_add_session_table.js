import { DataTypes } from "sequelize";

const up = async ({ context }) => {
  await context.createTable("sessions", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

const down = async ({ context }) => {
  await context.dropTable("sessions");
};

export { up, down };
