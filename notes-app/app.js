import chalk from 'chalk';
import yargs from 'yargs';

const yargsHelper = yargs(process.argv.slice(2)); 

yargsHelper.command('add', 'Add a note', function() {
    console.log('Adding a note');
});

yargsHelper.command('remove', 'Remove a note', function() {
    console.log('Removing a note');
});

yargsHelper.command('read', 'Read a note', function() {
    console.log('Reading a note');
});

yargsHelper.command('list', 'List the notes', function() {
    console.log('Listing the notes');
});

console.log(yargsHelper.argv);
