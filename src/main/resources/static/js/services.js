'use strict';

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
	this.Error = function (msg) {
		var message = '<span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span> <strong>' +
			$translate('STATUS.error') + ': </strong>' + msg;
		ngToast.create({
			className: 'danger',
			content: message
		});
	};
});

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

app.service('ngTableService', function ($filter, ToastService) {
	var $translate = $filter('translate');

	// return select array for `enabled` entity table field
	this.GetEnabledSelect = function () {
		return [
			{ id: "true", 	title: $translate('ENTITY_FIELD.enabled') },
			{ id: "false", 	title: $translate('TEXT.closed') }
		];
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
				ToastService.Error(error.data.error);
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
