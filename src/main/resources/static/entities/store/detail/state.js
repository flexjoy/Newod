'use strict';

app.config(function ($stateProvider) {

	$stateProvider
		.state('detail', {
			url: "/stores/:id",
			templateUrl: "entities/store/detail/store.html",
			controller: function ($scope, $stateParams, Store) {
				$scope.store = Store.get({ id: $stateParams.id });
			}
		})
});

