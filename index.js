require('dotenv').config()
const express = require('express')
const Note = require('./models/note')

const app = express()

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(express.json())
app.use(express.static('dist'))
app.use(requestLogger)


app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})


app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id).then(note => {
        response.json(note)
    })
})

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({ error: 'content missing' })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
    })

    note.save().then(savedNote => {
        response.json(savedNote)
    })
})

app.put('/api/notes/:id', (request, response, next) => {
    const id = request.params.id
    const body = request.body

    if (!body.content) {
        return response.status(400).json({ error: 'content missing' })
    }

    Note.findByIdAndUpdate(
        id,
        { content: body.content, important: body.important },
    ).then(result => {
        if (result) {
            // response.json(result)
            console.log("i really toggled")
        } else {
            response.status(404).json({ error: 'note not found' })
        }
    })
        .catch(error => next(error))

})


app.delete('/api/notes/:id', (request, response, next) => {
    Note.findByIdAndDelete(request.params.id)
        .then(result => {
            if (result) {
                response.status(204).end()
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))

})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})