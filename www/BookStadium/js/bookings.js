var $bookings = $('#bookings');
$.ajax({
    url: 'http://127.0.0.1:8000/bookingstadium/api/bookings',
    type: 'GET',
    success: function(data) {

        for (var i = 0; i < data.length; i++) {
            var event = data[i];
            $bookings.append('<li>Event name: ' + event.name + '</li><br>')
            $bookings.append('<p>Event date: ' + event.date + '</p>')
            $bookings.append('<p>Event start time: ' + event.start_time + '</p>')
            $bookings.append('<p>Event end_time: ' + event.end_time + '</p>')
            $bookings.append('<p>Event stadium: ' + event.stadium + '</p></br>')
        }

    }

});