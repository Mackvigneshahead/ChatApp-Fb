'use strict';

const h=require('../helpers');

const path=require('path');

const passport=require('passport');

console.log('routers/index outside');

module.exports=()=>{

    console.log('routers/index inside');

    let routes={

        'get':{
            '/':(req,res,next)=>{
                res.render('login');
            },
            '/chat':(req,res,next)=>{
                res.render('chatroom');
            },
            '/rooms':(req,res,next)=>{
                res.render('rooms');
            },
            '/auth/facebook':passport.authenticate('facebook'),

            '/auth/facebook/callback':passport.authenticate('facebook',{
                successRedirect: '/rooms',
                failureRedirect: '/'
            }),
            '/getsession':(req,res,next)=>{
                res.send(`Your favourite car :${req.session.car}`);
            },
            '/setsession':(req,res,next)=>{
                req.session.car='Benz';
                res.send('Session set successfully');
            }
        } ,
        'post':{
            '/chat':(req,res,next)=>{
              res.render('chatroom');
            }
        } ,
        'NA':(req,res,next)=>{
            console.log(__dirname);
            console.log(process.cwd());
            res.statusCode=404;
            res.sendFile(path.join(process.cwd(),'/views/404.htm'));
        } 
    }

    return h.route12(routes);
};