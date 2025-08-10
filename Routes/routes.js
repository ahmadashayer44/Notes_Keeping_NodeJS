const router = require("express").Router();
const Note = require("../db.js").Note;

router.get("/notes", async function getNotes(req, res) {
  try {
    let notes = await Note.find({});
    res.json(notes);
  } catch (error) {
    if (error.kind === "ObjectId" || error.name === "NotFound") {
      return res.status(404).json({ error: "Note not found" });
    } else {
      return res.status(500).json({ error: "Failed to get notes" });
    }
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
      if (error.kind === "ObjectId" || error.name === "NotFound") {
        return res.status(404).json({ error: "Note not found" });
      } else {
        return res.status(500).json({ error: "Failed to get notes" });
      }
    }
  }
});
router.delete("/notes/:id", async function deleteNote(req, res) {
  try {
    const id = req.params.id;
    await Note.findByIdAndDelete(id);
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    if (error.kind === "ObjectId" || error.name === "NotFound") {
      return res.status(404).json({ error: "Note not found" });
    } else {
      return res.status(500).json({ error: "Failed to get notes" });
    }
  }
});
router.put("/notes/:id", async function updateNote(req, res) {
  try {
    const id = req.params.id;
    await Note.findByIdAndUpdate(id, req.body);
    res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    if (error.kind === "ObjectId" || error.name === "NotFound") {
      return res.status(404).json({ error: "Note not found" });
    } else {
      return res.status(500).json({ error: "Failed to get notes" });
    }
  }
});
router.get("/notes/search", async function searchNote(req, res) {
  try {
    let query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }
    let notes = await Note.find({ $text: { $search: query } });
    res.json(notes);
  } catch (error) {
    if (error.kind === "ObjectId" || error.name === "NotFound") {
      return res.status(404).json({ error: "Note not found" });
    } else {
      return res.status(500).json({ error: "Failed to get notes" });
    }
  }
});
router.get("/notes/:count", async function getCount(req, res) {
  let count = req.params.count;
  count = parseInt(count);
  console.log(count);

  try {
    if (isNaN(count)) {
      return res.status(400).json({ error: "Count must be a number" });
    }
    const notes = await Note.find({}).limit(count);
    res.json(notes);
  } catch (error) {
    if (error.kind === "ObjectId" || error.name === "NotFound") {
      return res.status(404).json({ error: "Note not found" });
    } else {
      return res.status(500).json({ error: "Failed to get notes" });
    }
  }
});
module.exports = router;
