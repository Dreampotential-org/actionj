$(document).ready(function () {

    $("#left-sidebar").load("../layout/sidebar.html");
    $("#page-header").load("../layout/header.html");
});
$(document).ready(function() {
    $("#brandConfig").on("submit", function(ev) {
        ev.preventDefault();
        var form = new FormData();
        form.append("file", document.getElementById("file").files[0]);
        // form.append("brand_video", document.getElementById("brand_video").files[0])
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": SERVER + 's3_uploader/upload',
            "method": "POST",
            "type": "POST",
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": form,
            "headers": {
                "Authorization": localStorage.getItem("token")
            }
        };
        console.log(settings);
        $.ajax(settings).done(function (response) {
            // swal({
            //     title: "Good job!",
            //     text: "File uploaded successfully!",
            //     icon: "success",
            // });
    
            response = JSON.parse(response);
            console.log(response);
            file_url = response['file_url']
            console.log(file_url);
            $('#output').html("<div> Uploaded to S3 Url: " + file_url + "</div>");
            var img = $('<img>');
            img.attr('src', file_url);
            img.appendTo('#output');
            var form = new FormData();
            form.append("logo_url", file_url)
            form.append("room_name", document.getElementById("room_name").value)
            form.append("video_url", document.getElementById("brand_video").files[0])
            form.append("slack_channel", document.getElementById("slack_channel").value)
            var settings1 = {
                "async": true,
                "crossDomain": true,
                "url": SERVER + 'vconf_api/upload/room_logo/',
                "method": "POST",
                "type": "POST",
                "processData": false,
                "contentType": false,
                "mimeType": "multipart/form-data",
                "data": form,
                "headers": {
                    "Authorization": localStorage.getItem("token")
                }
            };
            $.ajax(settings1).done(function (response) {
                response = JSON.parse(response);
                console.log(response);
                // document.getElementById("userModal").style.display = "none";
                // $('#userModal').modal('hide');
                // location.reload(true);
                // loadRoomList();
                // location.reload();
            }).fail(function (response) {
                console.log("Room Info Insertion Failed!");
                swal({
                    title: "Error!",
                    text: "Room Info Insertion Failed!",
                    icon: "warning",
                });
            });
        }).fail(function (response) {
            console.log("Logo Uploading Failed!");
            swal({
                title: "Error!",
                text: "Loading failed!",
                icon: "warning",
            });
        });
    });
});
// function addRoom() {
//     console.log("Add User");
//     // $('#userModal').modal('hide');
//     // $('#userModal').removeClass('show');
//     // document.getElementById("userModal").removeClass("show");
//     // document.getElementById("userModal").style.display = "none";
//     // var file = document.getElementById('file').files[0];
//     // console.log(document.getElementById("file").files[0])
//     var form = new FormData();
//     form.append("file", document.getElementById("file").files[0]);
//     // form.append("brand_video", document.getElementById("brand_video").files[0])
//     var settings = {
//         "async": true,
//         "crossDomain": true,
//         "url": SERVER + 's3_uploader/upload/',
//         "method": "POST",
//         "type": "POST",
//         "processData": false,
//         "contentType": false,
//         "mimeType": "multipart/form-data",
//         "data": form,
//         "headers": {
//             "Authorization": localStorage.getItem("token")
//         }
//     };
//     console.log(settings);
//     $.ajax(settings).done(function (response) {
//         // swal({
//         //     title: "Good job!",
//         //     text: "File uploaded successfully!",
//         //     icon: "success",
//         // });

//         response = JSON.parse(response);
//         console.log(response);
//         file_url = response['file_url']
//         console.log(file_url);
//         $('#output').html("<div> Uploaded to S3 Url: " + file_url + "</div>");
//         var img = $('<img>');
//         img.attr('src', file_url);
//         img.appendTo('#output');
//         var form = new FormData();
//         form.append("logo_url", file_url)
//         form.append("room_name", document.getElementById("room_name").value)
//         form.append("video_url", document.getElementById("brand_video").files[0])
//         form.append("slack_channel", document.getElementById("slack_channel").value)
//         var settings1 = {
//             "async": true,
//             "crossDomain": true,
//             "url": SERVER + 'vconf_api/upload/room_logo/',
//             "method": "POST",
//             "type": "POST",
//             "processData": false,
//             "contentType": false,
//             "mimeType": "multipart/form-data",
//             "data": form,
//             "headers": {
//                 "Authorization": localStorage.getItem("token")
//             }
//         };
//         $.ajax(settings1).done(function (response) {
//             response = JSON.parse(response);
//             console.log(response);
//             // document.getElementById("userModal").style.display = "none";
//             $('#userModal').modal('hide');
//             // location.reload(true);
//             loadRoomList();
//             // location.reload();
//         }).fail(function (response) {
//             console.log("Room Info Insertion Failed!");
//             swal({
//                 title: "Error!",
//                 text: "Room Info Insertion Failed!",
//                 icon: "warning",
//             });
//         });
//     }).fail(function (response) {
//         console.log("Logo Uploading Failed!");
//         swal({
//             title: "Error!",
//             text: "Loading failed!",
//             icon: "warning",
//         });
//     });
// }

