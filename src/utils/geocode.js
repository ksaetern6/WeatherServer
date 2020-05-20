const request = require('request')

const geocode = (address, callback) => {
    const mapBoxAccessToken = 'pk.eyJ1Ijoia3NhZXRlcm42IiwiYSI6ImNrNWQ3M3R1ZjAxZ3IzbG9jNjR4OGc5NzkifQ.s8NOjPJN5lmXXlZqDB_m1A'
    const limit = 1
    let cityName = address
    const city = encodeURIComponent(cityName)
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${mapBoxAccessToken}&limit=${limit}`

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        }
        else if (!body.features.length) {
            callback('Unable to find location. Try another search', undefined)
        }
        else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode

