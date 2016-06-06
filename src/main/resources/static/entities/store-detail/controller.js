'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ContactsController																								  //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.controller('ContactsController', function ($stateParams, $scope, Data) {

	// save updated store
	$scope.save = function save() {
		var store = Data.saveStore();
		if (store.id != null) {
			$scope.contacts.$setPristine();
		}
	};

	// reset form
	$scope.reset = function reset() {
		Data.getStore($stateParams.id);
		$scope.contacts.$setPristine();
	};
});
