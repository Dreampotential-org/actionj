var resources = null;
function get_shelters(callback) {

    if (resources != null) {
        filter_results();
    }

    $.get(SERVER + "sfapp2/api/get_services", function(results) {
        resources = results
        console.log((results))
        populate_services(results['service_types'])
        populate_population(results['population_types'])
        filter_results();

    });
}

function setup_click_resources() {
    $("body").delegate("#service_filter", "change", function(e) {
        $("#population_filter").val("")
        filter_results()
    })

    $("body").delegate("#population_filter", "change", function(e) {
        $("#service_filter").val("")
        filter_results()
    })
}

function filter_results() {
    $("#shelters-list").empty()
    resources['places'].forEach((ele, index)=>{
        console.log(ele)
        add_resource(ele, index);
    })
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
    for(var population of populations) {
        $("#population_filter").append(
            "<option value='" + population + "'>" +
                population +
            "</option>"
        )
    }
}

function add_resource(resource, index) {
    var service_filter =  $("#service_filter").val()
    var population_filter = $("#population_filter").val()

    if (service_filter) {
        if (!(resource.services_list.includes(service_filter))) {
            return
        }
    }

    if (population_filter) {
        if (!(resource.population_list.includes(population_filter))) {
            return
        }
    }

    $("#shelters-list").append(
        `<div class='shelter-close'>
            <b> ${resource['title']} </b>
            <br><br><p>${resource['description'].substring(0, 200)} ...</p>
        <div class='box' style='display:none'>
            ${resource['services']}<br><br>
            ${resource['other_info']}
        </div>
        <button  type='button' class='slide-toggle info' id="${index}"
                onclick='toggle("${index}")'>
            <span class="info-txt">Info</span>
            <i class='fa fa-chevron-up pull-right arrow-icon'></i>
            <i class='fa fa-chevron-down pull-right is-active arrow-icon'></i>
        </button>`)

}

function toggle(i) {
    $(`#${i}`).prev().slideToggle();
    $(`#${i}`).find('i').toggleClass('is-active')
}

function map_shelters() {

}

function init_mapbox() {
    return mapboxgl.accessToken = 'pk.eyJ1IjoiYWFyb25vcm9zZW4iLCJhIjoiY2owdWFoOGgxMDJ2NDMzcWpqb3NocHBtYiJ9.APRb6iQE07MsewU1g2gWWA';
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11'
    });

}
