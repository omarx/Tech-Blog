const {Model, DataTypes}=require('sequelize');
const sequelize=require('../config/connection');

class Comment extends Model{}

Comment.init({
    
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },
    body:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    post_id:{
        type:DataTypes.INTEGER,
        references:{
            model:'post',
            key:'id'
        }
    },
    user_id:{
        type:DataTypes.INTEGER,
        references:{
            model:'user',
            key:'id'
        }
    }
},  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  })

module.exports=Comment;