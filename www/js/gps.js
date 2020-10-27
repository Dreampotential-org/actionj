function setup_gps_events() {
    $("body").delegate("#post_gps", "click", function(e) {
        // call to backend

        swal({
            title: "Success",
            text: "Good Job",
            icon: 'success',
        })
        home();
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
