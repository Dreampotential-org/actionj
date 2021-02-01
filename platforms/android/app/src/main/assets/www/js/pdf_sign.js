var canvas = document.getElementById('signature-pad');
var BASE_URL = 'http://localhost/sfapp/www';
var signaturePad = new SignaturePad(canvas, {
  backgroundColor: 'rgb(255, 255, 255)' // necessary for saving image as JPEG; can be removed is only saving as PNG or SVG
});

document.getElementById('clear-sign').addEventListener('click', function () {
  signaturePad.clear();
});

document.getElementById('clear-sign').addEventListener('click', function () {
  if(window.currentModal != 'destination')
  signaturePad.clear();
  window.currentModal = 'destination'
});

// $('#sign_form').on('keyup change paste', 'input, select, textarea', function(){
//   // console.log(JSON.stringify($("#sign_form").serializeArray()));
//   console.log( $('form')[0].checkValidity());
// });
$('#print-form1').on('click',function (e) {
  e.preventDefault();
  var form = $('#sign_form');
  if (form[0].checkValidity() === false ||(!$('#sign_form').find('input[name=isSeller]').is(':checked') && !$('#sign_form').find('input[name=isBuyer]').is(':checked') && $('#sign_form').find('input[name=other]').val()=='')) {
    alert('Must fill the form completely');
  }
  else{
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": window.SERVER + "api_pdf/set_document_text",
      "method": "POST",
      "processData": false,
      "contentType": false,
      "data": new FormData($("#sign_form")[0]),
      "headers": {
        // "Authorization": localStorage.getItem("token"),
      },
      
    }
    $.ajax(settings).done(function (response) {
      window.document_id = response.document_id;
      swal({
        text: 'upload sinature1 on next page',
        title: "Data Saved!",
        icon: "success",
      });
      $('.swal-button--confirm').on('click', function(e){
        window.router.navigate("/pdf-sign/:"+response.document_id+"/signature1");
      });        
    }).fail(function (err) {
      alert("ERROR")
    });    
  }});
  
  (function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (event.preventDefault){ 
            event.preventDefault();
          } 
          else { 
            event.returnValue = false; 
          }
          event.preventDefault();
          event.stopPropagation();
          console.log(form.checkValidity() === false ||(!$('#sign_form').find('input[name=isSeller]').is(':checked') && !$('#sign_form').find('input[name=isBuyer]').is(':checked') && $('#sign_form').find('input[name=other]').val()==''));
          if (form.checkValidity() === false ||(!$('#sign_form').find('input[name=isSeller]').is(':checked') && !$('#sign_form').find('input[name=isBuyer]').is(':checked') && $('#sign_form').find('input[name=other]').val()=='')) {
            alert('Must select a type');
          }
          else{
            form.classList.add('was-validated');          
            var settings = {
              "async": true,
              "crossDomain": true,
              "url": SERVER + "sfapp2/api/pdf_sign/set_document_text",
              "method": "POST",
              "processData": false,
              "contentType": false,
              "mimeType": "multipart/form-data",
              "data": $("#sign_form").serialize(),
              "headers": {
                // "Authorization": localStorage.getItem("token"),
              },
              
            }
            $.ajax(settings).done(function (response) {
              swal({
                text: 'upload sinature1 on next page',
                title: "Data Saved!",
                icon: "success",
              });
              $('.swal-button--confirm').on('click', function(e){
                window.router.navigate("/pdf-sign/:"+response.document_id+"/signature1");
              });        
            }).fail(function (err) {
              alert("ERROR")
            });
          }          
        }, false);
      });
    }, false);
  })();
  
  
  
  
  