const mongoose = require('mongoose');

// Définition du schéma pour les utilisateurs
const userSchema = new   mongoose.Schema({
         name: {
            type: String,
            required: true,
         },
         email: {
            type: String,
            required: true,
         },
         passwordHash: {
            type: String,
            required: true,
         },
         phone: {
            type: String,
            required: true,
         },
         isAdmin: {
            type: Boolean,
            default: false,
         },
         street: {
            type: String,
            default: '',
         },
         apartment: {
            type: String,
            default:'',
         },
         zip: {
            type: String,
            default:'',
         },
         city: {
            type: String,
            default:'',
         },
         country:{
            type: String,
            default:'',
         }
})

// Création du modèle User basé sur le schéma
exports.User = mongoose.model('User', userSchema);