var questions = null;
var currentTab = 0

var question_answers = {}

function init_questions () {
  var html = ''
  var que = ''
  var preQue =''
  console.log(questions)
  if (!(questions)) {
    return
  }

  questions.forEach((element, i) => {
    que += `<div class="tab here" question_id=${element.id} id="tab${i}">
                        <h4>${element.question_text}</h4>
                        ${getOptions(element.choices, i)}
            <p id="tab${i}" style="background: lightgray;padding: 10px 12px; display: none;"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>       
           </div>`
    html += `<span class="step"></span>`
  })

  que += `<div style="overflow:auto;">
                <div style="float:right;">
                    <button type="button" id="prevBtn"
                        onclick="nextPrev(-1)">Previous</button>
                    <button type="button" id="nextBtn"
                        onclick="nextPrev(1)" disabled>Next</button>
                </div>
            </div>`

  que += `<div id="custom-indicator"
            style="text-align:center;margin-top:40px;">${html}</div>`

  $('#regForm').html(que)
  currentTab = 0
  showTab(currentTab)
}

var answers = []
function getOptions(choices, i) {
  var opt = ''
  var b = 0;
  choices.forEach((item, ind) => {
     var yes = b++;
    opt += `
            <div class="radio">
                <label><input type="radio" onclick="Check(${i});" id="${yes}" value="${item.id}"
                        oninput="this.className = ''" name="que${i}">
                            ${item.choice_text}</label>
            </div>`
  })

  return opt
}

// var currentTab = 0; // Current tab is set to be the first tab (0)
// showTab(currentTab); // Display the current tab

var isDisable = true

function showTab (n) {
  // This function will display the specified tab of the form...

  $('input[type=radio]').change(function () {
    isDisable = false
    $('#nextBtn').removeAttr('disabled')
  })

  $('#prevBtn').click(function () {
    isDisable = false
    $('#nextBtn').removeAttr('disabled')
  })

  if (isDisable) $('#nextBtn').attr('disabled', true)

  if (n >= questions.length -1) {
    // send results to backend
    set_user_answers()
    return
  }
  var x = document.getElementsByClassName('tab')
  x[n].style.display = 'block'
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById('prevBtn').style.display = 'none'
  } else {
    document.getElementById('prevBtn').style.display = 'inline'
  }
  if (n == x.length - 1) {
    document.getElementById('nextBtn').innerHTML = 'Submit'
  } else {
    document.getElementById('nextBtn').innerHTML = 'Next'
  }
  // ... and run a function that will display the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev (n) {
  // populate  question_answers
   question_answers[$("#tab" + currentTab).attr("question_id")] = (
        $("#tab" + currentTab + " .radio input:checked").val())

  // This function will figure out which tab to display
  var x = document.getElementsByClassName('tab')
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false
  // Hide the current tab:
  x[currentTab].style.display = 'none'
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n
  // if you have reached the end of the form...
  if (currentTab >= x.length) {
    // ... the form gets submitted:
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab)
}

function validateForm () {
  // This function deals with validation of the form fields
  var x
  var y
  var i

  var valid = true
  x = document.getElementsByClassName('tab')
  y = x[currentTab].getElementsByTagName('input')
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == '') {
      // add an "invalid" class to the field:
      y[i].className += ' invalid'
      // and set the current valid status to false
      valid = false
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName('step')[currentTab].className += ' finish'
  }
  return valid // return the valid status
}

function fixStepIndicator (n) {
    // This function removes the "active" class of all steps...
    var i
    var x = document.getElementsByClassName('step')
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(' active', '')
    }
    // ... and adds the "active" class on the current step:
    x[n].className += ' active'
}


function get_questions_api() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": SERVER + "sfapp2/api/list_questions",
        "method": "GET",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
    }
    $.ajax(settings).done(function (response) {
        // change screen for code collecton
        questions = (JSON.parse(response).questions)
        console.log(questions)
        init_questions()
    }).fail(function (err) {
      alert("ERROR")
    });
}

function set_user_answers() {
    var form = new FormData();
    form.append("question_answers", JSON.stringify(question_answers))
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
          text: "Profile Complete",
          icon: "success",
        });
        home()
        init_questions();

        /// XXXX revisit
        //$("#login_number").hide()

    }).fail(function (err) {
      alert("ERROR")
    });
}
