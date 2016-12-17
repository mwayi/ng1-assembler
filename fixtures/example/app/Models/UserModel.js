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

})(app)