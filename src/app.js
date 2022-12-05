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
    if (!Array.isArray(req.body?.request_options?.body)) {
        res.status(400)
        res.json({
            error: 'Произошла какая-то херня',
            requestBody: req.body,
        })
        return;
    }

    const fileNames = req.body.request_options.body.find(it => it.key === "files").value.split(",").map(s => s.trim())
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

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
