const mongoose = require("mongoose");
const data = require("./Data/Notes.json");

mongoose.connect("mongodb://127.0.0.1:27017/notesDB");

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  creationDate: Date,
});
noteSchema.index({ title: "text", content: "text" });
const Note = mongoose.model("Note", noteSchema);

async function db() {
  const count = await Note.countDocuments();
  if (count === 0) {
    await Note.insertMany(data);
    console.log("inserted db");
  } else {
    console.log("already inserted");
  }
}

module.exports = { db, Note };
