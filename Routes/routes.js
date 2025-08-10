const router = require("express").Router();
const Note = require("../db.js").Note;

router.get("/notes", async function getNotes(req, res) {
  try {
    let notes = await Note.find({});
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: "Failed to get notes" });
  }
});

router.post("/notes", async function postNote(req, res) {
  {
    const { title, content } = req.body;
    let creationDate = new Date();

    try {
      let note = new Note({ title, content, creationDate });
      await note.save();
      res.status(201).json(note);
    } catch (error) {
      res.status(500).json({ error: "Failed to get notes" });
    }
  }
});

module.exports = router;
