function init_edit() {
    load_segments()
}

function load_segments() {
    for(var segment of segments) {
        load_segment(segment)
        console.log("LAODING")
    }
}


function load_segment(segment) {
    if (segment.type == "title_img") {
        load_title_img(segment);
    } else if(segment.type == 'html') {
        load_html(segment)
    } else if(segment.type == 'title_text') {
        load_title_text(segment)
    } else if(segment.type == 'question_choices') {
        load_question_choices(segment)
    }
}

function load_question_choices(segments) {
    // Irfan

}


function load_html(segment) {

    $("#segments").append(`
        <hr>
        <div style="padding-top: 15px">
            <div class="form-group">
                <textarea class="form-control"
                    placeholder="html">${segment.html}</textarea>
            </div>
        </div>
    `)
}

function load_title_text(segment) {

    $("#segments").append(`
        <hr>
        <div style="padding-top: 15px">
            <div class="form-group">
                <input class="form-control" value=${segment.title}
                    placeholder="Title"></input>
            </div>
            <div class="form-group">
                <textarea class="form-control"
                    placeholder="">${segment.textarea_div}</textarea>
            </div>
        </div>
    `)
}

function load_title_img(segment) {

    $("#segments").append(`
        <hr>
        <div style="padding-top: 15px">
            <div class="form-group">
                <input class="form-control" value=${segment.title}
                    placeholder="Title"></input>
            </div>
            <div class="form-group">
                <input class="form-control" value=${segment.img}
                    placeholder=""></input>
            </div>
        </div>
    `)
}


window.addEventListener('DOMContentLoaded', init_edit, false)

