// backend/src/controllers/noteController.js
const noteService = require('../services/noteService');

exports.getAllNotes = (req, res) => {
  noteService.getAllNotes()
    .then(notes => res.json({ data: notes }))
    .catch(err => res.status(500).json({ error: err.message }));
};

exports.createNote = (req, res) => {
  const { user_id, title, content } = req.body;
  if (!user_id || !title || !content) {
    return res.status(400).json({ error: "user_id, title e content são obrigatórios." });
  }

  noteService.createNote({ user_id, title, content })
    .then(note => res.json({ data: note }))
    .catch(err => res.status(500).json({ error: err.message }));
};
