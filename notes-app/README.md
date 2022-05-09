# Notes App

Simple application that have different terminal commands to save, remove, read or list notes. The application saves the data into JSON file.

## How to install

Make sure that you have installed [npm](https://www.npmjs.com/) and [node](https://nodejs.dev/) on your machine.

1. Clone the project and open 'notes-app' directory in terminal.
2. Type 'npm install' and wait till all of the packages are installed.


## How to use

1. Open terminal in 'notes-app' directory.
2. Type 'node app.js --help' to view all of the available commands.

## Commands

```
app.js add     Add a note
app.js remove  Remove a note by the title
app.js read    Read a note by the title
app.js list    List the notes
```

You can see the parameters that you can use with each command like this:
```
app.js add --help
```
And this command will give you this result:
```
Add a note

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
  --title    Title of the note                               [string] [required]
  --note     The note that you want to add                   [string] [required]
```

## Example commands

### Add a new note.
```
app.js add --title="Type the title here" --note="Type the note here"
```

### Remove a note by the title.
```
app.js remove --title="Type the title here"
```

### Read a note by the title
```
app.js read --title="Type the title here"
```

### List all of the notes
```
app.js list
```
