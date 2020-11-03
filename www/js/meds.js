function init_meds() {

    $("body").delegate("#add_meds", "click", function(e) {
        add_meds()
    })
}

function add_meds() {
    var form = new FormData();
    form.append("name", $("#med_name").val());
    form.append("dosage", $("#dosage").val());

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": SERVER + "sfapp2/api/add_med",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form,
        "headers": {
            "Authorization": localStorage.getItem("token"),
        },

    }
    $.ajax(settings).done(function (response) {
        // change screen for code collecton
        swal({
          title: "Good job!",
          text: "Medication Added",
          icon: "success",
        });

    }).fail(function (err) {
      alert("ERROR")
    });
}

function list_meds(callback) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": SERVER + "sfapp2/api/list_meds",
        "method": "GET",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "headers": {
            "Authorization": localStorage.getItem("token"),
        },

    }
    $.ajax(settings).done(function (response) {
        // change screen for code collecton
        callback(JSON.parse(response))
    }).fail(function (err) {
      alert("ERROR")
    });
}
