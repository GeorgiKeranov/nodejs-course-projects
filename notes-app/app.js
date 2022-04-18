const fs = require('fs')

fs.writeFileSync('notes.txt', 'Hello world from Node.js!\n');
fs.appendFileSync('notes.txt', 'This is appended text!');