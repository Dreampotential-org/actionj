var answers = []
var currentTab = 0

function load_questions() {
    var html = ''
    var que = ''

    segments.forEach((element, i) => {
        que += `<div class="tab" question_id=${element.id} id="tab${i}">
                      ${getOptions(i)}
                    </div>`
        html += `<span class="step"></span>`
    })

    que += `<div style="overflow:auto;">
                <div style="float:right;">
                    <button type="button" id="prevBtn"
                        onclick="nextPrev(-1)">Previous</button>
                    <button type="button" id="nextBtn"
                        onclick="nextPrev(1)">Next</button>
    <button type="button" id="submitBtn"
                        onclick="showmodel()" style="display:none">Submit</button>
                </div>
            </div>`

    que += `<div id="custom-indicator"
            style="text-align:center;margin-top:40px;">${html}</div>`

    $('#segForm').append(que)
    showTab(currentTab)
}

function getOptions(i) {

    var view = ''
    if (segments[i].type == 'html') {
        view = `<div class="form-group">
        <div><b>${segments[i].title}<b></div>
        ${segments[i].html}
    </div>`
    } else if (segments[i].type == 'title') {
        view = `<div class="form-group">
                <b>${segments[i].title}</b>
                <div class="img"> <img src=${segments[i].img}></div>
                </div>`
    } else if (segments[i].type == 'speed_read') {
        view = `<div class="form-group">
                <textarea class="form-control" id="speed_read_input" rows="7" placeholder="">${
                segments[i].textarea_div
                }</textarea>
            </div>`
    } else if (segments[i].type == 'title_text') {
        view = `<div class="form-group">
                <h2>${segments[i].title}</h2>
                </div>
                <div class="form-group">
                <div>${segments[i].textarea_div}</div>
                </div>`
    } else if (segments[i].type == 'image_text_choices_answers') {
        view = `<div class="form-group">
                <div class="question">${segments[i].title}</div>
                <div class="img"><img src="${segments[i].img}"></div>
            </div>`
        segments[i].choices.forEach(item => {
            view += `<div class="radio">
                        <label><input type="radio" id="${segments[i].id}" value="${item}"
                                oninput="this.className = ''" name="que${i}">
                                    ${item}</label>
                    </div>`
        })

        view += `<div class="${segments[i].id}" id="explaination" style="display:none">${segments[i].answer_text}</div><br>`
    } else {
        view = `<h4>${segments[i].title}</h4>`
        segments[i].choices.forEach(item => {
            view += `<div class="radio">
                        <label><input type="radio" value="${item}"
                                oninput="this.className = ''" name="que${i}">
                                    ${item}</label>
                    </div>`
        })
    }

    return view
}


var isDisable = true

function showTab(n) {
    // This function will display the specified tab of the form...

    $('input[type=radio]').change(function () {
        isDisable = false
        // $('#nextBtn').removeAttr('disabled')
    })

    $('#prevBtn').click(function () {
        isDisable = false
        // $('#nextBtn').removeAttr('disabled')
    })

    // if (isDisable) $('#nextBtn').attr('disabled', true)

    if (n >= segments.length) {
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
        document.getElementById('submitBtn').style.display = 'none'
    }
    if (n == x.length - 1) {
        // document.getElementById('nextBtn').innerHTML = 'Submit'
        document.getElementById('nextBtn').style.display = 'none'
        document.getElementById('submitBtn').style.display = 'inline'
    } else {
        document.getElementById('nextBtn').style.display = 'inline'
        document.getElementById('nextBtn').innerHTML = 'Next'
    }


    // ... and run a function that will display the correct step indicator:
    fixStepIndicator(n)
}
function showmodel() {
    swal({
        title: "Done",
        text: "Lesson Completed",
        icon: 'success',
    })
}
function nextPrev(n) {
    // populate  question_answers
    // question_answers[$('#tab' + currentTab).attr('question_id')] = $(
    //   '#tab' + currentTab + ' .radio input:checked'
    // ).val()

    // This function will figure out which tab to display
    var x = document.getElementsByClassName('tab')
    // Exit the function if any field in the current tab is invalid:
    // if (n == 1 && !validateForm()) return false
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

function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i

    var x = document.getElementsByClassName('step')
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(' active', '')
    }
    // ... and adds the "active" class on the current step:
    x[n].className += ' active'
}
