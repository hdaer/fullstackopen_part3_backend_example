const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
    .then(result => {
        console.log(('connected to MongoDB'))
    })
    .catch(error => {
        console.log(('error connecting to MongoDB:', error.message))
    })

// if (process.argv.length < 3) {
//     console.log('give password as argument')
//     process.exit(1)
// }

// const password = process.argv[2]

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minLength: 5,
        required: true
    },
    important: Boolean
})


noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)
