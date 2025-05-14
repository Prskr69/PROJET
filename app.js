const express = require('express');
const app = express();
const bodyParser = require ('body-parser');
const morgan = require('morgan');
const mongoose = require ('mongoose');
require('dotenv/config');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

 
//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
// Middleware pour gérer les erreurs JWT
app.use(errorHandler);


//routes
const categoriesRoutes = require('./routes/categories.js');
const productsRoutes =require('./routes/products.js');
const usersRoutes = require('./routes/users.js');
const ordersRoutes = require('./routes/orders.js');

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);


//Database
mongoose.connect(process.env.CONNECTION_STRING, {
    dbName: 'eshop-database'
})
.then(()=>{
    console.log('Database connection is ready... ');
})
.catch((err)=>{
    console.log(err);
})

app.listen(3000, ()=> {
    console.log('server is running in http://localhost:3000');
})
