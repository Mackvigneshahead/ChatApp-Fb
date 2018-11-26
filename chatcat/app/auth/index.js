'use strict';

const passport=require('passport');

const passsportfacebook=require('passport-facebook').Strategy;

const config=require('../config');

const helpers=require('../helpers');


console.log('/auth/index outside');

module.exports=()=>{

    console.log('/auth/index inside');
    passport.serializeUser((user,done)=>{
     
        console.log('Serialized successfully');
        done(null,user.id);
   
    });

    passport.deserializeUser((id,done)=>{

        helpers.findById(id).then((user)=>{

            console.log('Deserialized user');
            done(null,user);

        }).catch((err)=>{

           console.log('Error when deserializing the user');
           console.log(err);

        });

    });

    const authprocess=(accesstoken,refreshtoken,profile,done)=>{
         
        console.log(`Auth Process in`);
        console.log('PROFILE:'+profile);
        helpers.findone(profile).then((result)=>{ 
            if(result){
    
              console.log('User found');
              done(null,result);
            }
            else{
    
                console.log('User not found');
    
                helpers.newUser(profile).then((result)=>{
    
                    console.log('Created a user successfully');
                    done(null,result);
                    
                }).catch((error)=>{
                    console.log(`Error found while creating a new user: ${error}`);
    
                });
            }
           
        });
    }
    
    console.log('FB data:');
    console.log(config.fb);
    passport.use(new passsportfacebook(config.fb,authprocess));

}