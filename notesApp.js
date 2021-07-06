const { argv } = require("yargs");
const yargs = require("yargs");
const log = console.log;
const notes = require("./notes");

yargs.command({
  command: "add",
  describe: "Add notes",
  builder: {
    title: {
      describe: "This is the title to our note",
      demandOption: true, // required
      type: "string",
    },
    body: {
      describe: "this is the title body",
      demandOption: true, // required
      type: "string",
    },
  },
  handler: (argv) => {
    notes.addNote(argv.title, argv.body);
  },
});

yargs.command({
  command: "delete",
  describe: "Delete notes",
  builder: {
    title: {
      describe: "This is the title to our note",
      demandOption: true, // required
      type: "string",
    },
  },
  handler: (argv) => {
    notes.deleteNote(argv.title);
  },
});

yargs.command({
  command: "read",
  describe: "Reading notes",
  builder: {
    title: {
      describe: "This is the title to our note",
      demandOption: true, // required
      type: "string",
    },
  },
  handler: () => {
    notes.readNotes(argv.title);
  },
});

yargs.command({
  command: "list",
  describe: "list notes",
  handler: () => {
    notes.listNotes();
  },
});

yargs.parse();
