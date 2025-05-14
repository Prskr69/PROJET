const {Category} = require('../models/category');
const express = require('express');
const router = express.Router();

router.get  ('/', async (req, res) => {
    const categories = await Category.find();
    if (!categories) {
        res.status(500).json({success: false})
    }
    res.status(200).send(categories);
})

router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        res.status(500).json({message: 'La catégorie est non éxistente!'})
    }
    res.status(200).send(category);
})

router.post('/', async (req, res) => {
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    });
    category = await category.save();
    if (!category)
         return res.status(400).send('La catégorie ne peut pas être créee!')
    res.send(category);
})

// Ici on a utilisé le paramètre 'new' pour que la méthode findByIdAndUpdate retourne le document mis à jour, et non pas l'ancien document
// Si on ne met pas ce paramètre, la méthode findByIdAndUpdate retourne l'ancien document, et non pas le nouveau document
router.put('/:id', async (req, res) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id, {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
        }, {new: true}
    )
    if (!category){
        return res.status(400).send('La catégorie ne peut pas être mise à jour!')
    }
    res.send(category);
})

//Parfois quand on essaye de suprimer une catégorie, on recoit un message d'erreur, car l'ID de ce dernier ne respecte pas le format d'un ObjetID
router.delete('/:id', (req, res)=> {
    Category.findByIdAndDelete(req.params.id).then(category => {
        if (category) {
            return res.status(200).json({success: true, message: 'La catégorie a été supprimée!'})
        }
        else {
            return res.status(404).json({success: false, message: 'La catégorie est non éxistente!'})
        }
    })
    .catch(err => {
        return res.status(400).json({success: false, error: err})
    })
})


module.exports = router;

