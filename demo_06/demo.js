/* NOW WE WILL GO OVER ACCESSING DIRECTORIES AS WELL
AS FILES. SO WE WILL HAVE TO CREATE ANOTHER fs VARIABLE */

var fs = require('fs')

// use function readdir and then once again we will have to
// create a call back that takes in err and data and then
// console.log the data
fs.readdir('c:/', (err, data) => {
    console.log(data)
})

// this returns all the directories in my systems c: dir
