import validator from 'validator';
import {email, note} from './notes.js';
import fs from 'fs';

if (validator.isEmail(email)) {
    fs.appendFileSync('notes.txt', email + ' wrote:\n');
    fs.appendFileSync('notes.txt', note + '\n');
}
