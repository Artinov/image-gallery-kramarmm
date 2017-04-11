var lastImageIndex = -1; 

var getLastImageIndex = function () {
    lastImageIndex = $( '#imageContainer' ).children().last().attr("data-i");
    return lastImageIndex;
}

var renderImage = function(res) {
    $( '#imageContainer' ).append(res);
    return getLastImageIndex();
}

var getImageArr = function() {
    $.ajax({
        url: "/echo?message=" + lastImageIndex,
        method: "POST",
        cache: false,
        contentType: false,
        processData: false,
    }).then(function(res) {
        renderImage(res);
    });
}


// start 
$( document ).ready(getImageArr);

$($('input[type="file"]')).change(function () {
    $('#noChoose').attr("class", "text-danger transparent");
    $('#choosen').text($('input[type="file"]')[0].files[0].name);
});



// upload button
$('#uploadForm').submit(function(e) {
    e.preventDefault();

    // checking that file is was chosen
    if ( $('input[type="file"]')[0].files.length === 0 ) {
        $('#noChoose').attr("class", "text-danger");
        return;
    } else {
        $('#noChoose').attr("class", "text-danger transparent");
    }

    // checking file extension
    var imageName = $('input[type="file"]')[0].files[0].name.split("."),
        imageExt = imageName[imageName.length -1];
   
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
        $('#choosen').text("");
        $('input[type="file"]').val("");
        console.log($('input[type="file"]')[0].files[0]);
    });
    
    getImageArr();
    return false;

});

