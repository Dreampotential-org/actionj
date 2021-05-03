// var SERVER ='https://sfapp-api.dreamstate-4-all.org'
// var SERVER = "http://localhost:8000";

function tableSession() {
    $.get(SERVER + '/courses_api/session/event/', function (response) {
        console.log(response);
        $("#tableSession").append('<tr><td>' + response.user_session + '</td><td>' + 
            response.user_session.name + '</td><td>' + response.start_time + '</td><td>' + 
            response.end_time + '</td><td>' + response.view_duration + '</td><tr>')
    })
}