const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { argv } = require('process')

const address = process.argv[2]

if(!address){
    console.log('Please provide an address')
}
else{

    geocode(address, (error, {latitide, longitude, location}={}) => {

        if(error){
           return console.log(error)
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
    
            if(error){
                return console.log(error)
            }
    
            console.log(location)
            console.log(forecastData)
        })
    })
    
}




