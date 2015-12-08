(function(){
	'use strict';
	//create angular module for auth service
	angular.module('authService', [])
	//create a function to export for your service
		.factory('Auth', auth)
		.factory('AuthToken', authToken)
		.factory('AuthInterceptor', authInterceptor)
		
		//every http request has a success callback available ; $q object handles promises
		function auth($http, $q, authToken){
			var authFactory = {}
			
			authFactory.login = function(username, password){
				return $http.post('api/authenticate', {
					username: username,
					password: password
				})
				.success(function(data){
					authToken.setToken(data.token)
					return data
				})
			}
			
			authFactory.logout = function(){
				authToken.setToken()
			}
			
			authFactory.isLoggedIn = function(){
				if(authToken.gettoken()){
					return true
				} else {
					return false
				}
			}
			
			authFactory.getUser = function(){
				if(authToken.getToken()){
					return $http.get('api/me')
				} else {
					return $q.reject({message: 'User has no token'})
				}
			}
			
			return authFactory
		}
		
		function authInterceptor($q, authtoken ){
			var authIntercept = {}
			
			authIntercept.request = function(config){
				var token = authToken.getToken()
				
				if(token){
					config.headers['x-access-token'] = token			
				}
				return config	
			}
			
			authIntercept.responseError = function(response){
				if(response.status == 403){
					$location.path('/login')
					return $q.reject(response)
				}	
			}
			return authIntercept
		}
		
		//
		function authToken($window){
			var authTokenFactory = {}
			
			//get the token out of local storage
			authTokenFactory.getToken = function(){
				return $window.localStorage.setItem('token')
			}
			authTokenFactory.setToken = function(token){
				if(token)
					$window.localStorage.setItem('token',token)
				else
					$window.localStorage.removeItem('token')
			}
			
			return authTokenFactory
		}
}());