import fs from 'fs';

function addNote(title, note) {
    const currentNotes = getNotes();

    currentNotes.push({
        title: title,
        note: note
    });

    fs.writeFileSync('notes.json', currentNotes);
}

function getNotes() {
    const notesJSON = fs.readFileSync('notes.json');
    const notes = JSON.parse(notesJSON);

    return notes;
}

export { addNote, getNotes };