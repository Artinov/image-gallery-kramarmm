var lastImageIndex = "0"; 

var getLastImageIndex = function () {
    lastImageIndex = $( '#imageContainer' ).children().last().attr("data-i").toString();
    return lastImageIndex;
}

var renderImage = function(res) {
    $( '#imageContainer' ).append(res);
    return getLastImageIndex();
}

var getImageArr = function() {
    $.ajax({
        url: "/pictures",
        method: "POST",
        cache: false,
        contentType: { type: 'application/json'},
        processData: false,
        // I wanted to send last index of uploaded image to the server,
        // after to chek if there exist : images[number more than lastImageIndex]
        // and send only not sended yet pictures. 
        // but I have empty object in req.body
        // and duplication all images every time

        // data: { "fileupload-input" : lastImageIndex }
    }).then(function(res) {
        renderImage(res);
    });
}

$( document ).ready(getImageArr);

$($('input[type="file"]')).change(function () {
    $('#noChoose').attr("class", "text-danger transparent");
});

$('#uploadForm').submit(function(e) {
    e.preventDefault();

    if ( $('input[type="file"]')[0].files.length === 0 ) {
        $('#noChoose').attr("class", "text-danger");
        return;
    } else {
        $('#noChoose').attr("class", "text-danger transparent");
    }

    var imageName = $('input[type="file"]')[0].files[0].name.split("."),
        imageExt = imageName[imageName.length -1];

    
    
    // checking file extension
    var validExt = ["jpg", "jpeg", "png"];
    var checker = false;

    validExt.forEach(function(ext) {
            if( imageExt === ext) {
            checker = true;
            $("#ext").attr("class", "text-danger transparent");
            }
        });

    if( !checker ) {
        $("#ext").attr("class", "text-danger");
        return;
    } 

    // if extension is valid, send request
    $.ajax({
        url: "/upload",
        method: "POST",
        cache: false,
        contentType: false,
        processData: false,
        data: new FormData(jQuery('#uploadForm')[0])
    }).then(function(res) {
        console.log(res);
    });
    
    getImageArr();
    return false;

});

