
var fields, error_fields;

$(document).ready(function () {
        $("#signUpForm").submit(function (e) {
            e.preventDefault();
            var errors = $("#registrationForm .error");
            var inputs = $("#registrationForm input");

            error_fields = errors;
            fields = inputs;

            $(".auth__modal").removeClass("hidden__content")
            setAlertMessage("registration-process")


            inputs.removeAttr("style")
            errors.text("");
            var data = $(this).serialize();

            $.ajax({
                url: SERVER + "s3_uploader/user/register/",
                type: "POST",
                data: data,
                success: function (response) {
                        console.log(response)

                        localStorage.setItem("user-token", response.token);
                        setAlertMessage("registration-success")

                        setTimeout(function () {
                           $(".auth__modal").addClass("hidden__content");
                           window.location.replace("journal.html")
                        }, 1200)
                },
                error: function (err) {
                        console.log(err.responseJSON)
                    $(".auth__modal").addClass("hidden__content")

                    if(err.responseJSON.name){
                        displayError(0, err.responseJSON.name)
                    }

                    if(err.responseJSON.email){
                        displayError(1, err.responseJSON.email)
                    }

                    if(err.responseJSON.msg){
                        displayError(1, err.responseJSON.msg)
                    }

                    if(err.responseJSON.password){
                        displayError(2, err.responseJSON.password)
                    }
                },
            })
        })

    $("#loginForm").on("submit", function (e) {
                e.preventDefault();

                $(".auth__modal").removeClass("hidden__content");
                setAlertMessage("login-process")

        var reg_errors = $("#loginForm .error");
        var reg_input = $("#loginForm input");

        error_fields = reg_errors;
        fields = reg_input;

        reg_errors.text("");
        reg_input.removeAttr("style")

        $.ajax({
            url: SERVER + "s3_uploader/user/login",
            type: "POST",
            async: true,
            crossDomain: true,
            crossOrigin: true,
            data: $(this).serialize(),
            success: function (response) {
                console.log(response)
                localStorage.setItem("user-token", response.token);

                setAlertMessage("login-success")

                setTimeout(function () {
                    $(".auth__modal").addClass("hidden__content");
                    window.curr_user = response.user;
                    window.location.replace("journal.html");
                }, 1200)


            },
            error: function (err) {
                console.log(err)

             if (err.status === 500) {
                 setAlertMessage("login-failed");
                 setTimeout(function () {
                     $(".auth__modal").addClass("hidden__content")
                 }, 700)
             } else{
                 if (err.responseJSON.non_field_errors) {
                     setAlertMessage("login-failed");
                     setTimeout(function () {
                         $(".auth__modal").addClass("hidden__content")
                     }, 1200)
                 } else{
                     $(".auth__modal").addClass("hidden__content")

                     if (err.responseJSON.username) {
                         displayError(0, err.responseJSON.username)
                     }

                     if (err.responseJSON.password) {
                         displayError(1, err.responseJSON.password)
                     }
                 }
             }
            }
        })
    })
})

function displayError(index, error_text) {
    fields.eq(index).css('border', '1px solid #ff0000')
    error_fields.eq(index).text(`${error_text}`)
}

function setAlertMessage(type) {
        if (type === "login-success"){
            $(".modal__message").html(successMessage('Signed in'))
        }

    if (type === "registration-success"){
        $(".modal__message").html(successMessage('Account creation successful'))
    }

    if (type === "login-process"){
        $(".modal__message").html(processMessage('Signing you in...'))
    }


    if (type === "registration-process"){
        $(".modal__message").html(processMessage('Creating your account...'))
    }

    if (type === "login-failed"){
        $(".modal__message").html(failedMessage('Unable to login with provided credentials...'))
    }
}

function processMessage(text) {
        return `
                <div class="indicator"><div id="loader"></div></div>
                <div class="modal__text">${text}</div>
            `
}

function successMessage(text) {
        return `
                <div class="indicator"><i class='bx bx-check-circle success'></i></div>
                <div class="modal__text">${text}</div>
            `
}

function failedMessage(text) {
    return `
                <div class="indicator"><i class='bx bxs-x-circle failed'></i></div>
                <div class="modal__text">${text}</div>
            `
}
