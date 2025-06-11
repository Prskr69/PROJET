const express = require('express');
const router = express.Router();
const { Message } = require('../models/message');

router.post('/', async (req, res) => {
  const { nom, email, contenu } = req.body;
  if (!nom || !email || !contenu) {
    return res.status(400).send('Tous les champs sont obligatoires');
  }
  let message = new Message({ nom, email, contenu });
  message = await message.save();
  res.status(201).send(message);
});

module.exports = router;