'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// StoreDetailController																							  //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.controller('StoreDetailController', function ($stateParams, $scope, Data) {

	$scope.data = Data;

	this.save = save;
	this.reset = reset;

	// save updated store
	function save(form) {
		var store = Data.saveStore();
		if (store.id != null) {
			form.$setPristine();
		}
	}

	// reset form
	function reset(form) {
		Data.getStore($stateParams.id);
		form.$setPristine();
	}

	function onError(error) {
		ToastService.Error(error.data.error);
	}
});
