var SERVER = "https://sfapp-api.dreamstate-4-all.org/";
//var SERVER = 'http://localhost:8001/'
// /var passwordResetToken = getParam("token");
var userToken = localStorage.getItem("user-token");
console.log("USER TOKEN ==> ", userToken);

// if (userToken == null) {
//   window.location.replace("login_starter.html");
// }

$(document).ready(function () {
  $(".logout").on("click", function (e) {
    //alert("hi");
    e.preventDefault();
    console.log("Logout");

    swal({
      title: "Success!",
      text: "Your are logged out.",
      icon: "success",
      buttons: false,
      timer: 3000,
    });

    localStorage.removeItem("user-token");
    window.location.replace("login_starter.html");
  });

  $(".login-button").on("click", function (e) {
    $("#studentModal").addClass("is-visible");
  });

  $(".student-close").on("click", function (e) {
    $("#studentModal").removeClass("is-visible");
  });
});
