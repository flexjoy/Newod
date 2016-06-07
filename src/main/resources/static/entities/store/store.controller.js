'use strict';

app.controller('StoreController', function ($scope, City, Store, ToastService, $uibModal, ngTableParams,
										   ngTableService, $state, initParams) {
	var vm = this;
	vm.enabled_select = ngTableService.GetEnabledSelect();
	vm.city_select = ngTableService.GetCitySelect();
	vm.toggleFilter = toggleFilter;
	vm.delete = del;
	vm.action = action;

	// show filter row if filter parameters are present
	if (initParams.filter) {
		$scope.showFilter = true;
	}

	vm.tp = new ngTableParams( initParams, {
		counts: [10,15,25,50],
		filterOptions: { filterDelay: 100 },
		getData: function(params) {

			// clear $state.params
			var stateParams = Object.keys($state.params);
			stateParams.forEach(function (key) {
				$state.params[key] = undefined;
			});

			//convert ngTable params to $state.params
			$state.params = angular.extend($state.params, ngTableService.ParametersToStateParams(params));

			return Store.get($state.params).$promise.then(
				function(data) {
					params.total(data.totalElements);
					vm.firstRow = (params.page() - 1) * params.count() + 1;
					$state.params.page++;
					$state.go('.', $state.params, { notify: false });
					return data.content;
				},
				function (error) {
					ToastService.Error(error);
				}
			);
		}
	});

	// clear filter if user off the filter and filter value is not empty
	function toggleFilter () {
		var filterProp = Object.keys(vm.tp.filter());
		if (!$scope.showFilter && filterProp.length > 0) {
			vm.tp.filter({});
		}
	}

	// delete entity dialog
	function del (entity) {
		$uibModal.open({
				templateUrl: 'partials/delete-dialog.html',
				controller: 'StoreDeleteController',
				controllerAs: 'vm',
				size: 'md',
				resolve: { store: entity	}
			})
			.result.then(
			function () {
				ngTableService.ReloadPage(vm.tp);
			}
		);
	}

	// add or update entity dialog
	function action (entity) {
		$uibModal.open({
				templateUrl: 'entities/store/action-dialog.html',
				controller: 'StoreActionController',
				controllerAs: 'vm',
				size: 'md',
				resolve: {
					store: entity,
					cities: City.getAll().$promise
				}
			})
			.result.then(
			function () {
				ngTableService.ReloadPage(vm.tp);
			}
		);
	}
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.controller('StoreDeleteController', function ($scope, $uibModalInstance, store, Store, ToastService, $filter) {

	var vm = this;
	var $translate = $filter('translate');
	vm.entityLabel = store.name;
	vm.delete = del;
	vm.cancel = cancel;

	// delete city
	function del() {
		Store.delete({id: store.id}, onSuccess, onError);

		function onSuccess() {
			ToastService.Success($translate('TEXT.deleted'));
			$uibModalInstance.close();
		}

		function onError(error) {
			ToastService.Error(error);
		}
	}

	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.controller('StoreActionController', function ($scope, $uibModalInstance, store, cities, Store, ToastService,
												  UtilService, $filter) {
	var vm = this;
	var $translate = $filter('translate');
	vm.cities = cities;

	// if store is null - this is add operation
	if (!store) {
		vm.store = {enabled: true, city: vm.cities[0]};
		vm.concreteAction = add;
		vm.successMessage = $translate('TEXT.added');
		vm.actionLabel = $translate('ACTION.add');
	} else {
		vm.store = angular.copy(store);
		vm.concreteAction = update;
		vm.successMessage = $translate('TEXT.updated');
		vm.actionLabel = $translate('ACTION.update');
	}

	vm.action = action;
	vm.cancel = cancel;

	function add() {
		Store.save(vm.store, onSuccess, onError);
	}

	function update() {
		Store.update({ id: vm.store.id }, vm.store, onSuccess, onError);
	}

	function onSuccess() {
		ToastService.Success(vm.successMessage);
		$uibModalInstance.close();
	}

	function onError(error) {
		if (error.data.status == 400) {
			// HTTP status 400 - validation error. We set server side errors to form fields:
			$scope.errors = UtilService.SetServerErrors($scope.updateForm, error.data.errors);
		} else {
			ToastService.Error(error);
		}
	}

	function action() {
		vm.concreteAction();
	}

	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}
});
