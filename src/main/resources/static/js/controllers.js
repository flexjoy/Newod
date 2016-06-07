'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// NavBarController                                                                                                   //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.controller('NavBarController', function($scope, $translate, $http, ToastService) {

	// set language for backend
	$scope.setLanguage = function (locale) {
		$translate.use(locale);
		$http.get('/locale/' + locale).then(
			function(success) {
				console.log(success.statusText);
			},
			function(error) {
				ToastService.Error(error);
			});
	}
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SidebarController                                                                                                  //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.controller('SidebarController', function($scope, $timeout, Data) {
	
	this.changeCity = changeCity;
	this.refreshCities = refreshCities;
	this.refreshStores = refreshStores;
	$scope.data = Data;
	Data.refreshCities();

	// user change city in select dropdown
	function changeCity() {
		Data.refreshStores();
	}
	
	function refreshCities() {
		$scope.citiesBg = "update";
		$timeout(removeBg, 1);
		Data.refreshCities();
	}

	function refreshStores() {
		$scope.storesBg = "update";
		$timeout(removeBg, 1);
		changeCity();
	}

	function removeBg() {
		$scope.citiesBg = null;
		$scope.storesBg = null;
	}
});
