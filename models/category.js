const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    icon:{
        type: String
    },
    color:{ //#000:pour le noir
        type: String
    }

})

exports.Category = mongoose.model('Category', categorySchema);



