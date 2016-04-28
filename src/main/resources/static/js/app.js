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
		'ngToast'
	]
);

app.config(function ($stateProvider, $urlRouterProvider, $translateProvider, ngToastProvider) {

	$stateProvider
		.state('home', {
			url: "/home",
			templateUrl: "partials/home.html"
		});

	$urlRouterProvider.otherwise('/home');

	$translateProvider
		.useStaticFilesLoader({
			prefix: 'i18n/locale-',
			suffix: '.json'
		})
		.preferredLanguage('ru')
		.useSanitizeValueStrategy('escape')
		.useLocalStorage();

	ngToastProvider.configure({
		animation: 'fade',
		verticalPosition: 'bottom'
	});
});
