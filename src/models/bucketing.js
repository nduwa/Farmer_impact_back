import { Model } from "sequelize";

module.exports = (sequelize, DataTypes) => {
  class Bucket extends Model {
   
  }
  Bucket.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
   
    _kf_Supplier:{
        type: DataTypes.STRING,
        allowNull: false
    },
    _kf_Station:{
        type: DataTypes.STRING,
        allowNull: false
    },
    _kf_Season:{
        type: DataTypes.STRING,
        allowNull:false
    }, 
    day_lot_number:{
        type: DataTypes.STRING,
        allowNull:false
    }, 
    bucketA:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    bucketB:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    bucketC:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    certification:{
        type: DataTypes.STRING,
        allowNull:false
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull:false
    },
    created_by:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
  }, {
    sequelize,
    modelName: 'Bucket',
  });
  return Bucket;
};