var SERVER = "https://sfapp-api.dreamstate-4-all.org/";
//var SERVER = 'http://localhost:8001/'

var passwordResetToken = getParam("token");
var userToken = localStorage.getItem("user-token");

console.log("MODE: PASSWORD_RESET, Token - " + passwordResetToken);

function getParam(sParam) {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split("&");
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split("=");
    if (sParameterName[0] == sParam) {
      return sParameterName[1];
    }
  }
}

function hideModals() {
  $("#passwordResetModal").removeClass("is-visible");
  $("#signupModal").removeClass("is-visible");
}

$(document).ready(function () {
  let MODE = "WELCOME_PAGE";

  if (passwordResetToken) {
    MODE = "PASSWORD_RESET";
  } else if (userToken) {
    MODE = "HOME_PAGE";
  }

  $(".signupLink").on("click", function (e) {
    hideModals();
    $("#signupModal").addClass("is-visible");
  });

  $(".signinLink").on("click", function (e) {
    hideModals();
  });

  $("#signupLink").on("click", function (e) {
    $("#signupModal").addClass("is-visible");
  });

  $("#passwordResetLink").on("click", function (e) {
    $("#passwordResetModal").addClass("is-visible");
  });

  $(".signup-close").on("click", function (e) {
    hideModals();
  });

  $("#signUpForm").on("submit", function (ev) {
    debugger;
    ev.preventDefault();
    $.ajax({
      url: SERVER + "s3_uploader/user/register",
      type: "post",
      data: $(this).serialize(),
      success: function (response) {
        debugger;
        // Whatever you want to do after the form is successfully submitted
        console.log(response);
        localStorage.setItem("user-token", response.token);

        swal({
          title: "Welcome " + response.user.name + "!",
          text: "Your account is created.",
          icon: "success",
          buttons: false,
          timer: 1000,
        });

        //displayPage("dashboard");
        hideModals();
      },
      error: function () {
        swal({
          title: "Error",
          text: "",
          icon: "error",
        });
      },
    });
  });

  $("#loginForm").on("submit", function (ev) {
    ev.preventDefault();
    swal({
      title: "Signing In!",
      icon: "success",
      buttons: false,
    });

    $.ajax({
      url: SERVER + "s3_uploader/user/login",
      type: "post",
      data: $(this).serialize(),
      success: function (response) {
        // Whatever you want to do after the form is successfully submitted
        console.log(response);
        localStorage.setItem("user-token", response.token);

        swal({
          // title: "Welcome " + response.user.name + "!",
          title: "Welcome !",
          text: "You are logged in.",
          icon: "success",
          buttons: false,
          timer: 3000,
        });

        //displayPage("dashboard");
        window.location.replace("students_list.html");
      },
      error: function () {
        swal({
          title: "Error",
          text: "",
          icon: "error",
        });
      },
    });
  });

  $("#passwordResetForm").on("submit", function (ev) {
    ev.preventDefault();

    $.ajax({
      url: SERVER + "s3_uploader/user/password_reset/",
      type: "post",
      data: $(this).serialize(),
      success: function (response) {
        // Whatever you want to do after the form is successfully submitted
        console.log(response);

        swal({
          title: "Success!",
          text: "Please check your email for password reset link.",
          icon: "success",
        });

        hideModals();
      },
      error: function (message) {
        console.log("Error message:", message);
        swal({
          title: "Error",
          text: message,
          icon: "error",
        });
      },
    });
  });
});
