$(document).ready(function() {
    $("#signUpForm").on("submit", function(ev) {
        
        ev.preventDefault();
        
        $.ajax({
            url: SERVER + "s3_uploader/user/register/",
            type: "post",
            data: $(this).serialize(),
            success: function(response) {
                // Whatever you want to do after the form is successfully submitted
                console.log(response);  
                loginResponse = response;
                localStorage.setItem("user-token", response.token);

                swal({
                    title: "Welcome " + response.user.name + "!",
                    text: "Your account is created.",
                    icon: "success",
                    buttons: false,
                    // timer: 1000,
                });

                // displayPage("dashboard");
                window.location.replace("/csr/Pages/login.html");
            },
            error: function(err) {
                swal({
                    title: "Error",
                    text: err.responseJSON.msg,
                    icon: "error",
                    buttons: false,
                });
                window.location.replace("/csr/Pages/login.html");
            },
        });
    });
    
})