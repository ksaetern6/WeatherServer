const request = require('request')

const forecast = (lat,long,callback) => {
    const url = `https://api.darksky.net/forecast/797ac46a39f55e94d2c71d982a449d39/${lat},${long}`

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        }
        else if (body.error) {
            callback('Unable to find location', undefined)
        }
        else {
            const summary = body.daily.data[0].summary
            const temp = body.currently.temperature
            const precipProb = body.daily.data[0].precipProbability
            callback(undefined, 
                `${summary} It is currently ${temp} degrees out. There is a ${precipProb}% chance of rain`)
        }
    })
}

module.exports = forecast