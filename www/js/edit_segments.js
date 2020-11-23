function init_edit() {
    load_segments()
}

function load_segments() {
    var count = 1
    for (var segment of segments) {
        load_segment(segment, count)
        console.log("LAODING")
        count += 1
    }

    // made sortable
    $("#segments").sortable()
}


function load_segment(segment, count) {
    if (segment.type == "title_img") {
        load_title_img(segment, count);
    } else if (segment.type == 'html') {
        load_html(segment, count)
    } else if (segment.type == 'title_text') {
        load_title_text(segment, count)
    } else if (segment.type == 'question_choices') {
        load_question_choices(segment, count)
    } else if (segment.type == 'image_text_choices_answers') {
        load_image_text_choices_answers(segment, count)
    }
}

function load_image_text_choices_answers(segment, count) {
    var view = ''
    segment.choices.forEach(item => {
        view += `<div class="radio">
                        <label><input type="radio" value="${item}"
                                oninput="this.className = ''" name="que">
                                    ${item}</label>
                    </div>`
    })
    $("#segments").append(`
    <div class="remove_segment"><a href="#" class="remove_segment_box" style="color:red;font-weight:bold;font-size:25px"> x</a></div>
        <div class="segement_box">
        <b>Segment: ${count}</b>
        <div style="padding-top: 15px">
            <div class="form-group">
                <input class="form-control" value="${segment.title}"
                       placeholder="Title"></input>
            </div>
        ${view}
            <div class="form-group">
                <textarea class="form-control"
                    placeholder="">${segment.answer_text}</textarea>
            </div>
        </div>
        </div>
    `)
}


function load_question_choices(segment, count) {
    var view = ''
    segment.choices.forEach(item => {
        view += `<div class="radio">
                        <label><input type="radio" value="${item}"
                                oninput="this.className = ''" name="que">
                                    ${item}</label>
                    </div>`
    })
    $("#segments").append(`
    <div class="remove_segment"><a href="#" class="remove_segment_box" style="color:red;font-weight:bold;font-size:25px"> x</a></div>
        <div class="segement_box">
        <b>Segment: ${count}</b>
        <div style="padding-top: 15px">
            <div class="form-group">
                <input class="form-control" value="${segment.title}"
                    placeholder="Title"></input>
            </div>
    ${view}
            <div class="form-group">
                <textarea class="form-control"
                    placeholder="">${segment.textarea_div}</textarea>
            </div>
        </div>
        </div>
    `)

}


function load_html(segment, count) {

    $("#segments").append(`
    <div class="remove_segment"><a href="#" class="remove_segment_box" style="color:red;font-weight:bold;font-size:25px"> x</a></div>
 <div class="segement_box">
<b>Segment: ${count}</b>
<div style="padding-top: 15px">
    <div class="form-group">
        <textarea class="form-control"
                  placeholder="html">${segment.html}</textarea>
    </div>
</div>
</div>
`)
}

function load_title_text(segment, count) {

    $("#segments").append(`
    <div class="remove_segment"><a href="#" class="remove_segment_box" style="color:red;font-weight:bold;font-size:25px"> x</a></div>
        <div class="segement_box">
        <b>Segment: ${count}</b>
        <div style="padding-top: 15px">
            <div class="form-group">
                <input class="form-control" value="${segment.title}"
                    placeholder="Title"></input>
            </div>
            <div class="form-group">
                <textarea class="form-control"
                    placeholder="">${segment.textarea_div}</textarea>
            </div>
        </div>
        </div>
    `)
}

function load_title_img(segment, count) {

    $("#segments").append(`
    <div class="remove_segment"><a href="#" class="remove_segment_box" style="color:red;font-weight:bold;font-size:25px"> x</a></div>
        <div class="segement_box">
        <b>Segment: ${count}</b>
        <div style="padding-top: 15px">
            <div class="form-group">
                <input class="form-control" value="${segment.title}"
                    placeholder="Title"></input>
            </div>
            <div class="form-group">
                <input class="form-control" value=${segment.img}
                    placeholder=""></input>
            </div>
        </div>
        </div>
    `)
}


window.addEventListener('DOMContentLoaded', init_edit, false)

