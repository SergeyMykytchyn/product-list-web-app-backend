const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Product = sequelize.define("product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  imageUrl: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  count: { type: DataTypes.INTEGER, allowNull: false },
  width: { type: DataTypes.INTEGER, allowNull: false },
  height: { type: DataTypes.INTEGER, allowNull: false },
  weight: { type: DataTypes.STRING, allowNull: false }
});

const Comment = sequelize.define('comment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  description: { type: DataTypes.STRING, allowNull: false }
});

Product.hasMany(Comment);
Comment.belongsTo(Product);

module.exports = {
  Product,
  Comment
};
