'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ToastService                                                                                                       //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.service('ToastService', function (ngToast, $filter) {

	var $translate = $filter('translate');

	// show message bootstrap `success` class styled
	this.Success = function (msg) {
		var message = '<span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span> <strong>' +
			$translate('STATUS.success') + ': </strong>' + msg;
		ngToast.create({
			className: 'success',
			content: message
		});
	};

	// show message bootstrap `danger` class styled
	this.Error = function (error) {
		var msg = $translate('TEXT.connection refused');

		if (error.data != null) {
			msg = error.statusText;
		}

		var message = '<span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span> <strong>' +
			$translate('STATUS.error') + ': </strong>' + msg;
		ngToast.create({
			className: 'danger',
			content: message
		});
	};
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UtilService                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.service('UtilService', function () {

	// show server side validation errors in the form
	this.SetServerErrors = function (form, errors) {
		var data = [];

		angular.forEach(errors, function(error) {
			form[error.field].$invalid = true;
			if (data[error.field] == null) {
				data[error.field] = [];
			}
			data[error.field].push(error.defaultMessage);
		});

		return data;
	};
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ngTableService                                                                                                     //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.service('ngTableService', function ($filter, ToastService, Division, City) {
	var $translate = $filter('translate');

	// return select array for `enabled` entity table field
	this.GetEnabledSelect = function () {
		return [
			{ id: "true", 	title: $translate('ENTITY_FIELD.enabled') },
			{ id: "false", 	title: $translate('TEXT.closed') }
		];
	};

	// return select array for `division` entity table field
	this.GetDivisionSelect = function () {
		var divisionSelect = [];
		var divisions = Division.getAll(function () {
			divisions.forEach(function (division) {
				var entry = {
					id: 	division.id.toString(),
					title: 	division.name
				};
				divisionSelect.push(entry);
			});
		});
		return divisionSelect;
	};

	// return select array for `city` entity table field
	this.GetCitySelect = function () {
		var citySelect = [];
		var cities = City.getAll(function () {
			cities.forEach(function (city) {
				var entry = {
					id: 	city.id.toString(),
					title: 	city.name
				};
				citySelect.push(entry);
			});
		});
		return citySelect;
	};

	// reload ngTable page
	this.ReloadPage = function (tp) {
		tp.reload().then(
			function(data) {
				if (data.length === 0 && tp.total() > 0) {
					tp.page(tp.page() - 1);
					tp.reload();
				}
			},
			function (error) {
				ToastService.Error(error);
			}
		);
	};

	// convert $state.params from path to ngTable params
	this.StateParamsToParameters = function (stateParams) {
		var result = {};
		var filter = {};
		var params = Object.keys(stateParams);
		params.forEach(function (key) {
			switch (key) {
				case 'page':
					result.page = stateParams.page;
					break;
				case 'size':
					result.count = stateParams.size;
					break;
				case 'sort':
					var sort = stateParams.sort.split(',');
					var sorting = {};
					sorting[sort[0]] = sort[1];
					result.sorting = sorting;
					break;
				default:
					if (stateParams[key]) {
						filter[key] = stateParams[key];
					}
			}
		});
		if (Object.keys(filter).length > 0) {
			result.filter = filter;
		}
		return result;
	};

	// convert ngTable params to $state.params
	this.ParametersToStateParams = function (params) {
		var sortingProp = Object.keys(params.sorting());
		var sort = sortingProp[0] + ',' + params.sorting()[sortingProp[0]];
		var queryParams = {
			page:	params.page() - 1,
			size:	params.count(),
			sort:	sort
		};

		var filterProp = Object.keys(params.filter());
		if (filterProp.length > 0) {
			filterProp.forEach(function (field) {
				queryParams[field] = params.filter()[field];
			})
		}
		return queryParams;
	};
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Data factory                                                                                                       //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.factory('Data', function (City, Store, ToastService, $filter, UtilService) {

	var $translate = $filter('translate');

	var data = {
		cities: [],		// Array:	all cities
		city : 	{},		// Object: 	selected city
		stores: [],		// Array: 	stores in selected city
		store: 	{}		// Object: 	selected store
	};

	data.refreshCities = function () {
		City.getAll(
			function (cities) {
				data.cities = cities;
			}, onError
		);
	};

	data.refreshStores = function () {
		if (data.city == null) {
			data.stores = [];
		} else {
			Store.getAll({ city: data.city.id },
				function (stores) {
					data.stores = stores;
				}, onError
			);
		}
	};

	data.getStore = function (id) {
		Store.get({ id: id},
			function (store) {
				data.store = store;
			}, onError
		);
	};

	data.saveStore = function (form, $scope) {
		Store.update(data.store,
			function () {
				ToastService.Success($translate('TEXT.updated'));
				data.city = data.store.city;
				data.refreshStores();
				form.$setPristine();
			},
			function (error) {
				if (error.data != null && error.data.status == 400) {
					// HTTP status 400 - validation error. We set server side errors to form fields:
					$scope.errors = UtilService.SetServerErrors(form, error.data.errors);
				} else {
					onError(error);
				}
			}
		);
	};

	function onError(error) {
		ToastService.Error(error);
	}

	return data;
});
