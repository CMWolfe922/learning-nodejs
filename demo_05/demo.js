// We are going to work with areas where there is heavy input output IO
// and that's disk and network. So to start we are going to work
// with disk. That's the file system. so we will first with reading
// files. We need access to the filesystem that is built witht he node.
// now we need to require into the filesystem.

// create a variable fs that stands for fs
var fs = require('fs')
// the package needed is named fs as well
// create temporary json file that we can add data to so we can
// access it.

// first access filesystem with function readFile and then the
// file that we want to read as the first parameter. the second param
// since this is an asynchronous call, is a call back. We can either create
// our own function or we can use an anonymous function that would take
// in err, and data as the second parameter. Another way is to use the
// arrow function =>  which looks better syntactically

/*
fs.readFile('./data.json', (err, data) => {
    console.log(data)
})
*/

// now use nodemon to execute our file: But the above example, won't give us
// the call back we are looking for because we didn't specify the data type.
// so we need to make sure we specify the utf-8 format. So instead of having the
// call back be the second parameter as it is above, we need to make it the third
// and specify the data type in the second parameter spot

var data = require('./data.json')
console.log(data.name)

fs.readFile('./data.json', 'utf-8', (err, data) => {
    var data = JSON.parse(data) // allows us to parse the json file to get key word data
    console.log(data.name)
})

// we can also access our json file directly without a read file function
// I just need to create a data variable using require and the path to the
// file
