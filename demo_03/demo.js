var _ = require('lodash')

// lodash has a lot of packaged that are
// very useful in node, remember to use this package!
console.log(_.random(1,100))


// now install a new module called nodemon, but since it is
// a CLI package, we will have to install it with the global flag
// which means to just append -g in the install command. This
// will also give access to the package from anywhere.

/* so to use this you type in the CLI nodemon ./demo.js "the directory
 of the file you're working in" and this way you don't have to keep
 typing node demo.js at the command line to see your files changes
 executed. It will automatically do that for you.
*/
