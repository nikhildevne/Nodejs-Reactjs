const books = require("../models/Books")
const bookSchema = require('../joi/bookSchema')
module.exports = (app) => {

    /**
     * Fetch all records from books collection.
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    const getBooks = async (req, res) => {
        try {

            let allBooks = await books.find({}).exec().catch((error)=>console.log(error))

            if(!allBooks.length){
                return res.send({
                    status : 'no record found'
                })
            }

            res.send({
                status : 'success',
                books : allBooks
            })
            

        } catch (error) {
            console.error(error)
            res.send({
                status: "failed",
                message : error
            })
        }
    }

    /**
     * save Book in collection
     * @param {*} req 
     * @param {*} res 
     */
    const saveBook = async (req, res) => {
        try {
            const { title, author, year, genre } = req.body;

            const { error, value } = bookSchema.validate(req.body);

            console.log(value)

            if (error) {
                return res.send({ message: error.details[0].message });
            }

            let newBook =  new books({ title, author, year, genre });
            let book = await newBook.save();

            if(!book){
                return res.send({
                    status:'failed',
                    message: 'Error in add book api'
                })
            }

            res.send({
                status:'success',
                book : book
            })

        } catch (error) {
            console.error(error)
            res.send({
                status: "failed",
                message : error
            })
        }

    }

    /**
     * gets one book by id
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    const getOneBook = async (req, res) => {
            try {   
                console.log('#####',req.params)
                let {id} = req.params;
                let book = await books.findOne({_id:id}).exec().catch((error)=>{console.log(error)})

                if(!book){
                    return res.send({
                        status:'failed',
                        message:'book not found'
                    })
                }

                res.send({
                    status: 'success',
                    book:book
                })
                
            } catch (error) {
                console.error(error)
                res.send({
                    status: 'failed',
                    message:'something wen wrong in getOneBook api'
                })
            }
    }

    /**
     * delete book by id
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    const deleteBook = async (req, res) => {
        let {id} = req.params
        try {
            let book = await books.findOneAndDelete({_id:id})

            if(!book){
                return res.send({
                    status:'failed',
                    message:'book not found'
                })
            }

            res.send({
                status:'success',
                message:'book deleted successfully'
            })
        } catch (error) {
            
        }
    }

    /**
     * update book 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    const updateBook = async (req, res) =>{
        try {
            const {id} = req.params;
            const { title, author, year, genre } = req.body;

            const { error, value } = bookSchema.validate(req.body);

            console.log(value)

            if (error) {
                return res.send({ message: error.details[0].message });
            }

            let updatedBook = await books.findByIdAndUpdate(id,{ title, author, year, genre },{new:true});

            if(!updateBook){
                return res.send({
                    status:'failed',
                    message:'book not found or server issue'
                })
            }

            res.send({
                status:'success',
                message:'book updated successfully',
                book:updatedBook
            })

        } catch (error) {
            console.error(error)
            return res.send({
                status:'failed',
                message:'book not found or server issue'
            })
        }
    }

    app.get('/books',getBooks)
    app.post('/books',saveBook)
    app.get('/books/:id',getOneBook)
    app.delete('/books/:id',deleteBook)
    app.put('/books/:id',updateBook)
}