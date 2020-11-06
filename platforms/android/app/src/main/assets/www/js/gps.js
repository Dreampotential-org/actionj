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

function format_date(created_at) {
    var date = new Date(created_at * 1000)
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return date.toLocaleDateString("en-US") + " " + strTime;
}


function populate_journals() {
    $("#journal-list").empty()
    get_journal_list(function(events) {
        for(var e of events) {
            $("#journal-list").append(
                "<div><span>" + format_date(e.created_at) + "</span> - " +
                "<span>" + e.msg + "</span></div>"
            )
        }
    })
}

function get_journal_list(callback) {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": SERVER + "sfapp2/api/checkin_activity",
        "method": "GET",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "headers": {
            "Authorization": localStorage.getItem("token"),
        },

    }
    $.ajax(settings).done(function (response) {
        response = JSON.parse(response)
        console.log(response.events)
        callback(response.events)
    }).fail(function (err) {
      alert("ERROR")
    });
}
