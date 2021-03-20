 $.ajax({
                  url: 'https://api.dreampotential.org/bookingstadium/api/stadium/list',
                  type: 'GET',
                  success: function(data) {
                  var $stadiums=$('#stadiums')
             	  var grouped = _.groupBy(data, function(stadium) {
  					return stadium.country;
	     			})
             	  var keys=Object.getOwnPropertyNames(grouped);
             	  var values=Object.values(grouped);
        		  for(var i=0;i<keys.length;i++) {
        		  	$stadiums.append('<li style="color:red">'+keys[i]+'</li>')
        		  	for (var x = 0; x< values[i].length; x++) {
        		  		$stadiums.append('<br><p>'+values[i][x].name+'</p>')
        		  		$stadiums.append('<img src='+values[i][x].image+' witdh="400" height="300"></>');
        		  		$stadiums.append('<p>Capacity:'+values[i][x].capacity+'</p>')
                      	$stadiums.append('<p>City:'+values[i][x].city+'</p>')
                      	$stadiums.append('<p>Sport:'+values[i][x].sports+'</p></br>')
        		  	}
        		  }
        	
              }
          
        
          }

      
          )
 