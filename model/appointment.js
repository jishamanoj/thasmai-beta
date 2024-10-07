require('dotenv').config();
const { DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    logging: false,

});
const appointment = sequelize.define('appointment',{
    UId :{type:DataTypes.INTEGER},
    phone:{type:DataTypes.STRING},
   appointmentDate : { type: DataTypes.STRING },
   num_of_people : { type: DataTypes.INTEGER},
   pickup : { type: DataTypes.BOOLEAN},
   from : { type: DataTypes.STRING},
   days: { type: DataTypes.STRING},
   emergencyNumber : { type: DataTypes.STRING},
   //appointment_time: { type: DataTypes.STRING},
   appointment_reason: { type: DataTypes.STRING},
   user_name:{ type:DataTypes.STRING},
   register_date:{ type:DataTypes.STRING},
   appointment_status:{ type:DataTypes.STRING},
   payment:{ type:DataTypes.STRING},
   payment_method:{type : DataTypes.STRING},
   discount:{ type:DataTypes.INTEGER},
   check_out:{ type: DataTypes.STRING},
   imageUrl:{ type:DataTypes.STRING},
   feedback:{ type:DataTypes.STRING},
   rating:{ type:DataTypes.STRING},
   externalUser:{ type:DataTypes.BOOLEAN},
},
{timestamps: false});
sequelize.sync({alter: true})
    .then((data) => {
       // console.log(data);
        console.log('meditation table created');
    })
    .catch((err) => {
        console.log(err);
    });
module.exports = appointment