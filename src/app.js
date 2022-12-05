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
    console.log("Incoming request: ");
    console.log(JSON.stringify(req.body, null, 2));
    if (!req.body?.files) {
        res.status(400)
        res.json({
            error: 'Произошла какая-то херня',
            requestBody: req.body,
        })
        return;
    }

    const fileNames = req.body.files.split(",").map(s => s.trim())
    const response = {}
    const promises = fileNames.map(async (fileName) => {
        const line = await getRandomLineFromFile(fileName);
        response[fileName] = line
    })
    await Promise.all(promises)

    res.json(response);
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
