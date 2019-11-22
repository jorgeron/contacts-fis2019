const express = require('express')
const app = express()
const port = (process.env.PORT || 3000)

const Datastore = require('nedb')
var bodyParser = require('body-parser')

var BASE_API_PATH = "/api/v1"
var DB_FILE_NAME = __dirname + "/contacts.json"

console.log("Starting API server...")
const app = express()
app.use(bodyParser.json())
app.get('/', (req, res) => res.send('Hello World!'))

var db = new Datastore({
    filename: DB_FILE_NAME,
    autoload: true
})

app.get(BASE_API_PATH + "/contacts", (req, res) => {
    console.log(Date() + " - GET /contacts")
    
    db.find({}, (err, contacts) => {
        if (err) {
            console.log(Date() + '-' + err)
            res.sendStatus(500)
        } else {
            res.send(contacts.map((contact) => {
                delete contact._id
                return contact
            }))
        }
    })
})

app.post(BASE_API_PATH + "/contacts", (req, res) => {
    console.log(Date() + "- POST /contacts")
    var contact = req.body;
    db.insert(contact, (err) => {
        if (err) {
            console.log(Date() + " - " + err)
            res.sendStatus(500)
        } else {
            res.sendStatus(201)
        }
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))