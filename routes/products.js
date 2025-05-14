const {Category} = require('../models/category.js');
const {Product} = require('../models/product.js');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error('Invalid image type');

    if (isValid) {
    cb(null, 'public/uploads')
    }
  },
filename: function (req, file, cb) {
    const fileName = file.originalname.split(' ').join('-');
    const extention = FILE_TYPE_MAP[file.mimetype]
    cb(null, `${fileName}-${Date.now()}.${extention}`)
  }
})

const uploadOptions = multer({ storage: storage })


    router.get(`/`, async (req, res) => {
        // on peut ajouter .select('name image -_id') pour afficher que le nom et l'image du profuit sans l'id par exemple
        //.populate('category') pour afficher la catégorie du produit
        //http://localhost:3000/api/v1/products?categories=category1,category2  (par exemple)
        let filter = {};
        if (req.query.categories){
            filter = {category: req.query.categories.split(',')}
        }

        const productList = await Product.find(filter).populate('category');

       if(!productList){
        res.status(500).json({
            success: false  
        })
       }
       res.send(productList);
    })

    router.get(`/:idproduit`, async (req, res) => {
        const product = await Product.findById(req.params.id);
 
        if(!product){
         res.status(500).json({
             success: false
         })
        }
        res.send(product);
     })

    router.post(`/`, uploadOptions.single('image'), async (req, res) => {
        const category = await Category.findById(req.body.category);
        if(!category) return res.status(400).send('La catégorie nexiste pas!')
        const file = req.file;
        if(!file) return res.status(400).send('Aucune image sélectionnée!')    
        const fileName = req.file.filename
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
        let product = new Product({
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: `${basePath}${fileName}`, //afficher l'URL de l'image par exemple http://localhost:3000/public/uploads/image.jpg
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInstock: req.body.countInstock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        })

        product = await product.save();
        if(!product){
            return res.status(500).send('Le produit ne peut pas être créé!')
        }
        res.send(product);
    })

    router.put('/:idproduit', async (req, res) => {
        if (!mongoose.isValidObjectId(req.params.id)){
            return res.status(400).send('ID du produit est non valide!')
        }
        const category = await Category.findById(req.body.category);
        if(!category) return res.status(400).send('La catégorie nexiste pas!')

        const product = await Product.findByIdAndUpdate(
            req.params.id, {
                name: req.body.name,
                description: req.body.description,
                richDescription: req.body.richDescription,
                image: req.body.image,
                brand: req.body.brand,
                price: req.body.price,
                category: req.body.category,
                countInstock: req.body.countInstock,
                rating: req.body.rating,
                numReviews: req.body.numReviews,
                isFeatured: req.body.isFeatured,
            }, {new: true}
        )
        if (!product){
            return res.status(500).send('Le produit ne peut pas être mise à jour!')
        }
        res.send(product);
    })

    router.delete('/:idproduit', (req, res)=> {
        Product.findByIdAndDelete(req.params.id).then(product => {
            if (product) {
                return res.status(200).json({success: true, message: 'Le produit a été supprimée!'})
            }
            else {
                return res.status(404).json({success: false, message: 'Le produit est non éxistente!'})
            }
        })
        .catch(err => {
            return res.status(400).json({success: false, error: err})
        })
    })

    // Ici on va afficher le nombre de produits dans la base de données
    router.get(`/get/count`, async (req, res) => {
        const productCount = await Product.countDocuments()
        if(!productCount){
            res.status(500).json({success: false})
        }
        res.send({
            Count: productCount
        });
    })

    //Ici on va afficher les produits en vedette (featured products)
    router.get(`/get/featured`, async (req, res) => {
        const products = await Product.find({isFeatured: true});
        if(!products){
           res.status(500).json({success: false})
        }
        res.send(products);
     })


    router.post('/upload', uploadOptions.single('image'), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send('Aucune image sélectionnée!');
    }

    const fileName = req.file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    res.send({ imageUrl: `${basePath}${fileName}` });
     });


     router.put(
    '/gallery-images/:id', 
    uploadOptions.array('images', 10), 
    async (req, res)=> {
        if(!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send('Invalid Product Id')
         }
         const files = req.files
         let imagesPaths = [];
         const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

         if(files) {
            files.map(file =>{
                imagesPaths.push(`${basePath}${file.filename}`);
            })
         }

         const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                images: imagesPaths
            },
            { new: true}
        )

        if(!product)
            return res.status(500).send('the gallery cannot be updated!')

        res.send(product);
    })


    module.exports = router;