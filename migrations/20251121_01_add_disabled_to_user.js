import { DataTypes } from "sequelize";

const up = async ({ context }) => {
  await context.addColumn("users", "disabled", {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  });
};

const down = async ({ context }) => {
  await context.removeColumn("users", "disabled");
};

export { up, down };