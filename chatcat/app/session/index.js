'use strict';

const session=require('express-session');

const mongoStore=require('connect-mongo')(session);

const config=require('../config');

const db=require('../db');

console.log('session/index outside');

if(process.env.NODE_ENV === 'production'){

   module.exports=session({
       secret:config.sessionSecret,
       resave:false,
       saveUninitialized:false,
       store:new mongoStore({
           mongooseConnection:db.Maangoose 
       })
   });

}
else{
    console.log('session/index inside');
    module.exports=session({
        secret:config.sessionSecret,
        resave:false,
        saveUninitialized:true
    });
    console.log('session already set');
}
