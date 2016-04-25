'use strict';

app.config(function ($stateProvider) {

	$stateProvider
		.state('divisions', {
			url: "/divisions?page&sort",
			templateUrl: "entities/division/divisions.html",
			controller: 'DivisionController',
			controllerAs: 'vm',
			params: {
				page: {
					value: '1',
					squash: true
				},
				sort: {
					value: 'name,asc',
					squash: true
				}
			},
			resolve : {
				Data: DivisionsResolve
			}
		})
});

function DivisionsResolve (Division, $q, $stateParams, AlertService) {

	var deferred = $q.defer();
	Division.query(
		{
			page: $stateParams.page - 1,
			sort: $stateParams.sort
		},
		function (data) {
			deferred.resolve(data);
		},
		function (error) {
			AlertService.addError(error.statusText);
			deferred.reject();
		}
	);
	return deferred.promise;
}
