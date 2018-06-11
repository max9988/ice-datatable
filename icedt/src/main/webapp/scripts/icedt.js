
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
	    var div = $('<div/>')
	        .addClass( 'loading' )
	        .text( 'Test' );

					$.ajax({
					    type: "get", url: "http://192.60.241.81:8080/Person/1915163",
					    dataType: 'json',
					    success: function (data, text) {
					    	console.log("AppData from Server: " + JSON.stringify(data));
                div.addClass( 'loading' ).text('id=' + data.id + 'firstName=' + data.firstName);
					    },
					    error: function (request, status, error) {
					        alert('data issue');
					    }
					});

	    return div;
	}

} );
