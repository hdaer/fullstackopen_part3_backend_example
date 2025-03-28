const mongoose = require('mongoose')
// const notes = require('./notes.js')


if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]


const url = `mongodb+srv://fullstackopen:${password}@fullstackopen.smj4fae.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`


mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)


// notes.forEach(note => {
//     const newNote = new Note({
//         content: note.content,
//         important: note.important,
//     })

//     newNote.save().then(() => {
//         console.log('note saved!')
//     })

// })


const note = new Note({
    content: "test 2 note",
    important: true,
})

note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
})

// Note.find({}).then(result => {
//     result.forEach(note => {
//         console.log(note)
//     })
//     mongoose.connection.close()
// })



