const multer = require('multer');
const express = require('express');
const app = express();

// obj de configuração do multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },

    filename: function (req, file, cb) {
        const filename = file.originalname.replace(/[^a-zA-Z0-9\s.-]+/g, '-').replace(/\s+/g, '-');
        cb(null, filename);
    }
});


const upload = multer({ storage: storage })


//requisições express HTTP 
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/up.html');
})



app.post('/upload', upload.single('file'), function (req, res, next) {
    const filePath = req.file.path;
    console.log(filePath);
    res.send('arquivo enviado')
});


app.listen(3000, (req, res) => {
    console.log('O servidor esta rodando na porta 3000');
});