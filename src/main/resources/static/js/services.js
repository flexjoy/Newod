'use strict';

app.service('AlertService', function () {
	var alerts = [];

	this.getAlerts = function () {
		return alerts;
	}

	this.addSuccess = function (message) {
		var alert = {
			type: 'success',
			msg: message
		}
		alerts.push(alert);
	}

	this.addError = function (message) {
		var alert = {
			type: 'danger',
			msg: message
		}
		alerts.push(alert);
	}
});
