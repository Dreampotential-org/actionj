var SERVER = 'http://localhost:8000/'
var HOST = 'https://sfapp-api.dreamstate-4-all.org'

$(document).ready(function () {
    $("#video-file").change(function () {
        var file = $("#video-file")[0].files[0];
       var fileName = file.name;
       var ext = fileName.substr(fileName.lastIndexOf(".") + 1);

       var form = new FormData();
       form.append("file_name", fileName);

       var settings = {
           "async": true,
           "crossDomain": true,
           "url": SERVER + "video/api/generate-signed-url/",
           "type": "POST",
           "processData": false,
           "contentType": false,
           "mimeType": "multipart/form-data",
           "data": form,
           "headers": {
                "Authorization": localStorage.getItem("token")
           }
       };

       $.ajax(settings).done(function (response) {
            console.log(response)
       })
      /* console.log(ext);*/
        //uploadVideoFile()
    })
})


function uploadVideoFile() {

}