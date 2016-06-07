'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ContactsController                                                                                                 //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.controller('ContactsController', function ($stateParams, $scope, Data) {

	// save updated store
	$scope.save = function save() {
		Data.saveStore($scope.contacts, $scope);
	};

	// reset form
	$scope.reset = function reset() {
		Data.getStore($stateParams.id);
		$scope.contacts.$setPristine();
	};
});
