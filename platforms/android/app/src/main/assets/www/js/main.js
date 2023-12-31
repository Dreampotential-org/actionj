var SERVER = "https://sfapp-api.dreamstate-4-all.org/";
// var SERVER = 'http://localhost:8000/'

function init() {
  KeepAwake.start();
  init_mapbox();
  setup_click_events();
  setup_gps_events();
  setup_click_resources();
  init_login();
  init_meds();
  init_questions();
  get_questions_api();
  init_video_events();
  //$('.shelters').click()
  //$("#my-profile").click()
}

function home() {
  // trigger back event
  $(".navbar-brand").click();

  $("#index_page").hide();
  $("#index_land").show();
  document.body.style.backgroundColor = "white";
}

function logged_in() {
  if (localStorage.getItem("token")) {
    return true;
  }
  return false;
}

function hide_screens() {
  $("#journal-screen").hide();
  $("#shelters-list").hide();
  $("#screen1").hide();
  $("#screen2").hide();
  $("#map-check").hide();
  $("#shelters-screen").hide();
  $("#help-screen").hide();
  $("#week-calendar").hide();
  $("#my-meds-screen").hide();
  $("#questions-screen").hide();
}

function setup_click_events() {
  // controls the flow of buttons clicked
  $("body").delegate("#logout", "click", function (e) {
    localStorage.removeItem("token");
    location.reload();
  });

  $("body").delegate("#journal", "click", function (e) {
    handle_journal_click();
  });

  $("body").delegate(".navbar-brand", "click", function (e) {
    hide_screens();
    $("#screen1").show();
    $("#index_page").hide();
    $("#index_land").show();
    document.body.style.backgroundColor = "white";
  });
  $("body").delegate(".video-check", "click", function (e) {
    handle_video_click();
  });

  $("body").delegate(".gps-check", "click", function (e) {
    handle_gps_click();
  });
  $("body").delegate("#my-meds", "click", function (e) {
    handle_meds_click();
  });

  $("body").delegate("#help", "click", function (e) {
    hide_screens();
    $("#help-screen").show();
  });
  $("body").delegate("#calendar", "click", function (e) {
    hide_screens();
    $("#week-calendar").show();
  });
  $("body").delegate("#my-profile", "click", function (e) {
    handle_my_profile();
  });
  $("body").delegate(".shelters", "click", function (e) {
    hide_screens();
    $("#shelters-screen").show();
    $("#shelters-list").show();
    get_shelters();
  });

  $("body").delegate(".shelters-map", "click", function (e) {
    map_shelters();
  });

  $("body").delegate("#food", "click", function (e) {
    swal({
      title: "Coming Soon",
      text: "Please check back in a bit",
      icon: "success",
    });
  });

  $("body").delegate("#work", "click", function (e) {
    swal({
      title: "Coming Soon",
      text: "Please check back in a bit",
      icon: "success",
    });
  });

  $("body").delegate("#Suggestions", "click", function (e) {
    swal({
      title: "Coming Soon",
      text: "Please check back in a bit",
      icon: "success",
    });
  });
}

window.addEventListener("DOMContentLoaded", init, false);
