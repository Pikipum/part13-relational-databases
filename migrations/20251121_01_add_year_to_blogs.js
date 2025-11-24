import { DataTypes } from "sequelize";

const up = async ({ context: queryInterface }) => {
  await queryInterface.addColumn("blogs", "year", {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1991,
      max: new Date().getFullYear(),
    },
  });
};
const down = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn("blogs", "year");
};

export { up, down };
