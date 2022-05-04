const path = require('path')

const express = require('express')

const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

const port = process.env.PORT || 3000

//Define paths for express config 
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// Setup handle bars engine location

app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//setup static directory to serve 

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather App',
        name : 'Prabhat'
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About Me',
        name : 'Prabhat Sharma'
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        title: 'Help Me',
        message : 'I am stuck here, please help!',
        name: 'Prabhat'
    })
})


app.get('/weather',(req, res)=>{

    if(!req.query.address){
        return res.send({
            error : 'You must provide am address term'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{

        if(error){
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error,forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address : req.query.address

            })
        }
        )})
    // res.send({
    //     forecast : 'clear',
    //     location : 'Ballabgarh',
    //     address : req.query.address
    // })
    })

app.get('/products',(req, res)=>{
    if(!req.query.search){
       return res.send({
            error : 'You must provide a search term'
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res)=>{
res.render('404',{
    title: '404',
    name: 'Prabhat Sharma',
    errorMessage : 'Help Article Not Found'
})
})
app.get('*', (req,res)=>{
    res.render('404',{
        title : '404',
         name:   'Prabhat',
        errorMessage: 'Page not found'  })
})

app.listen(port, ()=>{
    console.log('server is up on port '+ port)
})

