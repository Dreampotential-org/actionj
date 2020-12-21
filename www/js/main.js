import {Router} from './router.js';

// var SERVER = 'https://sfapp-api.dreamstate-4-all.org/'
window.SERVER = 'http://localhost:8000/'
const router = new Router();
router.root = 'http://localhost/sfapp/www';

router.add({name: 'pdf_sign', path: '/pdf-sign', handler: ()=>{
  $('#index_page').hide();
  $('#index_land').hide();
  $('#sfapp-root').removeAttr('hidden');
  $('#sfapp-root').load( "pdf_form.html" );
}}).add({name: 'sign1', path: '/:document_id/signature1',handler: (params)=>{
  $('#index_page').hide();
  $('#index_land').hide();
  $('#sfapp-root').removeAttr('hidden');
  $('#sfapp-root').load( "signature1.html" );
}}).add({name: 'sign2', path: '/:document_id/signature2',handler: (params)=>{
  $('#sfapp-root').load( "signature2.html" );
}});


router.add({name: 'parking', path: '/parking', handler: ()=>{
  $('#index_page').hide();
  $('#index_land').hide();
  $('#sfapp-root').removeAttr('hidden');
  $('#sfapp-root').load( "parking-app/index.html" );
}});
router.add({name: 'root', path: '/', handler: ()=>{
  setTimeout(()=>{
    // router.navigate('/pdf-sign')
  })
}});

router.add({name: '404', path: '/*', handler: ()=>{
  if(router.navigated) return;
  setTimeout(()=>{
    // router.navigate('/pdf-sign')
  })
}});
window.router = router;
const activeRoutes = Array.from(document.querySelectorAll('[route]'))
activeRoutes.forEach(route =>route.addEventListener('click', (e)=>{
  e.preventDefault();
  router.navigate(e.target.getAttribute('route'))
},false));

setTimeout(()=>{
  window.router.navigate(window.location.href.replace(router.root,''));
})


var SERVER = 'http://localhost:8000/'
function init () {
  handleInitialRedirect()
  init_mapbox()
  setup_click_events()
  setup_gps_events()
  setup_click_resources()
  init_login()
  init_meds();
  //init_questions()
  // get_questions_api();
  init_video_events();
  // $('.shelters').click()
  // $("#my-profile").click()
}

function home() {
    $('.navbar-brand').click()
}

function logged_in() {
  if(localStorage.getItem("token")) {
    return true
  }
  return false
}

function hide_screens() {
    $('#journal-screen').hide()
    $('#shelters-list').hide()
    $('#screen1').hide()
    $('#screen2').hide()
    $('#map-check').hide()
    $('#shelters-screen').hide()
    $('#help-screen').hide()
    $('#week-calendar').hide()
    $('#my-meds-screen').hide()
    $('#questions-screen').hide()
}

function handleInitialRedirect(){
  const to_redirect = window.location.href.replace(router.root,'');
  window.router.navigate('/');
  window.router.navigate(to_redirect);
}

function setup_click_events () {
  // controls the flow of buttons clicked
  $('body').delegate('#logout', 'click', function (e) {
    localStorage.removeItem('token')
    location.reload()
  })
  
  $('body').delegate('#journal', 'click', function (e) {
    handle_journal_click()
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
    handle_meds_click()
  })
  
  $('body').delegate('#help', 'click', function (e) {
    hide_screens()
    $('#help-screen').show()
  })
  
  $('body').delegate('#my-profile', 'click', function (e) {
    handle_my_profile()
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
  
  $('body').delegate('#food', 'click', function (e) {
    swal({
      title: 'Coming Soon',
      text: 'Please check back in a bit',
      icon: 'success'
    })
  })
  
  $('body').delegate('#work', 'click', function (e) {
    swal({
      title: 'Coming Soon',
      text: 'Please check back in a bit',
      icon: 'success'
    })
  })
  
  
  $('body').delegate('#Suggestions', 'click', function (e) {
    swal({
      title: 'Coming Soon',
      text: 'Please check back in a bit',
      icon: 'success'
    })
  })
  
  $('body').delegate('#pdf_sign', 'click', function (e) {
    hide_screens()
    $( ".start-container" ).load( "./pdf_form.html" );
    window.router.navigate('/pdf-sign')
    // $('#shelters-screen').show()
    // $('#shelters-list').show()
    // get_shelters()
  })
  
}

window.addEventListener('DOMContentLoaded', init, false)
