var fs = require('fs')

// to write a file we use writeFile instead of readFile
var data = {
    name: 'Bob'
}

// This alone won't give us what we want because the
// second parameter is expecting a string and we
// are passing in a JSON object. Using Json.stringify we will have
// convert our object over into a string.
fs.writeFile('data.json', JSON.stringify(data), (err) => {
    console.log('Write Finished: ', err)
})
