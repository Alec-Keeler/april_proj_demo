'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Boardgame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Boardgame.hasMany(models.Review, { foreignKey: 'gameId' })
    }
  }
  Boardgame.init({
    name: DataTypes.STRING,
    maxPlayers: DataTypes.INTEGER,
    category: DataTypes.INTEGER,
    avgRating: DataTypes.NUMERIC
  }, {
    sequelize,
    modelName: 'Boardgame',
  });
  return Boardgame;
};