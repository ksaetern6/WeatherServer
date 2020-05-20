const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

// paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// express init
const app = express()
const port = process.env.PORT || 3000

// setup handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static dir
app.use(express.static(publicDir))

// index
app.get('', (req, res) => {
    res.render('index', {
        title: 'Index',
        name: 'Ken'
    })
})

// about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Ken'
    })
})

// help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpText: 'Everything is OK',
        name: 'Ken'
    })
})

// weather
app.get('/weather', (req, res) => {
    if (req.query.address) {
        geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
            if (error) {
                return res.send({ error })
            }
            forecast(latitude, longitude, (error, forecastData) =>
             {
                 if (error) {
                     return res.send({ error })
                 }
                 res.send({
                     forecast: forecastData,
                     location,
                     address: req.query.address
                 })
             })
        })
    }
    else {
        res.send({
            error: "Address not provided"
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

// help 404 pages
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Help article not found',
        name: 'Ken'
    })
})

// 404 page, * means match anything else
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Page not found',
        name: 'Ken'
    })
})

// listening on port 3000
app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})