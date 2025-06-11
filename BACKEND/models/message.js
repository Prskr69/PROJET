const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true },
  contenu: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

exports.Message = mongoose.model('Message', messageSchema);