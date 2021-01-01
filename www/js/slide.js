var SERVER ='https://sfapp-api.dreamstate-4-all.org'
// var SERVER = "http://localhost:8000";
var current_slide = 0;
var total_slides = 0;
var pct=0
function updateProgressBar(){
    pct = (current_slide/total_slides)  * 100
    $('.progress-bar').css("width",pct+"%")
    $('.progress-bar').attr("aria-valuenow",pct)
    $("#progress").html(current_slide+ " out of "+ total_slides)
}

function nextSlide(){
    current_slide++
    updateProgressBar()
    var type = $("div.active").children().attr("class");
    if(type == "question_choices"){
        console.log("SEnding a reuest")
    }
    $('#myCarousel').carousel('next');
}

function prevSlide(){
    current_slide--;
    updateProgressBar()
    console.log(current_slide)

    $('#myCarousel').carousel('prev');
    var type = $("div.active").children().attr("class");
    console.log(type)
}

function getParam(sParam){
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');
  for (var i = 0; i < sURLVariables.length; i++){
      var sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] == sParam) {
          return sParameterName[1];
      }
  }
}

function get_session() {
    var session_id = localStorage.getItem("session_id")
    if (session_id) {
        console.log("Already have session_id " + session_id)
        return
    }
    console.log("Generate new session")
    $.get(SERVER + '/courses_api/session/get', function(resp) {
        console.log(resp)
        localStorage.setItem("session_id", resp.session_id)
    })
}

function init() {
    $("#progress-section").hide();

    var lesson_id = getParam("lesson_id");
    $.get(SERVER+'/courses_api/lesson/read/'+lesson_id,function(response) {
        get_session();
        total_slides = response.flashcards.length;
        $("#progress-section").show();
        $("#progress").html(current_slide+ " out of "+ total_slides)
        var flashcards = response.flashcards;
        console.log(flashcards)
        var i = 0;
        var className="item";
        // XXX refactor code below into smaller processing chunk
        flashcards.forEach((flashcard) => {
            if(i == 0) {
                className = "item active"
            }else{
                className = "item"
            }

            $("#carousel-indicators").append('<li data-target="#myCarousel" data-slide-to="'+i+'" class="active"></li>')
            if(flashcard.lesson_type == "quick_read"){
                $("#prevButton").attr("data-type","quick_read");
                $("#nextButton").attr("data-type","quick_read");
                $("#theSlide").append('<div class="'+className+'"><div alt="quick_read" style="height:500px"><h1>'+flashcard.question+'</h1></div></div>')
            }
            if(flashcard.lesson_type == "title_text"){
                $("#prevButton").attr("data-type","title_text");
                $("#nextButton").attr("data-type","title_text");
                $("#theSlide").append('<div class="'+className+'"><div alt="title_text" style="height:500px"><h1> '+flashcard.question+'</h1><h3>'+flashcard.answer+'</h3></div></div>')

            }
            if(flashcard.lesson_type == "question_choices"){
                $("#prevButton").attr("data-type","question_choices");
                $("#nextButton").attr("data-type","question_choices");
                $("#theSlide").append('<div class="'+className+'" id="flashcard_'+i+'"><div class="question_choices"><h1>'+flashcard.question+'</h1><ul></ul></div></div>')
            if(flashcard.image){
                $("#flashcard_"+i).prepend('<center><img src="'+flashcard.image+'" alt="Chania" style="height:300px;border:5px;border-style:solid;border-color:black"></center>')
            }
            flashcard.options.split(",").forEach(function (valu) { 
                $("#theSlide").find('ul').append("<input type='radio' value='valu' name='choices_'"+i+"> "+valu+"<br>")
            })

            }

            if(flashcard.lesson_type == "iframe_link"){
            $("#theSlide").append('<div class="'+className+'"><div alt="title_text" style="height:500px"><h1> '+flashcard.question+'</h1><iframe src= "'+flashcard.image+'"></iframe></div></div>')
            }


            if(flashcard.lesson_type == "video_file"){
            $("#theSlide").append('<div class="'+className+'"><div alt="title_text" style="height:500px"><h1> '+flashcard.question+'</h1><video controls> <source src= "'+flashcard.image+'"></video></div></div>')
            }
            if(flashcard.lesson_type=="question_text"){
            $("#theSlide").append('<div class="'+className+'"><div class="question_text"><div alt="title_text" style="height:500px"><h1> '+flashcard.question+'</h1><textarea class="form-control" placeholder="Enter you answer here"></textarea></div></div></div>')

            }
            i++;
        })
    })
}

window.addEventListener('DOMContentLoaded', init, false)