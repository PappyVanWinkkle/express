// Express app
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();
app.set('view engine', 'hbs');



// Serving up static pages
app.use(express.static(__dirname + '/public'));
// More middleware
app.use((req, res, next) => {
    res.render('maintenance.hbs');
});
// using middleware
app.use((req, res, next) => {
    var logger = new Date().toString();
    var log = `${logger}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log +'\n');
    next();
});

// appending the file
//fs.appendFile('server.log', log +'\n');
// using partials

hbs.registerPartials(__dirname + '/views/partials');
// using helper function
hbs.registerHelper('getCurrentYear', () => {
    //return new Date().getFullYear();
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// Functions that take arguments and those that don't take arguments

// getting the response
app.get('/', (req, res) => {
   res.render('home.hbs', {
       pageTitle: 'Home Page',
       welcome: 'Welcome to the home page we hope you find the information here very useful.'

   });
});

// New route
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About us'

    });
});

app.get('/bad', (req, res) => {
    res.send({
        bad: 'O No something very bad happened!'
    });
});

app.listen(3000, () => {
    console.log('Server shooting up now');
});