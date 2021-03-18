var $stadiums = $('#stadiums');

$.ajax({
    url: 'https://api.dreampotential.org/bookingstadium/api/stadium/list',
    type: 'GET',
    success: function (data) {

        for (var i = 0; i < data.length; i++) {
            var stadium = data[i];
            $stadiums.append('<tr><td>' + stadium.name + '</td><td><img src=' + stadium.image + ' class="img-sizing"></td><td>' + stadium.capacity + '</td><td>' + stadium.country + '</td><td>' + stadium.city + '</td><td>' + stadium.sports + '</td></tr>')
        }
    }
})
      