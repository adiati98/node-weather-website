const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
// console.log(__dirname);
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Ayu Adiati'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Ayu Adiati'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'How can we help you?',
    title: 'Help',
    name: 'Ayu Adiati'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    res.render('404', {
        title: '404 error',
        errorMessage: 'You must provide an address!',
        name: 'Ayu Adiati'
    })} else {
    geocode(req.query.address, (error, {latitude, longitude, location}= {}) => {
      if (error) {
        return res.send({ error })
      }
      
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error })
        } 
        
        res.send({
					forecast: forecastData,
					location,
					address: req.query.address,
						});
      })
    })
  }
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 error',
    errorMessage: 'Help article not found',
    name: 'Ayu Adiati'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 error',
    errorMessage: 'Page not found',
    name: 'Ayu Adiati'
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})