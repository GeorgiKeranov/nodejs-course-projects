import yargs from 'yargs';
import { addNote, removeNote, listNotes, readNote } from './notes.js';

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
    handler(argv) {
        addNote(argv.title, argv.note);
    }
});

yargsHelper.command({
    command: 'remove',
    description: 'Remove a note by the title',
    builder: { title: builderFields.title },
    handler(argv) {
        removeNote(argv.title);
    }
});

yargsHelper.command({
    command: 'read',
    description: 'Read a note by the title',
    builder: { title: builderFields.title },
    handler(argv) {
        readNote(argv.title);
    }
});

yargsHelper.command({
    command: 'list',
    description: 'List the notes',
    handler() {
        listNotes();
    }
});

yargsHelper.argv;