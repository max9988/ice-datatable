
$(document).ready(function() {

	$.ajax({
	    type: "get", url: "http://192.60.241.81:8080/Persons",
	    dataType: 'json',
	    success: function (data, text) {
	    	console.log("AppData from Server: " + JSON.stringify(data));

            $('#example').DataTable( {
                data: data,
			    columns: [
			        { data: "id" },
			        { data: "firstName" },
			        { data: "lastName" },
			        { data: "defactoId" },
			        { data: "dob" },
			        { data: "riskScore" }
			    ]
	        });
		        
	    },
	    error: function (request, status, error) {
	        alert(request.responseText);
	    }
	});


    
	$('#example tbody').on('click', 'td.details-control', function () {
	    var tr = $(this).closest('tr');
	    var row = table.row( tr );
	 
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
	        .text( 'Loading...' );
	 
	    $.ajax( {
	        url: 'http://192.60.241.81:8080/Persons',
	        data: {
	            name: rowData.name
	        },
	        dataType: 'json',
	        success: function ( json ) {
	            div
	                .html( json.html )
	                .removeClass( 'loading' );
	        }
	    } );
	 
	    return div;
	}

} );
