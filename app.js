const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to mongoDB

const dbURI = '';
mongoose.connect(dbURI)
    .then((result) => app.listen(6969))
    .catch((err) => console.log(err))

// register view engine
app.set('view engine', 'ejs');

// middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// standard routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})
