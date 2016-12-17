var FileSystem = require('fs');
var WalkSync = require('walk-sync');
var path = require('path');
var glob = require('glob-fs')({ gitignore: true });

/**.
 * A very simple template assembler for angular 1.
 *
 * @author Mwayi Dzanjalimodzi
 *
 * var ngTemplate = new NgTemplate(['.src/*.html']);
 * ngTemplate.writeToFile(destination);
 *
 * @var {Array} src of files to read from.
 * @var {Array} destination to write to.
 */
var NgTemplate = function(source, moduleName) {
	this.addSources(source);
	this.loadFiles(source);
	this.buildTemplates(this.files);
	this.moduleName  = moduleName || 'app';
};

/**
 * @var {Array} sources to look for files.
 */
NgTemplate.prototype.sources = [];

/**
 * @var {Array} file bus.
 */
NgTemplate.prototype.files = {};

/**
 * @var {Array} sources to look for files.
 */
NgTemplate.prototype.templates = [];

/**
 * Load files from directories
 *
 * @param  {String|Array} source(s) to read from.
 * @return void
 */
NgTemplate.prototype.addSources = function(source) {
	if(typeof source == 'string') {
		this.sources.push(source);
	}

	if(Array.isArray(source)) {
		this.sources = this.sources.concat(source);
	}
}


/**
 * Load files from directories.
 *
 * @param  {String|Array} source(s) to read from.
 * @return void
 */
NgTemplate.prototype.loadFiles = function() {
	for(var i in this.sources) {
		var files = glob.readdirSync(this.sources[i]);
		for(var j in files) {
			this.files[files[j]] = 1;
		}
	}
}

/**
 * Build Ng Templates from files.
 *
 * @param  {Array} array of files to render as templates.
 * @return {String} of templates.
 */
NgTemplate.prototype.buildTemplates = function(files) {
	for(var file in files) {
		var template = this.getSyntax(
			path.parse(file).name,
			this.getContents(file)
		);
		this.templates.push(template);
	}
};

/**
 * Get file contents as json.
 *
 * @param  {fileName} The file path
 * @return {String}   The file contents.
 */
NgTemplate.prototype.getContents = function(filePath) {

	var fileBuffer = FileSystem.readFileSync(filePath);
	
	return fileBuffer.toString();
};

/**
 * Get the template syntax.
 *
 * @param  {String} The name of the cached template.
 * @param  {String} The content string which is JSON stringified.
 * @return {String}
 */
NgTemplate.prototype.getSyntax = function(name, content) {
	return "\n 	$templateCache.put('" + name + "'," + JSON.stringify(content) + ");";
};

/**
 * Get module syntax.
 *
 * @param  {String} The name of the module.
 * @param  {String} The content of the module.
 * @return {String}
 */
NgTemplate.prototype.getModuleSyntax = function(moduleName, content) {
	return "angular.module('" 
	+ moduleName 
	+ "').run(['$templateCache', function($templateCache) {" 
	+ content + "\n}]);";
};

/**
 * Write to file.
 *
 * @param  {String} The destination of the file to write to.
 * @return void
 */
NgTemplate.prototype.writeToFile = function(destination) {
	FileSystem.writeFileSync(
		destination, 
		this.getModuleSyntax(
			this.moduleName, 
			this.templates.join("\n")
		)
	);
};

module.exports = function(source, moduleName) {
	return new NgTemplate(source, moduleName);
}

