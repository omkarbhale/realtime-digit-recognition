const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const predict = require('./predictor');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/predict', async (req, res, next) => {
    const base64Image = req.body.image.replace(/^data:image\/png;base64,/, ''); // Remove data URL header
    const decodedImage = Buffer.from(base64Image, 'base64');

    const Jimp = require('jimp');
    const imageData = [...(await Jimp.read(decodedImage)).resize(28, 28).bitmap.data];
    let grayImageData = [];
    for (let i = 0; i < imageData.length; i += 4) {
        let sum = imageData[i] + imageData[i+1] + imageData[i+2];
        grayImageData.push(Math.floor(sum/3));
    }
    const probabilities = await predict(grayImageData.join(' '));
    res.json({ message: 'Data recieved.', image: grayImageData, probabilities });
})

app.listen(3001, () => console.log('Listening on port 3001'));
