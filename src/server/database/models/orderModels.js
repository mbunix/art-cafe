import sequelize from "sequelize"

const Order = sequelize.define('Order', {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  user_id: {
    type: sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  shippingAddress: {
    type: sequelize.JSON,
    allowNull: false
  },
  paymentMethod: {
    type: sequelize.STRING,
    allowNull: false
  },
  paymentResult: {
    type: sequelize.JSON
  },
  taxPrice: {
    type: sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0.0
  },
  shippingPrice: {
    type: sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0.0
  },
  totalPrice: {
    type: sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0.0
  },
  isPaid: {
    type: sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  paidAt: {
    type: sequelize.DATE
  },
  isDelivered: {
    type: sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  deliveredAt: {
    type: sequelize.DATE
  },
  createdAt: {
    type: sequelize.DATE,
    allowNull: false
  },
  updatedAt: {
    type: sequelize.DATE,
    allowNull: false
  }
})
export default Order
