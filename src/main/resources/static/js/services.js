'use strict';

app.service('ToastService', function (ngToast, $filter) {
	var $translate = $filter('translate');

	this.Success = function (msg) {
		var message = '<strong>' + $translate('STATUS.success') + ': </strong>' + msg;
		ngToast.create({
			className: 'success',
			content: message
		});
	};

	this.Error = function (msg) {
		var message = '<strong>' + $translate('STATUS.error') + ': </strong>' + msg;
		ngToast.create({
			className: 'danger',
			content: message
		});
	};
});

app.service('UtilService', function () {
	
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
