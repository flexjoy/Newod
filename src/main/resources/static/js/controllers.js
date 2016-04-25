'use strict';

app.controller('NavBarController', function($scope, $location) {
	
	$scope.isActive = function (viewLocation) {
		return viewLocation === $location.path();
	};
});

app.controller('AlertController', function($scope, AlertService) {

	$scope.alerts = AlertService.getAlerts();

	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};
});
