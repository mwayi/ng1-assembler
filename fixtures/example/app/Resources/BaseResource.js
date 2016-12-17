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