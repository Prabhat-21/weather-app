const https = require('https')

const url = 'http://api.weatherstack.com/current?access_key=e84129bc20b99e3b1452c36379b4e3ff&query=45,-75&units=f'

const request = https.request(url,(response)=>{

    let data = ''

    response.on('data',(chunk)=>{
        data = data + chunk.toString()
        console.log(chunk)
    })

    response.on('end',()=>{
        const body = JSONparse(data)
        console.log(body)
    })
}  )

request.on('error', (error)=>{
    console.log('An error', error)
})

request.end()