$(document).ready(function() {

	$.ajax({
	    type: "get", url: "http://192.60.241.81:8080/Persons",
	    dataType: 'json',
	    success: function (data, text) {
	    	console.log("AppData from Server: " + JSON.stringify(data));

            $('#example').DataTable( {
                data: data,
			    columns: [
						{
		            className:      'details-control',
		            orderable:      false,
		            data:           null,
		            defaultContent: ''
		        },
			        { data: "id" },
			        { data: "firstName" },
			        { data: "lastName" },
			        { data: "defactoId" },
			        { data: "dob" },
			        { data: "riskScore" }
			    ],
					"order": [[1, 'asc']]
	        });

	    },
	    error: function (request, status, error) {
	        alert(request.responseText);
	    }
	});

  var detailRows = [];

	$('#example tbody').on('click', 'td.details-control', function () {
	    var tr = $(this).closest('tr');
	    var row = $('#example').DataTable().row( tr );

	    if ( row.child.isShown() ) {
	        row.child.hide();
	        tr.removeClass('shown');
	    }
	    else {
	        row.child( format(row.data()) ).show();
	        tr.addClass('shown');
	    }
	} );


	function format ( rowData ) {

        console.log("AppData KK from Server: " + JSON.stringify(rowData));

	    var div = $('<div/>')
	        .addClass( 'loading' )
	        .text( 'Loading' );

			$.ajax({
			    type: "get", url: "http://192.60.241.81:8080/DashboardDetail/" + rowData.defactoId,
			    dataType: 'json',
			    success: function (data, text) {
			    	console.log("AppData from Server: " + JSON.stringify(data));

				    var str = '';
				    for (var i = 0; i < data.length; i++) {
				        str += 'ID=' + data[i].id + ' First Name=' + data[i].firstName + ' Last Name=' + data[i].lastName;
                    }

                    div.addClass( 'loading' ).text(str);
                    
			    },
			    error: function (request, status, error) {
			        alert('data issue');
			    }
			});

	    return div;
	}

} );
