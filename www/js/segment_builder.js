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
    }
    else if (segments[i].type == 'speed_read') {
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
