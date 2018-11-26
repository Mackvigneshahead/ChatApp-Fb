const express=require('express');

const passport=require('passport');

const app=express();

const chatcat=require('./app');

app.set('port',process.env.PORT || 8086);

app.use(express.static('public'));

app.set('view engine','ejs');

app.use(chatcat.session);

app.use(passport.initialize());

app.use(passport.session());

app.use('/',chatcat.router);

app.listen(app.get('port'),()=>{
    console.log('server is listening on port: ',app.get('port'));
});

