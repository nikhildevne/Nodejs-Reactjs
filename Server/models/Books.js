let mongoose = require('mongoose')

let booksSchema = mongoose.Schema({
    title:{
        type : String,
        require : true
    },
    author:{
        type: String,
        require : true
    },
    year:{
        type: Number,
        require : true
    },
    genre:{
        type: String,
        require: true
    }
})

const books = mongoose.model('booksSchema',booksSchema);

module.exports = books