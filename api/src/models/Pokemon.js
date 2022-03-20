const { Sequelize, DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "pokemon",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      pokeid: {
        type: DataTypes.INTEGER,
      },
      created: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      vida: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      fuerza: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      defensa: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      velocidad: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      altura: {
        type: DataTypes.FLOAT,
      },
      peso: {
        type: DataTypes.FLOAT,
      },
      img: {
        type: DataTypes.STRING(1000),

        validate: {
          isURL: true,
        },
      },
      hide: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
