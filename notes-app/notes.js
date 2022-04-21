import chalk from 'chalk';
import fs from 'fs';

const notesFilePath = './notes.json';

function addNote(title, note) {
    const currentNotes = getNotes();

    let noteIsNotExisting = true;
    for (let currentNote of currentNotes) {
        if (currentNote.title === title) {
            currentNote.note = note;
            noteIsNotExisting = false;

            console.log(chalk.green('The existing note is updated!'));
            break;
        }
    }

    if (noteIsNotExisting) {
        currentNotes.push({
            title: title,
            note: note
        });

        console.log(chalk.green('The new note is added!'));
    }
    
    saveNotes(currentNotes);
}

function removeNote(title) {
    const notes = getNotes();
    const notesToKeep = notes.filter(note => note.title !== title);
    
    if (notes.length !== notesToKeep.length) {
        saveNotes(notesToKeep);

        console.log(chalk.green('Note is removed!'));
    } else {
        console.log(chalk.red('Note is not existing!'));
    }
}

function listNotes() {
    const notes = getNotes();
    
    if (!notes.length) {
        console.log(chalk.red('You have no notes!'));
        return;
    }

    console.log(chalk.green('Your notes:'));

    for (let note of notes) {
        console.log(chalk.magenta(note.title));
        console.log(chalk.magenta(note.note), '\n');
    }
}

function getNotes() {
    try {
        const notesJSON = fs.readFileSync(notesFilePath);
        return JSON.parse(notesJSON);
    } catch(error) {
        return [];
    }
}

function saveNotes(content) {
    try {
        const contentJSON = JSON.stringify(content);
        fs.writeFileSync('notes.json', contentJSON);
    } catch(error) {
        console.log(error);
    }
}

export { addNote, removeNote, listNotes };