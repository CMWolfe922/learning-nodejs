// Express doesn't come with node so I have to install it
// Create a variable express and saved it to an instance of express
var express = require('express');
var app = express();

// now to host a static file I will use app.use() function

app.use(express.static(__dirname))
// app is an instance of express and .listen tells it to listen on port 3000
app.listen(3000)
