// command: nodemon src/app.js -e js,hbs

const express = require('express')
const path = require('path')
const hbs = require('hbs')
const { clearScreenDown } = require('readline')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirctoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirctoryPath))  

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Jason'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'someone'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Please Help',
        title: 'Help',
        name: 'Jason'
    })
}) 

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    // = {}: assign an empty object
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error}) 
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error}) 
            }
            
            res.send({
                forecast: forecastData, 
                location,
                address: req.query.address
            }) 
            
        })
    })


    // res.send({
    //     forecast: 'snowing',
    //     address: req.query.address

    // })
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

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jason',
        errorMsg: 'Help article not found'
    })
})

// 404 page
// * = match anything which has been matched so far
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jason',
        errorMsg: 'Page not found'
    })
})

// req = request, res = response
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })




// app.com
// app.com/help

app.listen(4000, () => {
    console.log('Server is up on port 4000.')
})