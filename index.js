var express = require("express");
var multer = require("multer");
var path = require("path");
const fs = require('fs');
var url = require('url');

var app = express();

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        cb(null, Date.now() + "." + extension);
    }
});

var upload = multer({ storage: storage });

var path = require('path');

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/upload', upload.single('fileupload-input'), function(req, res, next) {
    res.send('ok');
});



app.post('/echo', function(req, res) {
    var urlParsed = url.parse(req.url, true);
    console.log(urlParsed.query.message);
    var images;
    fs.readdir(path.join(__dirname, 'uploads'), function(err, files) {
        images = files.map(function(file) {            
            return file;
        });
        console.log(images.length);
        images.forEach( (file, i) => {
            if (i > urlParsed.query.message) {
            res.write( '<img src="' + "./uploads" + "/" + file + '"' + 'data-i="' + i + '"' + 'class="img-thumbnail"/>' );
        }});
        res.end();
        
    });
});



app.listen(3000, function() {
    console.log("Server is working on http://localhost:3000/");
});

var livereload = require('livereload');
var server = livereload.createServer();
server.watch(__dirname + "/public");