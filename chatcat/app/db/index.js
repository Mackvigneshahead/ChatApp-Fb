'use strict';

const config=require('../config');

const Mongoose=require('mongoose').connect(config.dbURI);

console.log('/db/index outside');

Mongoose.connection.on('error',(err)=>{

    console.log('Mongoose error:'+err);
});

const userdata=new Mongoose.Schema({
    profileId:String,
    fullname:String,
    profilePic:String
});

let userchatdetails=Mongoose.model('userchat',userdata);



module.exports={
    Maangoose:Mongoose,
    userchatdetails
};