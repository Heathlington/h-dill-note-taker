const express = require('express');
const path = require('path');
const {readFile, writeFile} = require('fs/promises');
const PORT = process.env.PORT || 3001;
const { v4: uuidv4 } = require('uuid');

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) =>{
    readFile('db/db.json')  
    .then(data => {
        res.send(data)
    })
})

app.post('/api/notes', (req, res) =>{
    readFile('db/db.json')  
    .then(data => {
        const newNote = req.body 
        newNote.id = uuidv4()
        const parsedData = JSON.parse(data)
        parsedData.push(newNote)
        return writeFile('db/db.json', JSON.stringify(parsedData))
    }).then(data => {
        res.json(data)
    })
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
