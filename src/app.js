const express = require('express')
const bp = require('body-parser')

const {getRandomLineFromFile} = require("./files");

const app = express()
const port = 3000

app.use(bp.json())
app.use(bp.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send('Здарова братишка')
})

app.post('/randomPhrases', async (req, res) => {
    if (!Array.isArray(req.body)) {
        res.error('Request body should be an array: ["fileName1", "fileName2"]')
    }

    const fileNames = req.body
    const response = {}
    const promises = fileNames.map(async (fileName) => {
        const line = await getRandomLineFromFile(fileName);
        response[fileName] = line
    })
    await Promise.all(promises)

    res.json({
        status: 200,
        statusText: 'OK',
        response
    });
})

// todo: do we need it?
app.post('/randomPhrase', async (req, res) => {
    const fileName = req.body
    const line = await getRandomLineFromFile(fileName)
    res.json(line);
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
