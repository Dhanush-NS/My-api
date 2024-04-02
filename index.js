const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/now', function(req, res){
    res.send({
        now: new Date()
    })
})

app.listen(3000)