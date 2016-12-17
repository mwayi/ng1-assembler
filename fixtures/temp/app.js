var app = angular.module('app', ['ngRoute']);

(function(app){
	
})();
(function(window, angular) {
	/**
	 * Create a new Http constructor.
	 */
	var Http = function() {};

	var token = null;

	/**
	 * Decorate request.
	 *
	 * @param  {Object} configuration object.
	 * @return {Object}
	 */
	Http.request = function(config) {

		if(typeof config.params !== 'undefined') {
			config.params.token = token;
		}

      	return config;
	}

	app.factory('HttpInterceptor', function(env) {
		token = env.get('api_token');

		return Http;
	});

})(app);
(function(window, angular) {

	/**
	 * Create a new Model constructor.
	 */
	var Model = function() {
		var self = this;
	};

	/**
	 * Get a value from the model.
	 *
	 * @param  {String} key.
	 * @return {String}
	 */
	Model.prototype.get = function(key) {
	
	}

	app.factory('UserModel', function() {
		return Model;
	});

})(app);
(function(window, angular){
	/**
	 * Create a new HomePage constructor.
	 */
	var HomePage = function($scope) {
		var self = this;
	};

	app.controller('HomePage', HomePage);

})(app)

;
(function(window, angular) {

	/**
	 * Create a new BaseResource constructor.
	 */
	var BaseResource = function($http, env) {
		var self = this;

		this.$http = $http;

		this.api_url = env.get('api_v1');
	};

	/**
	 * Get an endpoint.
	 *
	 * @param  {String} endpoint.
	 * @param  {Object} configuration object.
	 * @return {Promise}
	 */
	BaseResource.prototype.get = function(endpoint, config) {
		return this.$http.get(this.api_url + '/' + endpoint, config).then(function(response){
			// Very basic transformation 
			return response.status == 200? response.data: false;
		});
	}

	app.factory('BaseResource', function($http, env) {
		return new BaseResource($http, env);
	});

})(app)