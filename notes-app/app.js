import validator from 'validator';
import chalk from 'chalk';
import {email, note} from './notes.js';
import fs from 'fs';

if (validator.isEmail(email)) {
    fs.appendFileSync('notes.txt', email + ' wrote:\n');
    fs.appendFileSync('notes.txt', note + '\n');

    console.log(chalk.green('Success!'));
} else {
    console.log(chalk.red('Error, please make sure that the email is correct!'));
}
