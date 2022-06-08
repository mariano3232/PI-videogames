const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('videogame', {
    id:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey:true,
      allowNull:false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.TEXT,
      allowNull:false
    },
    released:{
      type:DataTypes.STRING,
    },
    rating:{
      type:DataTypes.REAL
    },
    platforms:{
      type:DataTypes.ARRAY(DataTypes.STRING)
    },
    image:{
      type:DataTypes.STRING
    },
    created:{
      type:DataTypes.BOOLEAN,
      defaultValue:true,
    }
  });
};
