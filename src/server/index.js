const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const regeneratorRuntime = require("regenerator-runtime");

let history ={}

//initialize app
const app = express()

//set cors
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.post('/postcity', async(req, res) => {
    //console.log(req)
    const postCity = req.body.city;
    const historycity = "city" in history? history['city'] : 'N/A';
    history['city'] = postCity;
    res.send({city: historycity})
})

module.exports = app

