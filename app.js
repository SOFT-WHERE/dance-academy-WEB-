const fs=require('fs');
const path=require('path');
const express=require('express');
const app=express();
const port=80;

// express stuff
app.use('/static',express.static('static'));
app.use(express.urlencoded());

//endpoints
app.get('/',(req,res)=>{
    const con="this is my first web dev project:";
    const params={'title':"my dance academy web", 'content':con};
    res.status(200).render('index.pug',params);
});

//start SERVER
app.listen(port,()=>{
    console.log(`SERVER has been started at port:: ${port}`);
})
