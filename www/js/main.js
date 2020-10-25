var SERVER = 'https://sfapp-api.dreamstate-4-all.org/'


function init() {
    init_mapbox()
    setup_click_events()
    // $(".shelters").click()
}

function setup_click_events() {
    $("body").delegate(".navbar-brand", "click", function(e) {
        $('#screen1').show()
        $('#creen2').hide()
        $('#map-check').hide()
        $('#shelters-screen').hide()
    });

    $("body").delegate(".shelters", "click", function(e) {
        $('#screen1').hide()
        $('#creen2').hide()
        $('#map-check').hide()
        $('#shelters-screen').show()

        get_shelters();
    });

    $("body").delegate(".shelters-map", "click", function(e) {


        map_shelters()
    });

}

window.addEventListener("DOMContentLoaded", init, false);

