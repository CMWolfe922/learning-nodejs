// Express doesn't come with node so I have to install it
// Create a variable express and saved it to an instance of express
var express = require('express')
// now that I installed the body-parser package, I need to import it
// so we can set it up as middleware.
var bodyParser = require('body-parser')
var app = express()
/**
 * Now I need to create a socket.io connection so that the app can
 * listen on the server for new requests
 * and then create an io connection with http
 */
var http = require('http').Server(app)
var io  = require('socket.io')(http)

// Now I will connect my MongoDB database to store the messages and
// use that db to save and retrieve the messages that need to be posted.
var mongoose  = require('mongoose')
// now to host a static file I will use app.use() function

app.use(express.static(__dirname)) // tells express we will be hosting a static file
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// Now I will give my mongodb connection url. Since this is just a test
// db I don't care that the password is online. But for future uses,
// it needs to be stored in a config file somewhere safe.
var dbUrl = "mongodb+srv://dbconnector:yk0BTK65RmKH5iiO@practicecluster.wasnv.mongodb.net/test"
//now we create another variable called messages
var messages = [
    {name: 'Tim', message: 'Hi'},
    {name: 'Jane', message: 'Hello'},
]
// Here we will use the app.get function to handle getting the messages
// from our front end and backend
app.get('/messages', (req, res) => {
    res.send(messages)
})

app.post('/messages', (req, res) => {
    // console.log(req.body)
    // so now instead of using the console.log we will use
    messages.push(req.body)
    io.emit('message', req.body)
    res.sendStatus(200)
})

io.on('connection', (socket) => {
    console.log('a user connected')
})

mongoose.connect(dbUrl, { useMongoClient: true }, (err) => {
    console.log('mongo db connection', err)
})

// app is an instance of express and .listen tells it to listen on port 3000
// Now lets set a call back on app.listen
var server = app.listen(3000, () => {
    console.log('Server is listening on port', server.address().port)
    // now we can hard code the port or we can give reference to
    // the port by setting app.listen equal to a variable
    // in case the port is changed once we deploy the app on a server.
})


// NOW WE WILL WORK ON GETTING MESSAGES FROM THE FRONT END TO THE
// BACKEND
// So now we need to send the post request from our browser app not
// the postman app.
