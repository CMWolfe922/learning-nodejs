/**
 * Express doesn't come with node so I have to install it
 * Create a variable express and saved it to an instance of express
 *
 * now that I installed the body-parser package, I need to import it
 * so we can set it up as middleware.
 */
var express = require('express')
var bodyParser = require('body-parser')
// const { sendStatus } = require('express/lib/response')
var app = express()
/**
 * Setting up socket.io is trickier than most packages because it needs
 * to tie into express. So we will create a regular http server with node
 * that will share with express and then socket.io
 * Now I need to create a socket.io connection so that the app can
 * listen on the server for new requests
 * and then create an io connection with http
 *
 * Now I will connect my MongoDB database to store the messages and
 * use that db to save and retrieve the messages that need to be posted.
 * in vanilla JS you use: import mongoose from 'mongoose';
 */
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/**
 * // Now I will give my mongodb connection url. Since this is just a test
 * db I don't care that the password is online. But for future uses,
 * needs to be stored in a config file somewhere safe.
 */
const dbUrl = "mongodb+srv://root:root@practicecluster.wasnv.mongodb.net/test?retryWrites=true&w=majority"

/**
 * So here we will create our model. Doing so we will declare a variable
 * and capitalize it so we know it is a model.
 * For this model, it will be for storing messages. so our variable
 * will be const 'Message' and when creating a model with mongoose, you
 * have to call mongoose.model
 */
var Message = mongoose.model('Message', {
    name: String,
    message: String
})
/**
 * Now we will have to change the post message function to save the model
 * to MongoDB.
 *
 * Here we will use the app.get function to handle getting the messages
 * from our front end and backend
 *
 * By passing in an empty parameter, it tells the function
 * to get all of the model objects. then we use a callback function
 * that takes in an err incase we get an error and messages to
 * we can access our retrieved messages.
 */
app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) =>{
        res.send(messages)
    })
})

/**
 * We are going to add a way to post our messages to mongodb
 * We will do that but creating a variable, message and make it
 * a new instance of the Message model and it will have a param
 * of req.body
 *
 * then we will add a save function that takes in an error
 * callback so that if there is an error we can log that error.
 *
 */
app.post('/messages', (req, res) => {
    var message = new Message(req.body)

    message.save((err) => {
        if (err)
            sendStatus(500)

        io.emit('message', req.body)
        res.sendStatus(200)
    })

})

io.on('connection', (socket) => {
    console.log('a user connected')
})

mongoose.connect(dbUrl, { useMongoClient: true }, (err) => {
    console.log('mongo db connection', err)
})
/**
 * app is an instance of express and .listen tells it to listen on port 3000
 * Now lets set a call back on app.listen
 * Since we setup socket.io we had to change the listen code to the http server
 * we setup so that the browser can find the socet.io file
 */
var server = http.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
    // now we can hard code the port or we can give reference to
    // the port by setting app.listen equal to a variable
    // in case the port is changed once we deploy the app on a server.
})
