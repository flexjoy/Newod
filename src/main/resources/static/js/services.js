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
