angular.module('userApp', ['ngAnimate', 'app.routes', 'mainCtrl', 'userCtrl', 'userService','authService'])

// application configuration to integrate token into requests
.config(function($httpProvider) {

	// attach our auth interceptor to the http requests
	//interceptors is a method available to $httpProvider
	$httpProvider.interceptors.push('AuthInterceptor')

});
