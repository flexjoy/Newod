'use strict';

var app = angular.module('App',
	[
		'ngResource',
		'ngCookies',
		'ui.router',
		'ui.bootstrap',
		'pascalprecht.translate',
		'angular-loading-bar',
		'ngAnimate',
		'ngSanitize',
		'ngToast',
		'ngTable'
	]
);

app.config(function ($stateProvider, $urlRouterProvider, $translateProvider, ngToastProvider, $httpProvider) {

	// prevent IE and Edge caching GET requests
	$httpProvider.defaults.headers.common.Pragma = 'no-cache';

	// main states from navigation bar
	$stateProvider
		.state('home', {
			url: "/home",
			templateUrl: "partials/home.html"
		});
	$urlRouterProvider.otherwise('/home');

	// $translateProvider initial settings
	$translateProvider
		.useStaticFilesLoader({
			prefix: 'i18n/locale-',
			suffix: '.json'
		})
		.preferredLanguage('ru')
		.useSanitizeValueStrategy('escape')
		.useLocalStorage();

	// ngToastProvider initial settings
	ngToastProvider.configure({
		animation: 'fade',
		verticalPosition: 'bottom',
		dismissButton: true,
		dismissOnClick: false,
		timeout: 5000
	});
});
