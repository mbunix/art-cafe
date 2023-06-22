const { DataTypes } = require('sequelize')
const sequelize = require('../database/connection')

const NFT = sequelize.define('NFT', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  artist: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  tokenId: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = NFT
