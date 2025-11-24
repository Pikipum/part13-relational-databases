import { DataTypes } from "sequelize";

const up = async ({ context }) => {
  await context.addColumn("memberships", "read", {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  });
};

const down = async ({ context }) => {
  await context.removeColumn("memberships", "read");
};

export { up, down };