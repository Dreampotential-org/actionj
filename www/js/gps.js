var CURRENT_POSITION = null;
var CURRENT_POSITION_LOW = null;

function setup_gps_events() {
    $("body").delegate("#post_gps", "click", function(e) {
        gps_checkin()
    })

}

function handle_gps_click() {
    if (localStorage.getItem("token")) {
        hide_screens()
        $("#map-check").show()
        start_gps();
        found_gps_or_timeout();
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

function found_gps_or_timeout() {
    $('#LocationModal').removeClass('is-visible');
    swal({
        title: "Checking for GPS Signal",
        text: "Please wait while we find GSP location",
        icon: "info",
        buttons: false,
        closeOnEsc: false,
        closeOnClickOutside: false,
    });

    setTimeout(function () {
        var counter = 0;
        var i = setInterval(function () {
            if (CURRENT_POSITION == null && CURRENT_POSITION_LOW == null) {
                console.log("No GPS Signal. Try again");
            } else {
                // XXX These values are not getting correctly set on android.
                swal({
                    title: "GPS Location Found",
                    text: "Now, enter event and submit",
                    icon: "success",
                });

                clearInterval(i);
            }
            counter++;
        }, 200);
    }, 20);
}

function gps_checkin() {
    var form = new FormData();
    form.append("msg", $("#map-check textarea").val());
    if (CURRENT_POSITION != null) {
        form.append("lat", CURRENT_POSITION.coords.latitude);
        form.append("lng", CURRENT_POSITION.coords.longitude);
    } else {
        form.append("lat", CURRENT_POSITION_LOW.coords.latitude);
        form.append("lng", CURRENT_POSITION_LOW.coords.longitude);
    }

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


function start_gps() {
    var geo_options_low = {
        enableHighAccuracy: false,
        maximumAge: 30000,
        timeout: 27000
    };

    if (isApp()) {
        document.addEventListener('deviceready', function () {
            navigator.geolocation.watchPosition(
                geo_success_low, geo_error, geo_options_low
            );
        }, false);
    } else {
        navigator.geolocation.watchPosition(
            geo_success_low, geo_error, geo_options_low
        );
    }

    function geo_error(err) {

        if (err.code == 1 || err.code == err.PERMISSION_DENIED ||
            err.code == err.UNKNOWN_ERROR) {
            swal({
                title: "GPS Issue.",
                text: "Please allow gps permission",
                icon: "error",
            });
        }
        console.log("errror no gps")
        console.warn('ERROR(' + err.code + '): ' + err.message);
        start_gps()
    }

    geo_options = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
    };

    if (isApp()) {
        document.addEventListener('deviceready', function () {
            navigator.geolocation.watchPosition(
                geo_success, geo_error, geo_options
            );
        }, false);
    }else{
        navigator.geolocation.watchPosition(
            geo_success, geo_error, geo_options
        );
    }

    function geo_success_low(position) {
        CURRENT_POSITION_LOW = position
        console.log(position.coords.latitude +
            " " + position.coords.longitude);
    }

    function geo_success(position) {
        CURRENT_POSITION = position
        console.log(position.coords.latitude +
            " " + position.coords.longitude);
    }
}

function isApp() {
    return (typeof(cordova) !== 'undefined' ||
            typeof(phonegap) !== 'undefined');
}
