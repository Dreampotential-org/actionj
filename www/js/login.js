function init_login() {

    $("body").delegate("#login_number", "click", function(e) {
        if ($(".phone-code-input").is(":visible")) {
            next_code_login()
        }
        else if ($(".name-input").is(":visible")) {
            set_user_info()
        } else {
            phone_login()
        }
    })
}

function set_user_info() {
    var form = new FormData();
    form.append("name", $("#name").val());

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": SERVER + "sfapp2/api/set_user_info",
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
          text: "You're logged in",
          icon: "success",
        });
        home()
        /// XXXX revisit
        //$("#login_number").hide()

    }).fail(function (err) {
      alert("ERROR")
    });


}

function phone_login() {
    var form = new FormData();
    form.append("phone_number", $("#phone").val());

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": SERVER + "sfapp2/api/login-phone-number",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }
    $.ajax(settings).done(function (response) {
        console.log(response)
        // change screen for code collecton
        $(".phone-code-input").show()
        $(".phone-input").hide()

    }).fail(function (err) {
        swal({
          title: "Error",
          text: "Invalid Phone Number",
          icon: "error",
        });
    });
}

function next_code_login() {
    var form = new FormData();
    form.append("phone_number", $("#phone").val());
    form.append("code_2fa", $("#phone-code").val());

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": SERVER + "sfapp2/api/login-verify-2fa",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }
    $.ajax(settings).done(function (response) {
      var resp = JSON.parse(response)
      if(resp.message.includes("success")) {
        localStorage.setItem('token', resp.token)
        /* swal({
          title: "Good job!",
          text: "You are logged in",
          icon: "success",
        });*/
        //home();
        $(".phone-code-input").hide()
        $(".name-input").show()
      }
    }).fail(function (err) {
        swal({
          title: "Error",
          text: "Incorrect code Try again",
          icon: "error",
        });

    });
}

var questions = [
    {'question': 'How old are you?',
     'answers': ['I am 25 years old or older', 'I am under the age of 25']},
    {'question': 'What best describes your current housing situation?',
     'answers': ['I need immediate shelter tonight or within the next week',
                'I am currently at a shelter or some other form of temporary housing',
                'I am currently housed but am at-risk of homelessness']},

    {'question': 'What best describes your current Family?',
     'answers': ['Our family is composed of one or more adults with physical and legal custody of a minor child who is 17 years or younger',
                 'I am currently pregnant',
                 'None of the above options']},
    {'question': 'What best describes your current housing situation?',
     'answers': ['I need immediate shelter tonight or within the next week',
                 'I am currently at a shelter or some other form of temporary housing',
                 'I am currently housed but am at-risk of homelessness']},
    {'question': 'What best describes your current living situation?',
     'answers': ['My family and I need immediate shelter tonight or within the next week',
                 'My family and I am temporarily living with a family member, friend or someone else',
                 'My family and I am currently stay at the shelter',
                 'My family and I am currently housing but am at-risk of homelessness']},
    {'question': 'Are you seeking relief from domestic violence?',
     'answers': ['Yes, I am seeking relief from domestic violence',
                'No, I am not seeking relief from domestic violence']},
    {'question': 'Are you a veteran?',
     'answers': ['Yes, I am a veteran',  'No, I am not a veteran']}
]
var question_responses = [];
// ^ stores list of {'question': 'how old are you': 'answer': 'I am 25 years  or older ...}, {'question': ... }
