function get_shelters(callback) {
    $.get(SERVER + "sfapp2/api/get_services", function(results) {
        for (var resource of results) {
            add_resource(resource)
        }
    });
}

function add_resource(resource) {
    $("#shelters-list").append(
        "<div class='shelter-close'>" +
            "<a href='#'>" + resource['title'] + "</a><br><br>" +
            resource['services']  +
            "<br><br><p>" + resource['description'].substring(0, 200) + "...</p>" +
        "</div'>")
}


function map_shelters() {

}

function init_mapbox() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWFyb25vcm9zZW4iLCJhIjoiY2owdWFoOGgxMDJ2NDMzcWpqb3NocHBtYiJ9.APRb6iQE07MsewU1g2gWWA';
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11'
    });

}


