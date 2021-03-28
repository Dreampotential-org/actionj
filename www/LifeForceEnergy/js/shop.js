function getParam(sParam) {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split("&");
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split("=");
    if (sParameterName[0] == sParam) {
      return sParameterName[1];
    }
  }
}
function deleteitm(id){
    swal({   
          title: "Are you sure?",   
          text: "You will not be able to recover this Item!",   
          type: "warning",   
          showCancelButton: true,   
          confirmButtonColor: "#DD6B55",   
          confirmButtonText: "Yes, delete it!",   
          closeOnConfirm: false 
      }, function (isConfirmed) {
          if(isConfirmed) {
            var SERVER="https://api.dreampotential.org/"
            var settings_add_item_delete = {
              "async": true,
              "crossDomain": true,
              "url": SERVER + 'store/ItemDetail/'+id,
              "method": "DELETE",
              "type": "DELETE",
              "processData": false,
              "contentType": false,
              // "mimeType": "multipart/form-data",
              // "data": item_form,
            };
            $.ajax(settings_add_item_delete).done(function (response) {
              swal("Deleted!", "Your Item has been deleted.", "success"); 
              location.reload()
            }).fail(function (response) {
                    console.log("Delete item Failed!");
              swal({
                  title: "Error!",
                  text: "Delete Item is failed!",
                  icon: "warning",
              });
            });
          }
      })
}



$(document).ready(function () {

$("#tabDiv").show();
$("#systemUserDetail").hide();
$("#buyItem").hide();
// console.log("ajax call started");
var SERVER = "https://api.dreampotential.org/";
var images = [];
var addImages = [];
var settings = {
  "async": true,
  "crossDomain": true,
  "url": SERVER + 'store/Item',
  "method": "GET",
  "type": "GET",
  "processData": false,
  "contentType": false,
  // "mimeType": "multipart/form-data",
  // "data": form,
};
$.ajax(settings).done(function (response) {
  // response = JSON.parse(response);
  console.log(response);
    response.forEach((item,i) => {
      var image_temp = '';
      var array_images = []
      if(item.images != '' && item.images != null){
        array_images = item.images.split(',');
        for(var i = 0; i < array_images.length; i++){
          image_temp += '<div id="imageDiv_'+i+'_'+item.id+'" style="position: relative">\
          <img id="image_'+i+'_'+item.id+'" src="'+array_images[i]+'" style="padding:5px;width:42px; height: 42px;cursor: pointer;margin-bottom: 5px;">\
          </div>'
        }
      }
      var count_images = array_images.length;
      $("#item-data").append(`<tr>
      <input type="hidden" id="image_count_${item.id}" value="${count_images}">
      <td id=${item.id}>${item.id}</td>
      <td id="title_${item.id}">${item.title}</td>
      <td id="description_${item.id}">${item.description}</td>
      <td id="price_${item.id}">${item.price}</td>
      <td>
      <div style="display: flex;">
        <div style="padding: 10px; display: flex;">
                ${image_temp}
        </div>
      </div>
      </td>
      <td><button type="button" class="btn btn-warning itemEditModal" 
      data-toggle="modal" 
      data-id="${item.id}" 
      data-target="#itemEditModal">
      Edit
      </button></td>
      <td><button onclick="deleteitm(${item.id})" class="btn btn-danger">Delete</button></td>
      </tr>`);
  })
  $('#item_data_table').DataTable({
  "paging": true,
  "pageLength": 5 // false to disable pagination (or any other option)
  });
  
}).fail(function (response) {
  console.log("get user item list is Failed!");
  swal({
      title: "Error!",
      text: "there is some error!",
      icon: "warning",
  });
});
})
document.getElementById('imageFile').onchange = function (event) {
    images = [];
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      console.log('filesAmount', filesAmount);
      for (var i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event) => {
          console.log('event.target.result....');
          images.push(event.target.result);
        }

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

document.getElementById('editimageFile').onchange = function (event) {
  addImages = [];
  if (event.target.files && event.target.files[0]) {
    var filesAmount = event.target.files.length;
    console.log('filesAmount', filesAmount);
    for (var i = 0; i < filesAmount; i++) {
      var reader = new FileReader();

      reader.onload = (event) => {
        console.log('event.target.result....');
        addImages.push(event.target.result);
      }

      reader.readAsDataURL(event.target.files[i]);
    }
  }
}  
$("#additem").submit((event) => {
  event.preventDefault()
  // craete item
  var SERVER="https://api.dreampotential.org/";
  var s3_upload_form = new FormData();
  s3_upload_form.append("file",document.getElementById("imageFile").files[0])
  var settings = {
            "async": true,
            "crossDomain": true,
            "url": SERVER + 's3_uploader/upload',
            "method": "POST",
            "type": "POST",
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": s3_upload_form,
            "headers": {
                "Authorization": localStorage.getItem("token")
            }
        };

        console.log(settings);
        $.ajax(settings).done(function (response) {
            swal({
                  title: "Good job!",
                  text: "File uploaded successfully!",
                  icon: "success",
            });

            response = JSON.parse(response);
            console.log(response);
            file_url = response['file_url']
            console.log(file_url);
  var item_form = {};
  item_form["title"]=$("#title").val();
  item_form["description"]=$("#description").val();
  item_form["price"]= $("#price").val();
  item_form["images"]=file_url;
  item_form_json=JSON.stringify(item_form);
  var SERVER="https://api.dreampotential.org/";

  var settings_add_item = {
    "async": true,
    "crossDomain": true,
    "url": SERVER + 'store/Item',
    "method": "POST",
    "type": "POST",
    "processData": false,
    "contentType": false,
    // "mimeType": "multipart/form-data",
    "data": item_form_json,
    "headers": {
        "Authorization": localStorage.getItem("user-token")
    }
  };
  console.log(images.length);
  $.ajax(settings_add_item).done(function (response) {
    // response = JSON.parse(response);
    console.log(response);
    images = [];
    location.reload()
  }).fail(function (response) {
          console.log(response,"add item Failed!");
    swal({
        title: "Error!",
        text: "Add Item is failed!",
        icon: "warning",
    });
  });

})
      });

$(document).on("click", ".itemEditModal", function () {
  var id = $(this).data('id');
  var title = document.getElementById("title_"+id).textContent;
  var price = document.getElementById("price_"+id).textContent;
  var description = document.getElementById("description_"+id).textContent;
  
  $("[id='editTitle']").val(title);
  $("[id='editPrice']").val(price);
  $("[id='editDescription']").val(description);
  $("[id='edit_id']").val(id);

  var image_count = document.getElementById("image_count_"+id).value;
  $("#imagesUpdateDisplay").empty();
  for(var i = 0; i < image_count; i++){
    var image_scr = $('#image_'+i+'_'+id+'').attr('src');
    $("#imagesUpdateDisplay").append('<img src="'+image_scr+'" style="padding:5px;width:42px; height: 42px;cursor: pointer;">')
  }
});

// send data
$("#edititem").submit((event) => {
  event.preventDefault()
  // update item
  var SERVER="https://api.dreampotential.org/";
  var s3_upload_form = new FormData();
  s3_upload_form.append("file",document.getElementById("editimageFile").files[0])
  var settings = {
            "async": true,
            "crossDomain": true,
            "url": SERVER + 's3_uploader/upload',
            "method": "POST",
            "type": "POST",
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": s3_upload_form,
            "headers": {
                "Authorization": localStorage.getItem("token")
            }
        };

        console.log(settings);
        $.ajax(settings).done(function (response) {
            swal({
                  title: "Good job!",
                  text: "File uploaded successfully!",
                  icon: "success",
            });

            response = JSON.parse(response);
            console.log(response);
            file_url = response['file_url']
            console.log(file_url);
  var item_form = {};
  item_form["id"]=$("#edit_id").val();
  item_form["title"]=$("#editTitle").val();
  item_form["description"] = $("#editDescription").val();
  item_form["price"]=$("#editPrice").val();
  item_form["images"]= file_url
  let item_form_json=JSON.stringify(item_form);
  var settings_add_item_update = {
    "async": true,
    "crossDomain": true,
    "url": SERVER + 'store/ItemDetail/'+$("#edit_id").val(),
    "method": "PUT",
    "type": "PUT",
    "processData": false,
    "mimeType": "multipart/form-data",
    "data": item_form_json
  };
 $.ajax(settings_add_item_update).done(function (response) {
    // response = JSON.parse(response);
    console.log(response);
    location.reload()
  }).fail(function (response) {
          console.log("Edit item Failed!");
    swal({
        title: "Error!",
        text: "Edit Item is failed!",
        icon: "warning",
    });
  });

})

$("#body-row .collapse").collapse("hide");  
// Collapse/Expand icon
//$('#collapse-icon').addClass('fa-angle-double-left');

// Collapse click
function left_sidebar() {
SidebarCollapse();
}
function SidebarCollapse() {
    $(".menu-collapsed").toggleClass("d-none");
    $(".sidebar-submenu").toggleClass("d-none");
    $(".submenu-icon").toggleClass("d-none");
    $("#sidebar-container").toggleClass(
    "sidebar-expanded sidebar-collapsed"
);

// Treating d-flex/d-none on separators with title
var SeparatorTitle = $(".sidebar-separator-title");
if (SeparatorTitle.hasClass("d-flex")) {
    SeparatorTitle.removeClass("d-flex");
} else {
    SeparatorTitle.addClass("d-flex");
}

}

})