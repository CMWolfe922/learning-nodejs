// Express doesn't come with node so I have to install it
// Create a variable express and saved it to an instance of express
var express = require('express');
var app = express();

// now to host a static file I will use app.use() function

app.use(express.static(__dirname)) // tells express we will be hosting a static file

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
