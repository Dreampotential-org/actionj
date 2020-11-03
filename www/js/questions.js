var questions = null;
var currentTab = 0

function init_questions () {
  var html = ''
  var que = ''

  console.log(questions)

  questions.forEach((element, i) => {
    que += `<div class="tab" id="tab${i}">
                        <h4>${element.question_text}</h4>
                        ${getOptions(element.choices, i)}
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

  $('#regForm').append(que)
  showTab(currentTab)
}

var answers = []
function getOptions(choices, i) {
  var opt = ''
  choices.forEach((item, ind) => {
    opt += `
            <div class="radio">
                <label><input type="radio" value="${item.id}"
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
    // return false;
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
        init_questions()
    }).fail(function (err) {
      alert("ERROR")
    });


}
