const express = require('express');
const cors = require('cors');
const app = express();

// allow * origin
app.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
));

const downloadController = require('./controller/DownloadController');
//serve static files
app.use('/',express.static('public'));
//download csv file
app.get('/bookCsv',downloadController.download)
app.listen(5000, () => console.log('Server running on port 5000!'));