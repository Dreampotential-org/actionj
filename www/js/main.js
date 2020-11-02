var SERVER = 'https://sfapp-api.dreamstate-4-all.org/'
// var SERVER = 'http://localhost:8000/'

function init () {
  init_mapbox()
  setup_click_events()
  setup_gps_events()
  setup_click_resources()
  init_login()
  // $('.shelters').click()
  // $("#my-profile").click()
}

function home () {
  $('.navbar-brand').click()
}

function hide_screens () {
  $('#journal-screen').hide()
  $('#shelters-list').hide()
  $('#screen1').hide()
  $('#screen2').hide()
  $('#map-check').hide()
  $('#shelters-screen').hide()
  $('#help-screen').hide()
  $('#my-meds-screen').hide()
}

function setup_click_events () {
  // controls the flow of buttons clicked
  $('body').delegate('#logout', 'click', function (e) {
    localStorage.removeItem('token')
  })

  $('body').delegate('#journal', 'click', function (e) {
    hide_screens()
    $('#journal-screen').show()
    // populate_journals()
  })

  $('body').delegate('.navbar-brand', 'click', function (e) {
    hide_screens()
    $('#screen1').show()
  })
  $('body').delegate('.video-check', 'click', function (e) {
    handle_video_click()
  })

  $('body').delegate('.gps-check', 'click', function (e) {
    handle_gps_click()
  })
  $('body').delegate('#my-meds', 'click', function (e) {
    hide_screens()
    $('#my-meds-screen').show()
  })

  $('body').delegate('#help', 'click', function (e) {
    hide_screens()
    $('#help-screen').show()
  })

  $('body').delegate('#my-profile', 'click', function (e) {
    hide_screens()
    $('#screen2').show()
  })
  $('body').delegate('.shelters', 'click', function (e) {
    hide_screens()
    $('#shelters-screen').show()
    $('#shelters-list').show()
    get_shelters()
  })

  $('body').delegate('.shelters-map', 'click', function (e) {
    map_shelters()
  })
}

window.addEventListener('DOMContentLoaded', init, false)
