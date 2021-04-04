var $bookings = $('#bookings');
$.ajax({
    url: 'https://api.dreampotential.org/bookingstadium/api/bookings',
    type: 'GET',
    success: function(data) {

        for (var i = 0; i < data.length; i++) {
            var event = data[i];
            $bookings.append('<tr><td>' + event.name + '</td><td>'+ event.date +'</td><td>'+ event.start_time +'</td><td>'+ event.end_time +'</td><td>'+ event.stadium +'</td></tr>')   
        }

    }

});