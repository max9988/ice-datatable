var iceApp = angular.module('iceApp', []);
var serviceURL = "http://192.60.241.81:8080";

iceApp.controller('iceCtrl', function($scope, $http, $q, $location) {

    //$scope.iceData = [{"id":97781502,"firstName":null,"lastName":null},{"id":97781504,"firstName":null,"lastName":null}];
    //$scope.icePersonData = [{"id":97781502,"firstName":null,"lastName":null},{"id":97781504,"firstName":null,"lastName":null}];
	$scope.init = function(){	
		console.log("Angular HTTP init()....");
		$http.get(serviceURL + "/Persons")
		.then(function success(response) {
			//$scope.iceData = JSON.parse(response.data);
			$scope.iceData = response.data;
			console.log("AppData from Server: " + JSON.stringify(response.data));		
		}, function error(response) {
            $scope.iceData = response.status + " " + response.statusText + " " + response.headers();
        });
	};

	$scope.getPerson = function(){	
		console.log("Angular HTTP getPerson....");
		
        var url = $location.absUrl().split("/").pop();
        var vars = {};
	    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
	        vars[key] = value;
	    });	      

		$http.get(serviceURL + "/Person/" + vars["id"])
		.then(function success(response) {
			//$scope.icePersonData = JSON.parse(response.data);
			//Person table data
			$scope.icePersonData = response.data;
			console.log("AppData from Server: " + JSON.stringify(response.data));
			
				$http.get(serviceURL + "/applications/" + vars["id"])
				.then(function success(response) {
					//application table data
					$scope.iceApplicationData = response.data;
					console.log("iceApplicationData from Server: " + JSON.stringify(response.data));
					
					    //preenroll table data
						//$http.get(serviceURL + "/preenroll/" + vars["id"])
						$http.get(serviceURL + "/preenroll/149132")
						.then(function success(response) {
							$scope.iceEnrollData = response.data;
							console.log("iceEnrollData from Server: " + JSON.stringify(response.data));

                            //image data
							$http.get(serviceURL + "/PersonData/97786504")
							.then(function success(response) {
								$scope.iceImageData = response.data;
								console.log("iceImageData from Server: " + JSON.stringify(response.data));
							}, function error(response) {
					            $scope.iceImageData = response.status + " " + response.statusText + " " + response.headers();
					        });	
						}, function error(response) {
				            $scope.iceEnrollData = response.status + " " + response.statusText + " " + response.headers();
				        });	
					}, function error(response) {
			            $scope.iceApplicationData = response.status + " " + response.statusText + " " + response.headers();
			        });				        	        													
					
		}, function error(response) {
            $scope.icePersonData = response.status + " " + response.statusText + " " + response.headers();
        });
	};
	      
});
