const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactdance', { useNewUrlParser: true, useUnifiedTopology: true }); //contact ->database name
const port = 80;

//mongoose schema
const contactSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    Phone: String,
    Address: String

});

//model
const contact = mongoose.model('contact', contactSchema)

// express stuff
app.use('/static', express.static('static'));
app.use(express.urlencoded());

//pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//endpoints
app.get('/', (req, res) => {
    const con = "this is my first web dev project:";
    const params = { 'title': "my dance academy web", 'content': con };
    res.status(200).render('home.pug', params);
});
app.get('/contact', (req, res) => {

    const params = {};
    res.status(200).render('contact.pug', params);
});
app.post('/contact', (req, res) => {
    var mydata = new contact(req.body);
    mydata.save().then(() => {
        res.send("item added to database: ")
    }).catch(() => {
        res.status(400).send("data not added to database!! ")
    });
    // res.status(200).render('contact.pug');
});
app.get('/about', (req, res) => {
    const con = "this is my first web dev project:";
    const params = { 'title': "my dance academy web", 'content': con };
    res.status(200).render('about.pug', params);
});

//start SERVER
app.listen(port, () => {
    console.log(`SERVER has been started at port:: ${port}`);
})
