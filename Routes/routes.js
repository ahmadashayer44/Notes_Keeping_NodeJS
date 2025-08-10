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

module.exports = router;
