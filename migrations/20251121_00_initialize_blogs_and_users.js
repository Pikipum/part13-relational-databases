import { DataTypes } from "sequelize";

const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable("blogs", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  });

  await queryInterface.createTable("users", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      isEmail: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  });
  await queryInterface.addColumn("blogs", "user_id", {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "users", key: "id" },
  });
};
const down = async ({ context: queryInterface }) => {
  await queryInterface.dropTable("blogs");
  await queryInterface.dropTable("users");
};

export { up, down };
