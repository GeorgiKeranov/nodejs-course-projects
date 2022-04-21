import yargs from 'yargs';
import { addNote, removeNote } from './notes.js';

const yargsHelper = yargs(process.argv.slice(2)); 

const builderFields = {
    title: {
        describe: 'Title of the note',
        demandOption: true,
        type: 'string'
    },
    note: {
        describe: 'The note that you want to add',
        demandOption: true,
        type: 'string'
    }
};

yargsHelper.command({
    command: 'add',
    description: 'Add a note',
    builder: builderFields,
    handler: function(argv) {
        addNote(argv.title, argv.note);
    }
});

yargsHelper.command({
    command: 'remove',
    description: 'Remove a note by the title',
    builder: { title: builderFields.title },
    handler: function(argv) {
        removeNote(argv.title);
    }
});

yargsHelper.command({
    command: 'read',
    description: 'Read a note by the title',
    builder: { title: builderFields.title },
    handler: function(argv) {
        console.log('Reading a note:', argv.title);
    }
});

yargsHelper.command({
    command: 'list',
    description: 'List the notes',
    handler: function() {
        console.log('Listing the notes');
    }
});

yargsHelper.argv;