const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

var app = express();


hbs.registerPartials(__dirname + '/views/partials');
//for middleware use //static public folder middleware
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    let now = Date().toString();
    let log = `${now} : ${req.method} : ${req.url }`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log!');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// });

//HBS Helper
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/',(req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        message: 'Welcome to Home page!'
    });
});

app.get('/about', (req, res) => {
   res.render('about.hbs', {
       pageTitle: 'About Page'
   });
});


app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});