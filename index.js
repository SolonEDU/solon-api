const express = require('express')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 5000
const app = express()

const db = require('./queries')

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
	extended: true,
    })
)

app.get("/", (req, res) => {
    res.json({ info: "Welcome to the Solon API!" })
})

app.get('/users', db.getUsers)
app.get('/users/:userID', db.getUserByID)
app.delete('/users/:userID', db.deleteUser)

app.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`)
})
