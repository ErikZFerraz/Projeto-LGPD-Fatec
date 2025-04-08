const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'mysql://root:password@localhost:3306/LGPD'); // substitua pela URL de conexão do seu DB

const User = sequelize.define('User', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  aceitou_marketing: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  data_cadastro: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  rg: {
    type: DataTypes.STRING,
    allowNull: true
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'usuarios',
  timestamps: false
});

module.exports = User;
