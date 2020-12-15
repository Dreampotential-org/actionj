var quick_read_count = 0;
var title_text_count = 0;
var question_choices_count = 0;
var video_file_count = 0;
var iframe_link_count = 0
//var SERVER = "http://localhost:8000";
var SERVER ='https://sfapp-api.dreamstate-4-all.org';

$("#add_form").submit((e) => {
    e.preventDefault()
    data_ = {
    "lesson_name":"test"
    }
    flashcards = [];
    var number =0;
    // Saving Quick Reads
    for(var i = 0; i < quick_read_count; i++){
        quick_read_value = $('textarea[name="speed_read_'+i+'"]').val()
        if(quick_read_value){
            temp = {
                "lesson_type":"quick_read",
                "question":quick_read_value,
                "position":number
            }
            flashcards.push(temp)
            number++
        }
    }

    //Saving Title Text
    for(var i = 0; i < title_text_count; i++){
        var title_value =$('input[name="title_'+i+'"]').val();
        var text_value = $('textarea[name="text_'+i+'"]').val();
        temp= { 
            "lesson_type":"title_text",
            "question" : title_value,
            "answer" : text_value,
            "position":number

        }
        flashcards.push(temp)

        number++;
    }

    for(var i = 0; i < question_choices_count; i++){
        var question = $('input[name="question_'+i+'"]').val()

        var choices_array = $('#choices_'+i+' :input').map(function() {
            var type = $(this).prop("type");

            if(type =="text"){
                return($(this).val())
            }
        })
        
        var choices = choices_array.toArray().join(",")
        var image = $('input[name="image_'+i+'"]').val()
        temp = {
            "lesson_type" :"question_choices",
            "question": question,
            "image":image,
            "options":choices,
            "position":number
        }
        flashcards.push(temp)
        number++;
    }

    for(var i = 0; i < video_file_count; i++){
        var question = $('input[name="question_'+i+'"]').val()
        var video = $('input[name="video_'+i+'"]').val()
        temp = {
            "lesson_type" :"video_file",
            "question": question,
            "image":video,
            "options":choices,
            "position":number
        }
        flashcards.push(temp)
        number++;
    }

    for(var i = 0; i < iframe_link_count; i++){
        var question = $('input[name="question_'+i+'"]').val()
        var link = $('input[name="link_'+i+'"]').val()
        temp = {
            "lesson_type" :"iframe_link",
            "question": question,
            "image":link,
            "options":choices,
            "position":number
        }
        flashcards.push(temp)
        number++;
    }
    data_.flashcards = flashcards
    console.log(data_)
    
    $.ajax({
        "url": SERVER +"courses_api/lesson/create",
        'data': JSON.stringify(data_),
        'type': 'POST',
        'contentType': 'application/json',
        'success': function (data){
            console.log(data.id)
            var currentPathName = window.location.pathname;
            var currentPathNameArray = currentPathName.split("/");
            var currentPathNamePop =currentPathNameArray.pop()
            var currentPathNamePush = currentPathNameArray.push("edit.html")
            var nextPathName =currentPathNameArray.join("/")
            window.location.replace(nextPathName+"?lesson_id="+data.id)    
        alert("FlashCard Created!")
    }
    })
})

function addChoices(id){
    var next_id = $("#choices_"+id).children().last().data("id") + 1
    $("#choices_"+id).append('<div><input type="text" class="form-control" data-id="'+next_id+'"rows="7" placeholder="Choices"><button onclick="$(this).parent().remove()">Remove Choice</button></div>')
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

function addSpeedRead(isNew,id, value) {
    console.log(quick_read_count)
        if(!isNew){
            $("#speed_read").find("textarea").html(value)
            $("#speed_read").find("textarea").attr("data-id",id)
        }else{
            $("#speed_read").find("textarea").html("")
        }
        $("#speed_read").find("textarea").attr("name","speed_read_"+quick_read_count)
        $("#sortable").append($("#speed_read").html())
        quick_read_count++;
    }

function addTitleText(isNew,id,title,text){
    if(!isNew){
        $("#title_text").find("input[type=text]").attr("value",title)
        $("#title_text").find("textarea").html(text)
        $("#title_text").find("input[type=text]").attr("data-id",id)
        $("#title_text").find("textarea").attr("data-id",id)

    }else{
        $("#title_text").find("input[type=text]").attr("value","")
        $("#title_text").find("textarea").html("")
    }
    $("#title_text").find("textarea").attr("name","text_"+title_text_count)
    $("#title_text").find("input[type=text]").attr("name","title_"+title_text_count)

    $("#sortable").append($("#title_text").html())
    title_text_count++;
}

function addQuestionChoices(isNew,id,question,choices,image){

    if(!isNew){
        $("#question_choices").find("input").first().attr("value",question)
        $("#question_choices").find("textarea").html(choices)      
        $("#question_choices").find("input").last().attr("value",image)

        $("#question_choices").find("input").first().attr("data-id",id)
        $("#question_choices").find("textarea").attr("data-id",id)
        $("#question_choices").find("input").last().attr("data-id",id)
        
    }else{
        $("#question_choices").find("input").first().attr("value","")
        $("#question_choices").find("textarea").html("")
        $("#question_choices").find("input").last().attr("value","")
    }

    $("#question_choices").find("input").first().attr("name","question_"+question_choices_count)
    $("#question_choices").find("textarea").attr("name","choices_"+question_choices_count)
    $("#question_choices").find("input").last().attr("name","image_"+question_choices_count)

    $("#sortable").append($("#question_choices").html())
    question_choices_count++;
}

function addVideoFile(isNew,id,question,choices,image){

    if(!isNew){
        $("#video_file").find("input").first().attr("value",question)
        $("#video_file").find("input").last().attr("value",image)

        $("#video_file").find("input").first().attr("data-id",id)
        $("#video_file").find("input").last().attr("data-id",id)
        
    }else{
        $("#video_file").find("input").first().attr("value","")
        $("#video_file").find("input").last().attr("value","")

    }

    $("#video_file").find("input").first().attr("name","question_"+video_file_count)
    $("#video_file").find("input").last().attr("name","video_"+video_file_count)

    $("#sortable").append($("#video_file").html())
    video_file_count++;
    }


function addIframeLink(isNew,id,question,choices,image){

    if(!isNew){
        $("#iframe_link").find("input").first().attr("value",question)
        $("#iframe_link").find("input").last().attr("value",image)

        $("#iframe_link").find("input").first().attr("data-id",id)
        $("#iframe_link").find("input").last().attr("data-id",id)
        
    }else{
        $("#iframe_link").find("input").first().attr("value","")
        $("#iframe_link").find("input").last().attr("value","")

    }

    $("#iframe_link").find("input").first().attr("name","question_"+iframe_link_count)
    $("#iframe_link").find("input").last().attr("name","link_"+iframe_link_count)

    $("#sortable").append($("#iframe_link").html())
    iframe_link_count++;
    }

    var lesson_id=  getParam("lesson_id");

    $.get(SERVER+'/courses_api/lesson/read/'+lesson_id+'/',function(response) {
        $("#lesson_slide").attr("href",SERVER+"/slide.html?lesson_id="+lesson_id)
        var flashcards = response.flashcards;
        flashcards.forEach((flashcard) => {
            console.log(flashcard)

            if(flashcard.lesson_type == "quick_read"){
                
                addSpeedRead(false,flashcard.id,flashcard.question)
            }
            if(flashcard.lesson_type == "title_text"){
                addTitleText(false,flashcard.id,flashcard.question,flashcard.answer)
            }
            if(flashcard.lesson_type == "question_choices"){
                addQuestionChoices(false,flashcard.id,flashcard.question,flashcard.options,flashcard.image)
            }

            if(flashcard.lesson_type == "video_file"){
                addVideoFile(false,flashcard.id,flashcard.question,flashcard.options,flashcard.image)
            }

            if(flashcard.lesson_type == "iframe_link"){
                addIframeLink(false,flashcard.id,flashcard.question,flashcard.options,flashcard.image)
            }

        })
        
    })


$(document).on("click",".remove_flashcard",function(e){
    var lesson_element_type = $(e.target).parent().parent().children().last().children().attr("name")
    console.log(lesson_element_type)
    if(lesson_element_type.startsWith("speed_read")){
        quick_read_count--;
    }else if (lesson_element_type.startsWith("text")){
        title_text_count--;
    }else if (lesson_element_type.startsWith("question")){
        question_choices_count--
    }else if (lesson_element_type.startsWith("link")){
        iframe_link_count--
    }else if (lesson_element_type.startsWith("video")){
        video_file_count--
    }
    console.log(lesson_element_type)
    $(e.target).parent().parent().remove()
});



/*
$.get(SERVER+'/courses_api/lesson/all',function (response) {
    console.log(response.data);
})
*/
$('#add').click(function (e) {

    if ($("#selectsegment").val() == 'speed_read')
    {
        addSpeedRead(true);
    }
    if ($("#selectsegment").val() == 'title_text')
    {
        addTitleText(true)
    }
    if ($("#selectsegment").val() == 'question_choices')
    {                        
        addQuestionChoices(true)

    }
    if ($("#selectsegment").val() == 'video_file')
    {                        
        addVideoFile(true)

    }
    if ($("#selectsegment").val() == 'iframe_link')
    {                        
        addIframeLink(true)

    }
    if ($("#selectsegment").val() == 'select_type')
    {
        alert("Please select a type");
    }
});

$("#edit_form").submit((e) => {
    e.preventDefault()
    data_ = {
    "lesson_name":"test"
    }
    flashcards = [];
    var number =0;
    // Saving Quick Reads
    for(var i = 0; i < quick_read_count; i++){
        quick_read_value = $('textarea[name="speed_read_'+i+'"]').val()
        id = $('textarea[name="speed_read_'+i+'"]').data("id")
        if(quick_read_value){
            temp = {
                "lesson_type":"quick_read",
                "question":quick_read_value,
                "position":number,
                "id":id
            }
            flashcards.push(temp)
            number++
        }
    }

    //Saving Title Text
    for(var i = 0; i < title_text_count; i++){
        var id = $('input[name="title_'+i+'"]').data("id")
        var title_value =$('input[name="title_'+i+'"]').val();
        var text_value = $('textarea[name="text_'+i+'"]').val();
        temp= { 
            "lesson_type":"title_text",
            "question" : title_value,
            "answer" : text_value,
            "position":number,
            "id":id

        }
        flashcards.push(temp)
        number++;
    }

    for(var i = 0; i < question_choices_count; i++){
        var id = $('input[name="question_'+i+'"]').data("id")

        var question = $('input[name="question_'+i+'"]').val()
        var choices=  $('textarea[name="choices_'+i+'"]').val()
        var image=  $('input[name="image_'+i+'"]').val()
        temp = {
            "lesson_type" :"question_choices",
            "question": question,
            "options":choices,
            "image":image,
            "position":number,
            "id":id

        }
        flashcards.push(temp)
        number++;
    }


    for(var i = 0; i < video_file_count; i++){
        var question = $('input[name="question_'+i+'"]').val()
        var video = $('input[name="video_'+i+'"]').val()
        temp = {
            "lesson_type" :"video_file",
            "question": question,
            "image":video,
            "options":choices,
            "position":number
        }
        flashcards.push(temp)
        number++;
    }

    for(var i = 0; i < iframe_link_count; i++){
        var question = $('input[name="question_'+i+'"]').val()
        var link = $('input[name="link_'+i+'"]').val()
        temp = {
            "lesson_type" :"iframe_link",
            "question": question,
            "image":link,
            "options":choices,
            "position":number
        }
        flashcards.push(temp)
        number++;
    }


    data_.flashcards = flashcards
    console.log(data_)


    $.ajax({
        "url": "http://localhost:8000/courses_api/lesson/update/"+lesson_id+"/",
        'data': JSON.stringify(data_),
        'type': 'POST',
        'contentType': 'application/json',
        'success': function (data){
        alert("FlashCard Updated!")
        location.reload()
    }
    })
})