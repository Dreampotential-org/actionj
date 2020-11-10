var questions = [
//    {'type': 'speed_read', 'textarea_div': 'display this text on page in div'},
//    {'type': 'title_text', 'title': 'Here is a title in bold on page',
//     'textarea_div': 'display this text on page in div'},
    {'type': 'question_choices', 'title': 'Here is a title in bold on page',
     'choices': ['choice string 1 via radio button', 'two string'],
     'textarea_div': 'display this text on page in div'},
]


function display_segment(n) {
    if (n == 'speed_read') {
        document.getElementById('textarea_div').innerHTML = 'display this text on page in div';
    }
    if (n == 'title_text') {
        document.getElementById('title').innerHTML = 'display this text on page in div title';
        document.getElementById('textarea_div').innerHTML = 'display this text on page in div textarea';
    }
    if (n == 'question_choices') {
        document.getElementById('title').innerHTML = 'display this text on page in div choice';
        document.getElementById('textarea_div').innerHTML = 'display this text on page in div choice';
        init_questions();
    }
}
var currentTab = 0

function init_questions() {
    var html = ''
    var que = ''

    console.log(questions)

    questions.forEach((element, i) => {
        que += `<div class="tab" question_id=${element.id} id="tab${i}">
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

function showTab(n) {
    // This function will display the specified tab of the form...

    $('input[type=radio]').change(function () {
        isDisable = false
        $('#nextBtn').removeAttr('disabled')
    })

    $('#prevBtn').click(function () {
        isDisable = false
        $('#nextBtn').removeAttr('disabled')
    })

    if (isDisable)
        $('#nextBtn').attr('disabled', true)

    if (n >= questions.length) {

        alert("HEREEE")
        set_user_answers()
        // send results to backend
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

function nextPrev(n) {
    // populate  question_answers
    question_answers[$("#tab" + currentTab).attr("question_id")] = (
            $("#tab" + currentTab + " .radio input:checked").val())

    // This function will figure out which tab to display
    var x = document.getElementsByClassName('tab')
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm())
        return false
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



// XXX next / prev button

