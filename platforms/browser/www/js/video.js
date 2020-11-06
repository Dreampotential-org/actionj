function handle_video_click() {
    if (localStorage.getItem("token")) {
        // prompt for video upload

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
