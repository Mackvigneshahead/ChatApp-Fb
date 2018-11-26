'use strict';

/*

const express=require('express');

const router=express.Router();

const path=require('path');

router.get('/',(req,res)=>{
    res.render('login');
});

router.get('/chat',(req,res)=>{
    res.render('chatroom');
});

router.get('/rooms',(req,res)=>{
    res.render('rooms');
});

router.get('/info',(req,res)=>{
    res.send("<h1> Information Page </h1>");
});

router.get('/*',(req,res,next)=>{
    res.statusCode=404;
    res.sendFile(path.join(process.cwd(),'/views/404.htm'));
});


module.exports={
    router:router
};


*/

console.log('app/index outside');

require('./auth')();

module.exports={

     router: require('./routes')(),
     session: require('./session')
}
