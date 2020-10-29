function setup_gps_events() {
    $("body").delegate("#post_gps", "click", function(e) {
        gps_checkin()
    })

}

function handle_gps_click() {
    if (localStorage.getItem("token")) {
        hide_screens()
        $("#map-check").show()
    }
    else {
        swal({
            title: "Error",
            text: "You must first login to your profile",
            icon: 'error',
        })
        $("#my-profile").click()
    }
}

function gps_checkin() {
    var form = new FormData();
    form.append("msg", $("#map-check textarea").val());
    form.append("lat", '');
    form.append("lng", '');

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": SERVER + "sfapp2/api/do_checkin_gps",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form,
        "headers": {
            "Authorization": localStorage.getItem("token"),
        },

    }
    $.ajax(settings).done(function (response) {
        // change screen for code collecton
        swal({
          title: "Good job!",
          text: "Boom - Checkin Complete",
          icon: "success",
        });
        $("#map-check textarea").val('')
        home()

    }).fail(function (err) {
      alert("ERROR")
    });


}


