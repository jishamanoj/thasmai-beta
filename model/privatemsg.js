require('dotenv').config();
const { DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    logging: false,
    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },

});

const privateMsg = sequelize.define ('privateMsg',{
    UId : { type:DataTypes.INTEGER} ,
    message :{ type:DataTypes.TEXT} ,
    messageTime :{ type: DataTypes.STRING},
    messageDate:{ type: DataTypes.STRING},
    messagetype : { type:DataTypes.STRING},
    isAdminMessage:{type: DataTypes.BOOLEAN},

});
sequelize.sync({alter:true})
    .then((data) => {
       // console.log(data);
        console.log('privatemsg table created');
    })
    .catch((err) => {
        console.log(err);
    });
    module.exports =privateMsg;