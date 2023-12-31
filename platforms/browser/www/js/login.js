function init_login() {

    $("body").delegate("#login_number", "click", function(e) {
        if ($(".phone-code-input").is(":visible")) {
            next_code_login()
        }
        else if ($(".name-input").is(":visible")) {
            set_user_info()
        } else {
            phone_login()
        }
    })
}

function handle_my_profile() {
    hide_screens()
    $('#screen2').show()

    // if user is logged in make them go through questions again
    if (logged_in()) {
        hide_screens()
        $("#questions-screen").show()
    }
}



function set_user_info() {
    var form = new FormData();
    form.append("name", $("#name").val());

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": SERVER + "sfapp2/api/set_user_info",
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
          text: "You're logged in",
          icon: "success",
        });
        home()
        hide_screens()
        $("#questions-screen").show()
        /// XXXX revisit
        //$("#login_number").hide()

    }).fail(function (err) {
      alert("ERROR")
    });


}

function phone_login() {
    var form = new FormData();
    form.append("phone_number", $("#phone").val());

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": SERVER + "sfapp2/api/login-phone-number",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }
    $.ajax(settings).done(function (response) {
        console.log(response)
        // change screen for code collecton
        $(".phone-code-input").show()
        $(".phone-input").hide()

    }).fail(function (err) {
        swal({
          title: "Issue",
          text: "Invalid Phone Number",
          icon: "warning",
        });
    });
}

function next_code_login() {
    var form = new FormData();
    form.append("phone_number", $("#phone").val());
    form.append("code_2fa", $("#phone-code").val());

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": SERVER + "sfapp2/api/login-verify-2fa",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }
    $.ajax(settings).done(function (response) {
      var resp = JSON.parse(response)
      if(resp.message.includes("success")) {
        localStorage.setItem('token', resp.token)
        /* swal({
          title: "Good job!",
          text: "You are logged in",
          icon: "success",
        });*/
        //home();
        $(".phone-code-input").hide()
        $(".name-input").show()
      }
    }).fail(function (err) {
        swal({
          title: "Issue",
          text: "Incorrect code Try again",
          icon: "warning",
        });
    });
}
