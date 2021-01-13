var resources = null;
var onscreen_resources = [];
mapboxgl.accessToken = 'pk.eyJ1IjoiYWFyb25vcm9zZW4iLCJhIjoiY2owdWFoOGgxMDJ2NDMzcWpqb3NocHBtYiJ9.APRb6iQE07MsewU1g2gWWA';

function get_shelters(callback) {

    if (resources != null) {
        filter_results();
    }

    console.log("VEFORE")

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": SERVER + "sfapp2/api/get_services",
        "method": "GET",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
    }
    $.ajax(settings).done(function (respons) {
        console.log(respons)
        var respons = JSON.parse(respons)
        resources = respons
        console.log((respons))
        populate_services(respons['service_types'])
        populate_population(respons['population_types'])
        filter_results();

    }).fail(function (err) {
      alert("ERROR")
    });

}

function setup_click_resources() {
    $("body").delegate(".switch-input", "change", function (e) {
        $("#shelters-list").toggle()
        $("#map-shelters").toggle()
        display_map_view();
    })
    $("body").delegate("#service_filter", "change", function (e) {
        $("#population_filter").val("")
        filter_results()
    })

    $("body").delegate("#population_filter", "change", function (e) {
        $("#service_filter").val("")
        filter_results()
    })
}

function filter_results() {

    $("#shelters-list").empty()
    var index = 0;
    onscreen_resources = [];
    for (var place of resources['places']) {
        console.log(place)
        if (add_resource(place, index)) {
            onscreen_resources.push(place)
            index += 1;
        }
    }
    display_map_view();
}

function populate_services(services) {
    console.log(services)
    $("#service_filter").append(
            "<option value=''>Filter Service</option>"
            )
    for (var service of services) {

        $("#service_filter").append(
                "<option value='" + service + "'>" +
                service +
                "</option>"
                )
    }
}

function populate_population(populations) {
    $("#population_filter").append(
            "<option value=''>Filter Population</option>"
            )
    for (var population of populations) {
        $("#population_filter").append(
                "<option value='" + population + "'>" +
                population +
                "</option>"
                )
    }
}

function add_resource(resource, index) {
    var service_filter = $("#service_filter").val()
    var population_filter = $("#population_filter").val()

    if (service_filter) {
        if (!(resource.services_list.includes(service_filter))) {
            return false
        }
    }

    if (population_filter) {
        if (!(resource.population_list.includes(population_filter))) {
            return false
        }
    }

    $("#shelters-list").append(
            `<div class="panel-group">
    <!-- First Panel -->
    <div class="panel panel-default">
        <div class="panel-heading">
            <h4 class="panel-title" data-toggle="collapse" data-target="#collapse-${index}" id="${index}"
                onclick='toggle("${index}")'>
                ${resource['title']}
            </h4>
        </div>
        <div id="collapse-${index}" class="panel-collapse collapse">
            <div class="panel-body">
               <p>${resource['description']}</p>
            ${resource['services']}<br>
            ${resource['other_info']}
            ${resource['address']}<br><br>
            <div style='width: 100%; height:300px;' id='map-${index}'></div>
            <br>
            </div>
        </div>
    </div>
</div>`)

    return true
}

function toggle(i) {
    var resource = onscreen_resources[parseInt(i)];
    add_map_point(resource, 'map-' + i)
    $(`#${i}`).prev().slideToggle();
    $(`#${i}`).parent().find('p').toggle()
    $(`#${i}`).find('i').toggleClass('is-active')
}

function map_shelters() {

}


function display_map_view() {
    $("#map-shelters-view").empty()
    var map = new mapboxgl.Map({
        container: 'map-shelters-view',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [
            onscreen_resources[0]['longitude'],
            onscreen_resources[0]['latitude']
        ],
        zoom: 10,
    });
    map.on('load', function () {
        map.loadImage(
                'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
                function (error, image) {
                    if (error)
                        throw error;
                    map.addImage('custom-marker', image);
                    var blob = {
                        "type": "geojson",
                        "data": {
                            "type": "FeatureCollection",
                            "features": [],
                        },
                    }
                    for (var resource of onscreen_resources) {
                        blob['data']['features'].push({
                            "type": "Feature",
                            "properties": {
                                "description": "<strong>" +
                                        resource['title'] +
                                        "</strong><br>" +
                                        "" + resource['address'] + "",
                            },
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    resource['longitude'],
                                    resource['latitude']
                                ]
                            }
                        })
                    }
                    map.addSource("places", blob)

                    map.addLayer({
                        'id': 'places',
                        'type': 'symbol',
                        'source': 'places',
                        'layout': {
                            'icon-image': 'custom-marker'
                        },
                    });
                    map.on('click', 'places', function (e) {
                        var coordinates = e.features[0].geometry.coordinates.slice();
                        var description = e.features[0].properties.description;

                        // Ensure that if the map is zoomed out such that multiple
                        // copies of the feature are visible, the popup appears
                        // over the copy being pointed to.
                        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                        }

                        new mapboxgl.Popup()
                                .setLngLat(coordinates)
                                .setHTML(description)
                                .addTo(map);
                    });

                    // Change the cursor to a pointer when the mouse is over the places layer.
                    map.on('mouseenter', 'places', function () {
                        map.getCanvas().style.cursor = 'pointer';
                    });

                    // Change it back to a pointer when it leaves.
                    map.on('mouseleave', 'places', function () {
                        map.getCanvas().style.cursor = '';
                    });
                })
    })
}

function add_map_point(resource, id) {
    console.log(resource)
    if (!('longitude' in resource)) {
        return;
    }
    var map = new mapboxgl.Map({
        container: id,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [
            resource['longitude'],
            resource['latitude']
        ],
        zoom: 10.15,
    });
    map.on('load', function () {
        map.loadImage(
                'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
                function (error, image) {
                    if (error)
                        throw error;
                    map.addImage('custom-marker', image);
                    map.addSource("places", {
                        "type": "geojson",
                        "data": {
                            "type": "FeatureCollection",
                            "features": [
                                {
                                    "type": "Feature",
                                    "properties": {
                                        "description": "<strong>" +
                                                resource['title'] +
                                                "</strong><br>" +
                                                "" + resource['address'] + "",
                                    },
                                    "geometry": {
                                        "type": "Point",
                                        "coordinates": [
                                            resource['longitude'],
                                            resource['latitude']
                                        ]
                                    }
                                }],
                        }
                    })

                    map.addLayer({
                        'id': 'places',
                        'type': 'symbol',
                        'source': 'places',
                        'layout': {
                            'icon-image': 'custom-marker'
                        },
                    });

                    map.on('click', 'places', function (e) {
                        var coordinates = e.features[0].geometry.coordinates.slice();
                        var description = e.features[0].properties.description;

                        // Ensure that if the map is zoomed out such that multiple
                        // copies of the feature are visible, the popup appears
                        // over the copy being pointed to.
                        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                        }

                        new mapboxgl.Popup()
                                .setLngLat(coordinates)
                                .setHTML(description)
                                .addTo(map);
                    });

                    // Change the cursor to a pointer when the mouse is over the places layer.
                    map.on('mouseenter', 'places', function () {
                        map.getCanvas().style.cursor = 'pointer';
                    });

                    // Change it back to a pointer when it leaves.
                    map.on('mouseleave', 'places', function () {
                        map.getCanvas().style.cursor = '';
                    });
                })
    })
}

function init_mapbox() {
}
