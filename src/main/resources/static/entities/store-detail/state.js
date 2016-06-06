'use strict';

app.config(function ($stateProvider) {

	$stateProvider
		.state('store-detail', {
			url: '/stores/:id',
			templateUrl: 'entities/store-detail/store.html',
			onEnter: function ($stateParams, Data) {
				Data.getStore($stateParams.id);
				Data.refreshCities();
			},
			controller: function ($scope, Data) {
				$scope.data = Data;
			} 
		})
		.state('store-detail.contacts', {
			url: '/contacts',
			templateUrl: 'entities/store-detail/partials/contacts.html',
			controller: 'ContactsController',
			controllerAs: 'vm'
		})
		.state('store-detail.files', {
			url: '/files'
		})
		.state('store-detail.connections', {
			url: '/connections'
		})
		.state('store-detail.equipment', {
			url: '/equipment'
		})
});

