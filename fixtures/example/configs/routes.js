(function(window, angular){

	app.config(['$routeProvider', function($routeProvider) {

		// As a convention, anything suffixed with Page, is
		// inherently a controller with a route and view.
		// This prevents your standard controllers being mixed
		// with endpoints.  
		$routeProvider.when('/', {
			templateUrl:'HomePage', 
			controller:'HomePage',  
			title:'Home'
		});

		$routeProvider.otherwise({redirectTo:'/'});
	}]);

})(app)


