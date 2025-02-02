// backend/src/services/noteService.js
const NoteModel = require('../models/noteModel');

const noteService = {
  createNote: (noteData) => {
    return new Promise((resolve, reject) => {
      NoteModel.create(noteData, (err, newNote) => {
        if (err) return reject(err);
        // Caso queira adicionar lógica de pontuação: userService.addPointsAndLevel(...)
        resolve(newNote);
      });
    });
  },

  getAllNotes: () => {
    return new Promise((resolve, reject) => {
      NoteModel.findAll((err, notes) => {
        if (err) return reject(err);
        resolve(notes);
      });
    });
  }
};

module.exports = noteService;
