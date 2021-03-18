var $stadiums = $('#stadiums') ;

 $.ajax({
                  url: 'https://api.dreampotential.org/bookingstadium/api/stadium/list',
                  type: 'GET',
                  success: function(data) {
                  
                     for (var i = 0; i < data.length; i++) {
                      var stadium = data[i];
                      $stadiums.append('<l>'+stadium.name+'</l><br>');
                      $stadiums.append('<img src='+stadium.image+' witdh="400" height="300"></>');
                      $stadiums.append('<p>Capacity:'+stadium.capacity+'</p>')
                      $stadiums.append('<p>Country:'+stadium.country+'</p>')
                      $stadiums.append('<p>City:'+stadium.city+'</p>')
                      $stadiums.append('<p>Sport:'+stadium.sports+'</p></br>')
                     }
                     }
                  })
      