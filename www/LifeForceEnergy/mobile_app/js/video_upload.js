//var SERVER = 'http://localhost:8000/'
var SERVER = 'https://sfapp-api.dreamstate-4-all.org/';

$(document).ready(function () {

    $(document).on("click", ".video", function () {
        var index = $(".video").index(this);
      //  document.getElementsByTagName("video")[index].pause();
        $(".player").eq(index).toggleClass("hidden__content");
    })
    $(document).on("click", ".player", function () {
        var index = $(".player").index(this);

        $(".player").eq(index).find("i").toggleClass("bx-play");
        $(".player").eq(index).find("i").toggleClass("bx-pause");

        var video =document.getElementsByTagName("video")[index];
               if(video.paused) {
                   video.play();
               } else{
                   video.pause();
               }

        document.getElementsByTagName("video")[index].addEventListener('ended', function () {
            $(".player").eq(index).find("i").removeClass("bx-pause");
            $(".player").eq(index).find("i").addClass("bx-play");
            $(".player").removeClass("hidden__content");
        }, false)
    })



    $("#video-file").change(function () {
        var file = $("#video-file")[0].files[0];

        uploadVideoFile(file)
    })
})


function uploadVideoFile(file) {
    $(".content__overlay").removeClass("hidden__content")
    var fileName = file.name;
    var ext = fileName.substr(fileName.lastIndexOf(".") + 1);
    /* console.log(ext);*/

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
            "Authorization": localStorage.getItem("user-token")
        }
    };

    $.ajax(settings).done(function (response) {
        response = JSON.parse(response);
        console.log(response)
        uploadToS3(response, file)
    })
}

function uploadToS3(signed_request, file) {
    $(".processing").addClass("hidden__content");
    $(".upload__progress").removeClass("hidden__content");
    animateUpload()

    var data = new FormData();
    var fields = signed_request.fields

    for ( var key in fields ) {
        data.append(key, fields[key]);
    }
    data.append("file", file, file.name);

        var xhr = new XMLHttpRequest();

    function updateProgress(e) {
        if (e.lengthComputable) {
            console.log(e.loaded)
            console.log(e.loaded+  " / " + e.total)
            var ratio = e.loaded / e.total;
            var percentage = parseInt(ratio * 100) ;

            $("#value").text(percentage);
            $(".progress__bar").animate({
                width: percentage + '%'
            }, 500);

            if (percentage === 100) {
                $(".response__message .success").show();
                $(".overlay__inner").addClass("hidden__content");
                $(".content__overlay").addClass("dark");
                $("#processor").removeClass("hidden__content");

                var key = signed_request.fields["key"];
                console.log(key)
                saveUpload(key);

               /* setTimeout(function () {
                    $(".content__overlay").addClass("hidden__content")
                    $(".response__message .content").hide();
                    $(".progress__container").addClass("hidden__content");
                    $(".processing").removeClass("hidden__content");
                }, 1500)*/
            }
        }
    }

    xhr.upload.addEventListener('progress', updateProgress, false)


    xhr.open("POST", signed_request["url"]);
    xhr.setRequestHeader( 'Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST');
    xhr.send(data);
}

function animateUpload() {
        setInterval(function () {

           interChange(function () {
               setTimeout(function () {
                   $(".indicator").eq(1).show();
                   $(".indicator").eq(2).toggle();
               }, 2500)
           })

        }, 2000)
}

function interChange(callback) {
     $(".indicator").eq(2).hide();
        $(".indicator").eq(1).toggle()

        callback();
}

function saveUpload(video_key) {
        var form = new FormData();
        form.append("uploaded_file_url", video_key)

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": SERVER + "video/api/save-video-upload/",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form,
        "headers": {
            "Authorization": `${localStorage.getItem("user-token")}`
        }
    };
        console.log(localStorage.getItem("user-token"))

        $.ajax(settings).done(function (response) {
            console.log(response)

            fetchActivity()
        })

}

function fetchActivity() {
    var setup = {
        "async": true,
        "crossDomain": true,
        "url": SERVER + "sfapp2/api/checkin_activity_admin",
        "method": "GET",
        "headers": {
            "Authorization": localStorage.getItem("user-token")
        }
    }
    $.ajax(setup).done(function (response) {
        console.log(response)
        var activity = response.user_activities;

        $(".entries").prepend(`
             <div class="video">
                    <video id="video">
                        <source src="${activity[0].video_url}" type="video/mp4">
                    </video>

                    <div class="player">
                        <i class='bx bx-play'></i>
                    </div>
                </div>
        `)


        $(".content__overlay").addClass("hidden__content");
        $("#processor").addClass("hidden__content");
        $(".content__overlay").removeClass("dark");
        $(".overlay__inner").removeClass("hidden__content");
        $(".response__message .content").hide();
        $(".upload__progress").addClass("hidden__content");
        $(".processing").removeClass("hidden__content");
        $(".progress__bar").css('width', '0%')


        // 497bfb30-076a-4ae1-bad4-05ccb34ccf2c
    })
}