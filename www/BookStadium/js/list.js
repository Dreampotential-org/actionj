var $stadiums = $('#stadiums') ;

 $.ajax({
                  url: 'https://api.dreampotential.org/bookingstadium/api/stadium/list',
                  type: 'GET',
                  success: function(data) {

                     $.each(data,function(i,stadium){
                      $stadiums.append('<li>'+stadium.name+'</li>');
                      $stadiums.append('<img src='+stadium.image+' witdh="400" height="300"></>');
                      $stadiums.append('<p>capacity:'+stadium.capacity+'</p>')
                     })
                  }
      });