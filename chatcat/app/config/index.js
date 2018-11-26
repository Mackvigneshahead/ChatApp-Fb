'use strict';

console.log('/config/index outside');

if(process.env.NODE_ENV === 'production'){

   module.exports = {
      host:process.env.host || "",
      dbURI:process.env.dbURI,
      sessionSecret:process.env.sessionSecret,
      fb:{
         "clientId": process.env.fbclientID,
         "clientSecret":process.env.fbclientSecret,
         "callbackURL":process.env.host +"/auth/facebook/callback",
         "profileFields":["id","displayName","photos"],
         "enableProof": true
      }
   };
}
else{
    console.log('/config/index inside');
    const a=require('./development.json');
    console.log(a);
    module.exports=a;
}

