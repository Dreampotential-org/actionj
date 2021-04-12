$(document).ready(function() {
    $("#loginForm").on("submit", function(ev) {
       
         ev.preventDefault();     


        $.ajax({
            url: SERVER + "s3_uploader/user/login",
            type: "post",
            async: true,
            crossDomain: true,
            crossOrigin: true,
            data: $(this).serialize(),
            success: function(response) {
                // Whatever you want to do after the form is successfully submitted
                loginResponse = response;
                console.log("Response", response)
                localStorage.setItem("user-token", response.token);

                swal({
                    title: "Welcome " + response.user.name + "!",
                    text: "You are logged in.",
                    icon: "success",
                    buttons: false,
                    // timer: 1000,
                });

                // displayPage("dashboard");
                // window.curr_user = response.user;
                // window.location.replace("student_dashboard.html");
            },
            error: function() {
                swal({
                    title: "Error",
                    text: "",
                    icon: "error",
                });
            },
        });
    });
});
