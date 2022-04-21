const fs = require('fs');

const book = {
    'title': 'Rich Dad Poor Dad',
    'author': 'Robert Kiyosaki'
};

const bookJSON = JSON.stringify(book);

fs.writeFileSync('book.json', bookJSON);

const bookJSONFromFile = fs.readFileSync('book.json');
const bookFromFile = JSON.parse(bookJSONFromFile);

console.log(typeof bookFromFile);
console.log(bookFromFile);