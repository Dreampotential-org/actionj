var fc_questions = [];
// var SERVER = "https://sfapp-api.dreamstate-4-all.org/"
var currSlide = 0;
var answers = {}
function init_carousel() {
    $('#sign-modal').load("signature/index.html");
    var indicatorHTML = "";
    var carouselItemsHTML = "";
    fc_questions.forEach((card, i)=>{
        carouselItemsHTML += `<div style="height:320px" class="item ${i==0?'active':''}" question_type=${card.lesson_type}  question_id=${card.id} id="flashcard_${i}"> ${get_question_html(card,i)}</div>`;
        indicatorHTML += `<li data-target="#carousel-example-generic" data-slide-to="${i}" class="${i==0?'active':''}"></li>`;
    });
    carouselItemsHTML += `<div style="height:320px" class="item"><div alt="quick_read"><h1 style="color:black; text-align:center">Completed <img height="30px" src="https://www.clipartmax.com/png/full/301-3011315_icon-check-green-tick-transparent-background.png"></h1></div></div>`
    indicatorHTML += `<li data-target="#carousel-example-generic" data-slide-to="${fc_questions.length-1}"}"></li>`
    $('#carousel-indicators').html(indicatorHTML)
    $('#carousel-items').html(carouselItemsHTML)
    get_user_answers();
    var url = new URL(window.location.href);
    var lesson_id = url.searchParams.get("lesson_id")||303;
    $.get(SERVER+'courses_api/lesson/response/get/'+lesson_id+'/'+localStorage.getItem("session_id"),function(response) {
        response.forEach(function(rf){
            fc_questions.forEach(function(f,i){
                if(rf.flashcard[0].id == f.id){
                    console.log(rf.answer)
                    if(f.lesson_type == 'title_textarea'){
                        $("textarea[name=textarea_"+i).val(rf.answer)
                    }
                    if(f.lesson_type == 'title_input'){
                        $("input[name=title_input_"+i).val(rf.answer)
                    }
                    if (f.lesson_type == 'question_choices') {
                        $("input[name=choices_" + i + "][value=" + rf.answer + "]").attr("checked", true)
                    }

                }
                $("input[name=input_signature_"+i+"]").val(rf.answer)
                $("#slide_signature").attr("src",rf.answer)
                if(rf.answer){
                    $("#slide_signature").attr("hidden",false)
                    $('.input_signature').children('button')[0].innerText = 'Redraw Signature'
                }
            })
        })
    })

}

function init_onboarding(){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": SERVER + "courses_api/slide/read/303",
        "method": "GET",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
    }
    $.ajax(settings).done(function (response) {
        // change screen for code collecton
        let flashcards = (JSON.parse(response).flashcards);
        flashcards.sort(function(a, b){
            keyA = a.position;
            keyB = b.position;
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        })
        fc_questions = flashcards;
        init_carousel()
    }).fail(function (err) {
        alert("ERROR")
    });
}

function get_question_html(fc,i) {
    let type = fc.lesson_type;
    switch (type) {
        case 'verify_phone':
            return verify_phone_html(fc);
        case 'question_choices':
            let html = '<div class="question_choices"><h1 style="color:black">'+fc.question+'</h1>'
            if(fc.image) html +=  '<center><img src="'+fc.image+'" alt="Chania" style="height:300px;border:5px;border-style:solid;border-color:black"></center>'
            html += '<ul alt="question_choices_'+i+'">'
            fc.options.forEach(function (valu) {
                html += ("<li><input type='radio' value='"+valu+"' name='choices_"+i+"'> "+valu+"</li>");
            })
            html += '</ul></div>';
            return html;
        case 'name_type':
            return '<div class="name_type"><div alt="name_type"><h1 style="color:black"> Enter your name: </h1><input name ="name_type_' + i + '" class="form-control" placeholder="Enter you name here"></div></div>'
        case 'signature':
            return `<div class="text-center alt="signature">
                <input type="text" hidden name="input_signature_${i}" id="signInput">
                <img id="slide_signature" hidden> </br>
                <button class="btn btn-primary" id="sign-btn_${i}" type="button" onclick="signLesson(event,'slide_signature', 'signInput')"> Click To Sign</button>
                </div>`
        case 'quick_read':
            return '<div alt="quick_read" style=""><h1>'+fc.question+'</h1></div>'
        case 'iframe_link':
            return '<div alt="title_text" style=""><h1> '+fc.question+'</h1><iframe src= "'+fc.image+'"></iframe></div>'
        case 'video_file':
            return '<div alt="title_text"><h1> '+fc.question+'</h1><video controls style="height:100%; width:100%;"> <source src= "'+fc.image+'"></video></div>'
        case 'image_file':
            return '<div alt="title_text" style="height:500px"><h1> '+fc.question+'</h1><img src= "'+fc.image+'"></div>'
        case 'title_textarea':
            return '<div class="title_textarea"><div alt="title_text" style=""><h1> '+fc.question+'</h1><textarea name ="textarea_'+i+'" class="form-control" placeholder="Enter you answer here"></textarea></div></div>'
        case 'title_input':
            return '<div class="title_input"><div alt="title_input" style="height:500px"><h1> '+fc.question+'</h1><input name ="title_input_'+i+'" class="form-control" placeholder="Enter you answer here"></div></div>'
        case 'title_text':
            return '<div alt="title_text" style=""><h1> '+fc.question+'</h1><h3>'+fc.answer+'</h3></div>'
        // case 'title_text':
        //     return '<div alt="title_text" style=""><h1> '+fc.question+'</h1><h3>'+fc.answer+'</h3></div>'
        default:
        break;
    }
}

function verify_phone_html(fc) {
    return `<div data-id=${fc.id}>
    <h3>Verify Phone Number</h3>
    </hr>
    <input id="verify_phone_${fc.id}" type="hidden" value="unverified">
    <form class="form-inline" onsubmit="getCode(event)">
    <div class="form-group">
    <label for="phone-number">Phone number</label>
    <input type="tel"  pattern="^[0-9]{10}|[0-9]{13}||[0-9]{11}$" class="form-control" id="phone-number" required>
    </div>
    <div class="form-group" style="margin-left:20px;">
    <button type="submit" id="get-code-btn" class="btn btn-primary">Get code</button>
    </div>
    </form>
    <form style="margin-top: 16px" id="otp-form" hidden onsubmit="verifyOtp(event)">
    <div class="form-group">
    <label for="code" class="control-label">Verification code:</label>
    <input style="display: inline-block; width: 40%;" class="form-control" type="number" id="2fa-code" required>
    <button style="margin-left:16px;" type="submit" id="submit-code-btn" class="btn btn-primary">Submit</button>
    </div>
    </form>
    </div>`
}

function getCode(e) {
    console.log(e)
    e.preventDefault();
    $('#phone-number').attr('disabled', true);
    $('#get-code-btn').attr('disabled', true);
    $('#otp-form').show();
    var data_ ={
        "phone_number":$('#phone-number').val(),
        "session_id":localStorage.session_id
    }
    
    $.ajax({
        "url": SERVER +"courses_api/confirm/phone",
        'data': JSON.stringify(data_),
        'type': 'POST',
        'contentType': 'application/json',
        'success': function (data){
            alert("SMS SEnt")
        },
        'error': function(res){
            // alert(JSON.stringify(res))
            $('#get-code-btn').attr('disabled', false);
            $('#get-code-btn').text('Resend code');
        }
    })  
}

function verifyOtp(e) {
    e.preventDefault();
    phone_number = $("#phone-number").val();
    code = $("#2fa-code").val();
    
    console.log(phone_number)
    if (phone_number == '') {
        return alert("Please provide your number first");
    }else{
        
        var data_ ={
            "phone_number":phone_number,
            "code_2fa":code
        }
        
        $.ajax({
            "url": SERVER +"courses_api/verify/phone",
            'data': JSON.stringify(data_),
            'type': 'POST',
            'contentType': 'application/json',
            'success': function (data){
                alert("Code Verified")
                let slide = $('#flashcard_'+currSlide)
                let inputEl = $('#verify_phone_'+slide.attr('question_id'));
                inputEl.val('verified');
                $('.item.active').first().html(`<h3 style="color: green; text-align:center;">Phone number verified</h3>`).append(inputEl)
            },
            'error': function(res){
                alert("Code didn't match");
            }
        })   
    }    
}

function signLesson(event, imgId, signInput) {
    console.log($('#signature'))
    if ($('#signature')) {
        $('#signature').modal('show');
    }

    document.addEventListener('signatureSubmitted', function (e) {
        updateSign(window.currentSignature.data, event, imgId, signInput);
    });
}

function updateSign(data_, event, imgId, signInput) {
    console.log("yo")
    $('#' + signInput).val(data_);
    console.log("updating sign :" + imgId)
    console.log("with: " + data_)
    $('#' + imgId).attr("src", data_);
    console.log("yo" + data_ + $('#' + imgId).attr("src"))
    $('#' + imgId).removeAttr('hidden');

    if (event) {
        event.target.innerHTML = 'Redraw Signature';
    }
}

function prev_slide(params) {
    if(!currSlide) {
        $('#carousel-prev').attr('disabled', true);
        return
    }
    $('#carousel-prev').attr('disabled', false);
    let slide = $('#flashcard_'+currSlide);
    let type = slide.attr('question_type')
    get_answer(type,slide);
    console.log(answers)
    --currSlide;
    set_user_answers()
}

function next_slide(params) {
    if(fc_questions.length == currSlide) {
        $('#carousel-next').attr('disabled', true);
        return;
    }
    $('#carousel-next').attr('disabled', false);
    let slide = $('#flashcard_'+currSlide);
    let type = slide.attr('question_type')
    get_answer(type,slide);
    console.log(answers)
    ++currSlide;
    set_user_answers()
}

function get_answer(type, slide) {
    let questionId = slide.attr('question_id');
    switch (type) {
        case 'verify_phone':
            answers[questionId] = $('#verify_phone_'+questionId).val() == 'verified'?1:0;
            break;
        case 'question_choices':
            answers[questionId] = $("input[name= choices_" + (currSlide) + "]:checked").val()
            break;
        case 'name_type':
            answers[questionId] = $("input[name= name_type_" + (currSlide) + "]").val()
            break;
        case 'signature':
            answers[questionId] = $("input[name= input_signature_"+(currSlide)+"]").val()
            break;
        case 'quick_read':
            answers[questionId] = 1;
            break;
        case 'iframe_link':
            answers[questionId] = 1;
            break;
        case 'video_file':
            answers[questionId] = 1;
            break;
        case 'image_file':
            answers[questionId] = 1;
            break;
        case 'title_textarea':
            answers[questionId] = $("textarea[name= textarea_"+(currSlide)+"]").val();
            break;
        case 'title_input':
            answers[questionId] = $("input[name= title_input_"+(current_slide)+"]").val();
            break;
        case 'title_text':
            answers[questionId] = 1;
            break;
        // case 'title_text':
        //     return '<div alt="title_text" style=""><h1> '+fc.question+'</h1><h3>'+fc.answer+'</h3></div>'
        default:
        break;
    }
}

function get_user_answers() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": SERVER + "sfapp2/api/get_user_info",
        "method": "GET",
        "mimeType": "multipart/form-data",
        "headers": {
            "Authorization": localStorage.getItem("token"),
        },

    }
    $.ajax(settings).done(function (response) {
        let res = JSON.parse(response).data;
        answers = res;
        fc_questions.forEach(function(rf,i){
            if(rf.lesson_type == 'title_textarea'){
                $("textarea[name=textarea_"+i).val(res[`${rf.id}`])
            }
            else if(rf.lesson_type == 'title_input'){
                $("input[name=title_input_"+i).val(res[`${rf.id}`])
            }
            else if (rf.lesson_type == 'question_choices') {
                console.log(rf.id,res[`${rf.id}`])
                $("input[name=choices_" + i + "][value='" + res[`${rf.id}`] + "']").attr("checked", true)
            }
            else if (rf.lesson_type == 'name_type') {
                $("input[name=name_type_" + i + "]").val(res[`${rf.id}`])
            }
            else if(rf.lesson_type == 'signature'){
                $("input[name=input_signature_"+i+"]").val(res[`${rf.id}`])
                $("#slide_signature").attr("src",res[`${rf.id}`])
                if(res[`${rf.id}`]){
                    $("#slide_signature").attr("hidden",false)
                    console.log($('#sign-btn_'+i))
                    $('#sign-btn_'+i)[0].innerText = 'Redraw Signature'
                }
            }
            })
    }).fail(function (err) {
        console.log(err)
      alert("ERROR")
    });
}

function set_user_answers() {
    var form = new FormData();
    form.append("question_answers", JSON.stringify(answers))
    console.log(SERVER + "sfapp2/api/set_user_info")
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
        if(currSlide === (fc_questions.length)){
        swal({
          title: "Good job!",
          text: "Profile Complete",
          icon: "success",
        });
        home()
        // init_questions();
        init_onboarding()
        /// XXXX revisit
        //$("#login_number").hide()
    }
    }).fail(function (err) {
        console.log(err)
      alert("ERROR")
    });
}