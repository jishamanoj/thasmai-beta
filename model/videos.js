require('dotenv').config();
const { database } = require('firebase-admin');
const { DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    logging: false,
});

const Video = sequelize.define('video', {
    playList_heading:{
        type: DataTypes.STRING,
        
    },
    Video_heading:{
        type: DataTypes.JSON,
       
    },
    videoLink: { 
        type: DataTypes.JSON, 
        
    },
    category: { 
        type: DataTypes.STRING, 
        
    },
    playList_image: {
        type:DataTypes.STRING
    }  , 
    position:{
    type: DataTypes.INTEGER
    }
}, {
    timestamps: false,
});

Video.sync({ alter: true })
    .then(() => {
        console.log("Video table created");
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = Video;