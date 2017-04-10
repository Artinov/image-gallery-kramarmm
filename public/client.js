var getImageArr = function() {
    $.ajax({
        url: "/pictures",
        method: "POST",
        cache: false,
        contentType: false,
        processData: false
    }).then(function(res) {
        console.log(res);
    });
}

$( document ).ready(getImageArr);

$('#uploadForm').submit(function(e) {
    var imageName = $('input[type="file"]')[0].files[0].name.split("."),
        imageExt = imageName[imageName.length -1];

    e.preventDefault();
    
    // checking file extension
    var validExt = ["jpg", "jpeg", "png"];
    var checker = false;

    validExt.forEach(function(ext) {
            if( imageExt === ext) checker = true;
        });

    if( !checker ) return;

    // if extension valid send request
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

