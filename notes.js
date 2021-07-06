const fs = require("fs");
const chalk = require("chalk");
var Table = require("cli-table");

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateData = notes.filter((note) => note.title === title);
  if (duplicateData.length === 0) {
    notes.push({
      title,
      body,
    });
    saveNotes(notes);
    console.log(chalk.green.bold("Saved Successfully"));
  } else {
    console.log(chalk.red.bold("Watch out!!,Duplicate Title!"));
  }
};

const deleteNote = (title) => {
  const notes = loadNotes();
  const keepNotes = notes.filter((note) => note.title !== title);
  if (notes > keepNotes) {
    console.log(chalk.yellowBright(title + " Deleted Successfully"));
    saveNotes(keepNotes);
    listNotes();
  } else {
    console.log(chalk.yellowBright(title + " Not Found!"));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  var table = new Table({
    head: ["Title", "Body"],
    colWidths: [20, 20],
  });
  notes.forEach((note) => {
    table.push([note.title, note.body]);
  });
  console.log(table.toString());
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json").toString();
    return JSON.parse(dataBuffer);
  } catch (error) {
    return [];
  }
};

const readNotes = (title) => {
  const notes = loadNotes();
  const foundNote = notes.find((note) => note.title == title);
  if (foundNote) {
    console.log("Title: " + chalk.blue(foundNote.title) + " is Found");
    var table = new Table({
      head: ["Title", "Body"],
      colWidths: [10, 30],
    });
    table.push([foundNote.title, foundNote.body]);
    console.log(table.toString());
  } else {
    console.log(chalk.red("Nothing Found"));
  }
};

const saveNotes = (notes) => {
  const saveData = JSON.stringify(notes);
  fs.writeFileSync("notes.json", saveData);
};

module.exports = {
  addNote,
  deleteNote,
  listNotes,
  readNotes,
};
