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
        		  	for (var x = 0; x< values[i].length; x++) {
        		  		$stadiums.append('<tr><td>' + values[i][x].name + '</td><td style="color:red">' + keys[i] + '</td><td><img src=' + values[i][x].image + ' class="img-sizing"></td><td>' + values[i][x].capacity + '</td><td>' + values[i][x].city + '</td><td>' + values[i][x].sports + '</td></tr>')
        		  	}
        		  }
        	
              }
          
        
          }

      
          )
  var columns = {
    formCode: 'Form Code',
    formName: 'Form Name',
    fullName: 'Full Name',
    appointmentDate: 'Appointment Date',
    appointmentTime: 'Appointment Time',
    phone: 'Phone',
}
 