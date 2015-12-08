
//injecting ngRoute into app
angular.module('app.routes', ['ngRoute'])

//injecting routeProvider and locationProvider to handle routes
.config(function($routeProvider, $locationProvider) {

	$routeProvider

		// route for the home page
		.when('/', {
			templateUrl : 'app/views/pages/home.html'
		})

		// login page
		//controller to use for this template
		.when('/login', {
			templateUrl : 'app/views/pages/login.html',
   			controller  : 'mainController',
    		controllerAs: 'login'
		})

		// show all users


		// form to create a new user
		// same view as edit page


		// page to edit a user


	$locationProvider.html5Mode(true);

});
