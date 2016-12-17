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

})(app)