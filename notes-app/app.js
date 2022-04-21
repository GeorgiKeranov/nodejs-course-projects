import chalk from 'chalk';
import yargs from 'yargs';

const yargsHelper = yargs(process.argv.slice(2)); 

yargsHelper.command('add', 'Add a note', function() {
    console.log('Adding a note');
});

console.log(yargsHelper.argv);
