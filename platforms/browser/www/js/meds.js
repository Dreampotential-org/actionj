function init_meds() {

    $("body").delegate("#add_meds", "click", function(e) {
        add_meds()
    })

    $("body").delegate(".med-delete", "click", function(e) {
        swal({
            title: "Remove medication?",
            text: "Yes delete, remove this medication.",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then(willDelete => {
            if (willDelete) {
                delete_med($(this).attr("med_id"))
            }
        })
    })

    if (localStorage.getItem("token")) {
        refresh_meds()
    }
}

function refresh_meds() {
    list_meds(function(meds) {
        $("#med_list").empty()
        for(var med of meds) {
            add_med_html(med)
        }
    })
}

function handle_meds_click() {
    if (localStorage.getItem("token")) {
        hide_screens()
        $("#my-meds-screen").show()
    }
    else {
        swal({
            title: "Error",
            text: "You must first login to your profile",
            icon: 'warning',
        })
        $("#my-profile").click()
    }
}



function add_med_html(med) {
    $("#med_list").append(`
        <tr>
            <td>${med.name}</td>
            <td>${med.dosage}</td>
            <td>
                <a href='#' class='med-delete' med_id=${med.id}>
                    <span class="glyphicon glyphicon-trash"
                        style="font-size: 19px;color: white;"></span>
                </a>
            </td>
        </tr>
    `)
}


function delete_med(med_id) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": SERVER + "sfapp2/api/del_med/" + med_id,
        "method": "DELETE",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "headers": {
            "Authorization": localStorage.getItem("token"),
        },

    }
    $.ajax(settings).done(function (response) {
        // change screen for code collecton
        swal({
          title: "Good job!",
          text: "Medication Removed",
          icon: "success",
        });
        refresh_meds()
    }).fail(function (err) {
      alert("ERROR")
    });
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
        refresh_meds()
        $(".close").click()

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
        callback(JSON.parse(response).meds)
    }).fail(function (err) {
      alert("ERROR")
    });
}
