var express = require("express");
var multer = require("multer");
var path = require("path");
const fs = require('fs');
var request = require('request').defaults({ encoding: null });

var app = express();

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage });

var path = require('path');

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/upload', upload.single('fileupload-input'), function(req, res, next) {
    res.send('ok')
});

app.post('/pictures', function(req, res) {
    var images;
    fs.readdir(path.join(__dirname, 'uploads'), function(err, files) {
        images = files.map(function(file) {            
            return file;
        });
        images.forEach( (file, i) => {
            res.write( '<img src="' + "./uploads" + "/" + file + '"' + 'data-i="' + i + '"' + 'class="img-thumbnail"/>' );
        });
        res.end();
        
    });
});



app.listen(3000, function() {
    console.log("Server is working on http://localhost:3000/");
});

var livereload = require('livereload');
var server = livereload.createServer();
server.watch(__dirname + "/public");