const express = require('express')
const app = express()
const port = (process.env.PORT || 3000)

var bodyParser = require('body-parser')

var BASE_API_PATH = "/api/v1"

var contacts = [
    {"name" : "Peter", "phone" : "678678687"},
    {"name" : "John", "phone" : "777777777"}
]

app.use(bodyParser.json())
app.get('/', (req, res) => res.send('Hello World!'))

app.get(BASE_API_PATH + "/contacts", (req, res) => {
    console.log(Date() + " - GET /contacts")
    res.send(contacts)
})

app.post(BASE_API_PATH + "/contacts", (req, res) => {
    console.log(Date() + "- POST /contacts")
    var contact = req.body;
    contacts.push(contact)
    res.sendStatus(201)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))