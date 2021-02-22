var API_SERVER ="https://sfapp-api.dreamstate-4-all.org"
// var API_SERVER = "http://localhost:8000";
var answer = ""
var signature = ""
var current_slide = 0;
var total_slides = 0;
var loaded_flashcards = null;
var pct = 0
var completed = false
var signature = [];
var phone_verification_status =false;
var current = 0;
var question_list, answer_list = [], active_question_index = 0;
var responses = [];
function updateProgressBar() {
    pct = (current_slide / total_slides) * 100
    $('.progress-bar').css("width", pct + "%")
    $('.progress-bar').attr("aria-valuenow", pct)
    $("#progress").html(current_slide + " out of " + total_slides)
}

function updateSign(data_,event,imgId,signInput){
    console.log("yo")
    $('#' + signInput).val(data_);
    console.log("updating sign :"+imgId)
    console.log("with: "+ data_)
    $('#' + imgId).attr("src", data_);
    console.log("yo"+data_+$('#' + imgId).attr("src"))
    $('#' + imgId).removeAttr('hidden');

    if(event){
        event.target.innerHTML = 'Redraw Signature';
    }
}

function signLesson(event, imgId, signInput) {
    if ($('#signature')) {
        $('#signature').modal('show');
    }

    document.addEventListener('signatureSubmitted', function (e) {
        updateSign(window.currentSignature.data,event,imgId,signInput);
    });
}

function nextSlide(){
    if(current_slide <total_slides){
        current_slide++
        completed = false;
    } else {
        completed = true;
    }

    updateProgressBar()

    if(!completed){
        var type = $("div.active").children().children().attr("alt");
        console.log(type)
        if (type == "question_choices") {
            answer = $("input[name= choices_" + (current_slide - 1) + "]:checked").val()
            console.log(answer)
        }else if(type == "title_textarea"){
            answer = $("textarea[name= textarea_"+(current_slide-1)+"]").val()
        }else if(type == "title_input"){
            answer = $("input[name= title_input_"+(current_slide-1)+"]").val()
            console.log("title inpt")
        }else if(type=='signature'){
            console.log("This is signature")
            answer = $("input[name= input_signature_"+(current_slide-1)+"]").val()
        }


        $('#myCarousel').carousel('next');
        var current_flashcard = loaded_flashcards[current_slide-1]
        current_flashcard = current_flashcard.id?current_flashcard:loaded_flashcards[current_slide-2]
        var flashcard_id = current_flashcard.id;
        var sessionId = localStorage.getItem("session_id");
        var ip_address = "172.0.0.1";
        var user_device = "self device"
        da_ = {
            "session_id": localStorage.getItem("session_id"),
            "ip_address": ip_address,
            "user_device": user_device
        }



        var data_ = {
            "flashcard":flashcard_id,
            "session_id":localStorage.getItem("session_id"),
            "answer":answer?answer:"",
        }


        console.log(data_)

        $.ajax({
            "url": API_SERVER +"/courses_api/flashcard/response/",
            'data': JSON.stringify(data_),
            'type': 'POST',
            'contentType': 'application/json',
            'success': function (data){
                $.ajax({
                    "url": API_SERVER + '/courses_api/session/event/' + flashcard_id + '/' + sessionId + '/',
                    "data": JSON.stringify(da_),
                    "type": 'POST',
                    "contentType": 'application/json',
                    "success": function (da_) {
                        console.log("Session event duration")

                    }
                })
                alert("FlashCard Response Sent")
            },
            'error': function(res){
                // alert(JSON.stringify(res))
            }
        })

    }
}

function prevSlide() {
    if (current_slide > 0) {
        current_slide--;
    }
    updateProgressBar()
    console.log(current_slide)
    $('#myCarousel').carousel('prev');
}

function getParam(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var p = 0; p < sURLVariables.length; p++){
        var sParameterName = sURLVariables[p].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

function get_session() {
    var session_id = localStorage.getItem("session_id")
    if (session_id) {
        console.log("Already have session_id " + session_id)
        return session_id
    }
    console.log("Generate new session")
    $.get(API_SERVER + '/courses_api/session/get', function (resp) {
        console.log(resp)
        localStorage.setItem("session_id", resp.session_id)
    })
}

function init(callback) {
    $('#sign-modal').load("signature/index.html");
    $("#verify-phone-modal").load('phone/index.html');

    $("#progress-section").hide();
    var lesson_id = getParam("lesson_id");

    $.get(API_SERVER + '/courses_api/lesson/read/' + lesson_id + "/",
        function (response) {
            console.log(response)
            get_session();
            question_list = response.flashcards;
            //let sign_flashcard = {lesson_type: 'input_signature'}
            //response.flashcards.push(sign_flashcard)
            total_slides = response.flashcards.length;
            /*$("#progress-section").show();*/

            $("#progress").html(current_slide+ " out of "+ total_slides)
            var flashcards = response.flashcards;
            //console.log(flashcards)
            // XXX make api DO THIS
            flashcards.sort(function(a, b){
                keyA = a.position;
                keyB = b.position;
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            })
            loaded_flashcards = flashcards;
            var i = 0;
            var className = "item";
            // XXX refactor code below into smaller processing chunk
            flashcards.forEach((flashcard) => {
                if (i == 0) {
                    className = "item active"
                } else {
                    className = "item"
                }
                $("#carousel-indicators").append(
                    '<li data-target="#myCarousel" data-slide-to="'+i+'" class="active"></li>')
                if(flashcard.lesson_type == "quick_read"){
                    $("#prevButton").attr("data-type","quick_read");
                    $("#nextButton").attr("data-type","quick_read");

                    $("#theSlide").append('<div class="'+className+'"><div alt="quick_read" style="height:500px"><h1>'+flashcard.question+'</h1></div></div>')
                }
                if(flashcard.lesson_type == "title_text") {
                    $("#prevButton").attr("data-type","title_text");
                    $("#nextButton").attr("data-type","title_text");
                    $("#theSlide").append('<div class="'+className+'"><div alt="title_text" style="height:500px"><h1> '+flashcard.question+'</h1><h3>'+flashcard.answer+'</h3></div></div>')
                }
                if(flashcard.lesson_type == "question_choices"){
                    $("#prevButton").attr("data-type","question_choices");
                    $("#nextButton").attr("data-type","question_choices");
                    $("#theSlide").append('<div class="'+className+'" id="flashcard_'+i+'"><div class="question_choices"><h1>'+flashcard.question+'</h1><ul alt="question_choices_'+i+'"></ul></div></div>')
                    if(flashcard.image){
                        $("#flashcard_"+i).prepend('<center><img src="'+flashcard.image+'" alt="Chania" style="height:300px;border:5px;border-style:solid;border-color:black"></center>')
                    }

                    flashcard.options.split(",").forEach(function (valu) {
                        $("#theSlide").find("ul").each((a,b,c) => {
                            if($(b).attr("alt") == "question_choices_"+i){
                                $(b).append("<input type='radio' value='"+valu+"' name='choices_"+i+"'> "+valu+"<br>")

                            }

                        });
                        if($("#theSlide").find('ul').attr("alt") === "question_choices_"+i){

                        }
                    })
                }
                if(flashcard.lesson_type == "iframe_link"){
                    $("#theSlide").append('<div class="'+className+'"><div alt="title_text" style="height:500px"><h1> '+flashcard.question+'</h1><iframe src= "'+flashcard.image+'"></iframe></div></div>')
                }
                if(flashcard.lesson_type == "video_file"){
                    $("#theSlide").append('<div class="'+className+'"><div alt="title_text"><h1> '+flashcard.question+'</h1><video controls style="height:100%; width:100%;"> <source src= "'+flashcard.image+'"></video></div></div>')
                }

                if(flashcard.lesson_type == "image_file"){
                    $("#theSlide").append('<div class="'+className+'"><div alt="title_text" style="height:500px"><h1> '+flashcard.question+'</h1><img src= "'+flashcard.image+'"></div></div>')
                }

                if(flashcard.lesson_type == "title_textarea"){
                    $("#theSlide").append('<div class="'+className+'"><div class="title_textarea"><div alt="title_text" style="height:500px"><h1> '+flashcard.question+'</h1><textarea name ="textarea_'+i+'" class="form-control" placeholder="Enter you answer here"></textarea></div></div></div>')
                }
                if(flashcard.lesson_type == "title_input"){
                    $("#theSlide").append('<div class="'+className+'"><div class="title_input"><div alt="title_input" style="height:500px"><h1> '+flashcard.question+'</h1><input name ="title_input_'+i+'" class="form-control" placeholder="Enter you answer here"></div></div></div>')
                }
                if(flashcard.lesson_type == "signature") {
                    $("#theSlide").append(`
                <div class="${className}" id="flashcard_${i}">
                <div alt="signature">
                <input type="text" hidden name="input_signature_${i}" id="signInput">
                <button class="btn btn-primary" type="button" onclick="signLesson(event,'slide_signature', 'signInput')"> Click To Sign</button>
                <img id="slide_signature" hidden >
                </div>
                </div>`)
                }
                if(flashcard.lesson_type =="verify_phone"){
                    console.log("adding verify phone")

                    $("#theSlide").append(`
                    <duv class="${className}" id="flascard_${i}" id="verify_phone">
                        <div alt="verify_phone">
                            <input type="text" hidden name="verify_phone_${i}" id="verifyPhone">
                            <button class="btn btn-primary" type="button" onclick="verifyPhone(event)"> Click To Verify Phone Number</button>
                            <p id="phone_verification_status">${phone_verification_status? "verified" : "not verified"}</p>
                            </div>
                    </div>
                `);
                }

                i++;
            })


            $("#theSlide").append('<div class="item"><div alt="quick_read" style="height:500px"><h1>Completed <img height="30px" src="https://www.clipartmax.com/png/full/301-3011315_icon-check-green-tick-transparent-background.png"></h1></div></div>')
            $.get(API_SERVER+'/courses_api/lesson/response/get/'+lesson_id+'/'+localStorage.getItem("session_id"),function(response) {
                response.forEach(function(rf){
                    loaded_flashcards.forEach(function(f,i){
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
        })

    if (callback && typeof callback === "function") {
        callback()
    }
}

$(document).on("click", "#slide__mover", function () {
    console.log(current);

    if (current === 1) {
        $(".prep__box").eq(1).removeClass("move__in");
        animateSlide(1, function () {
           setTimeout(function () {
               $(".mod__box").hide();
               $(".top__bar").show();
               $(".test__container").show();
               $("#progress-section").show();

               displayQuestion(0);
               /*console.log(question_list, active_question_index)*/
           }, 500)
        })
    } else{
        var next = current + 1;
        animateSlide(current, function () {
          setTimeout(function () {
              $(".prep__box").eq(0).hide();
              $(".prep__box").eq(next).addClass("move__in");
              $(".prep__box").eq(next).show();
              $(".dot").removeClass("active");
              $(".dot").eq(next).addClass("active");
              $("#slide__mover").text("Take the test");
          }, 500);
        })





        current = next;
    }


})

$(document).on("click", ".options div", function () {
    var text = $(this).find("span").text();
   /* $(this).find(".bx-check").toggle();*/

    if ($(this).find(".bx-check").length === 0) {
        $(this).prepend(`<i class="bx bx-check">`);
    } else{
        $(this).find(".bx-check").remove();
    }

    if ($(".selections").find("div").length === 0) {
        $(".selections").append(`<div>${text}</div>`)
    }else{
        var removed = false;
        for (var i = 0; i < $(".selections div").length; i++) {
            if ($(".selections div").eq(i).text() === text) {
                $(".selections div").eq(i).remove();
                removed = true;
            }
        }

        if (removed === false){
            $(".selections").append(`<div>${text}</div>`)
        }
    }



})

$(document).on("click", ".selections div", function () {
    $(this).remove();
    var text = $(this).text();

    for (var i = 0; i < $(".options div").length; i++) {
        if ($(".options div").eq(i).find("span").text() === text) {
            $(".options div").eq(i).find(".bx-check").remove();
        }
    }
})
function animateSlide(index, callback) {
    $(".prep__box").eq(index).addClass("move__out");

    if (callback && typeof callback === 'function') {
        callback();
    }
}

$("#move-forward").click(function () {

    if ($(".selections").find("div").length === 0) {
        return false;
    } else{
        var response_array = [];
        for (var i = 0; i < $(".selections div").length; i++) {
            response_array[i] = $(".selections div").eq(i).text();
        }
        var current_response = response_array.toString();
        responses[current_slide] = current_response;
       clearContent();
        var next_question = current_slide + 1;
        displayQuestion(next_question);
        current_slide = next_question;
        updateProgressBar();
        $(window).animate({scrollTop: 0}, 600);
        console.log(responses);
    }
})

$("#move-backward").click(function () {
    if (current_slide === 0) {
        return false;
    } else{
        var new_current = current_slide - 1;
        current_slide = new_current;
        clearContent();
       displayQuestion(new_current);
    }
})

$("#text__area").on("keyup", function () {
    $(".selections").html("");

        if ($(this).val().length === 0) {
            $(".selections").html("");
        } else{
            $(".selections").append(`<div>${$(this).val()}</div>`)
        }
})


function verifyPhone(event){
    if ($('#verify_phone')) {
        $('#verify_phone').modal('show');
    }

    document.addEventListener('phoneVerified', function (e) {
        $('#verify_phone').modal('hide');
        phone_verification_status = true
    });
}

window.addEventListener('DOMContentLoaded', init(function () {
        $(".mod__box").show();
}), false)

function displayQuestion(index) {
    $(".test__question").hide();
    if(question_list[index].lesson_type === "question_choices") {
        $(".question__choices .question").append(`<p>${question_list[index].question}</p>`)
        var options = question_list[index].options.split(",");

        for (var i = 0; i < options.length; i++)  {
            $(".question__choices .options").append(`<div><span>${options[i]}</span></div>`)
        }

        $(".question__choices").show();
    }

    if (question_list[index].lesson_type === "title_textarea") {
        $(".text__area__question .question").append(`<p>${question_list[index].question}</p>`)

        $(".text__area__question").show();
    }
}

function clearContent() {
    $(".clearable").html("");
    $("#text__area").val("");
}
