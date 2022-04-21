import fs from 'fs';

const notesFilePath = './notes.json';

function addNote(title, note) {
    const currentNotes = getNotes();

    let noteIsNotExisting = true;
    for (let currentNote of currentNotes) {
        if (currentNote.title === title) {
            currentNote.note = note;
            noteIsNotExisting = false;
            break;
        }
    }

    if (noteIsNotExisting) {
        currentNotes.push({
            title: title,
            note: note
        });
    }
    
    saveNotes(currentNotes);
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

export { addNote };