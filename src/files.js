const fs = require('fs/promises');

const loadFileLines = async fileName => {
    try {
        const filePath = `${__dirname}/../files/${fileName}.txt`
        const data = await fs.readFile(filePath, {encoding: 'utf8'});
        return data.split(/\r?\n/);
    } catch (err) {
        console.log(err);
    }
};

const getRandomLineFromFile = async fileName => {
    const fileLines = await loadFileLines(fileName)
    if (!fileLines) {
        return 'No file with name: ' + fileName
    }

    return fileLines[randomInt(fileLines.length)]
};

const randomInt = (end) => {
    return Math.floor(Math.random() * end)
}

module.exports = {
    getRandomLineFromFile
}
