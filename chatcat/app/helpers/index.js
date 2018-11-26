'use strict';

const express=require('express');

const router=express.Router();

const db=require('../db');

console.log('helpers/index outside');

let _registerRoutes=(routes,method)=>{
    
    for(let key in routes){
        if( (typeof routes[key] === 'object') && (routes[key] !==null) && !( routes[key] instanceof Array)){
            
            _registerRoutes(routes[key],key);
        }
        else{
            if(method === 'get'){
                console.log('get in');
                router.get(key,routes[key]);
            } 
            else if(method ==='post'){
                console.log('post in');
                router.post(key,routes[key]);
            }
            else{
                router.use(routes[key]);
            }
        }
    }
    return router;
}

let findone=(profileId)=>{

    console.log("Findone");
    console.log("value:"+profileId);
    return new Promise((resolve,reject)=>{

        db.userchatdetails.findOne({'profileId':profileId},(err,result)=>{

            if(err){
                console.log(`Error at the finding user ${err}`);
                reject(err);
            }
            else{
                console.log(`User found in db`);
                resolve(result);
            }
        });
    });
}

let findById=(id)=>{


    console.log("FindBy Id");
    return new Promise((resolve,reject)=>{
       
        db.userchatdetails.findById(id,(error,user)=>{

            if(error){
               return reject(error);
            }
            else{
                return resolve(user);
            }

        });

    });

};

let newUser=(profile)=>{
 
    return new Promise((resolve,reject)=>{
          
      const user= new db.userchatdetails({
        profileId:profile.id,
        fullname:profile.displayName,
        profilePic:profile.photos[0].value || ''
 
       });

       user.save((error)=>{
           if(error){
               console.log(`Error in Mongoose: ${error}`);
               reject(error);
           }
           else{
               console.log('User data successfully');
               resolve(user);
           }  
       });

    });
 
}

let route12=routes=>{
    console.log('helpers/index inside');
    console.log('calling registerroutes');
    let x= _registerRoutes(routes);
    return x;
}

module.exports={
   route12,
   findone,
   newUser,
   findById
};
