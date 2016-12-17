var FileSystem = require('fs');
var WalkSync = require('walk-sync');
var path = require('path');
var glob = require('glob-fs')({ gitignore: true });

/**.
 * A very simple script assembler for angular 1.
 *
 * @author Mwayi Dzanjalimodzi
 *
 * var ngTemplate = new NgScript(['.src/*.js']);
 * ngTemplate.writeToFile(destination);
 *
 * @var {Array} src of files to read from.
 * @var {Array} destination to write to.
 */
var NgScript = function(source, moduleName, dependencies) {
	this.addSources(source);
	this.loadFiles(source);
	this.buildScripts(this.files);
	this.moduleName = moduleName;
	this.dependencies = dependencies
};

/**
 * @var {Array} sources to look for files.
 */
NgScript.prototype.sources = [];

/**
 * @var {Array} file bus.
 */
NgScript.prototype.files = {};

/**
 * @var {Array} the scripts added.
 */
NgScript.prototype.scripts = [];

/**
 * Load files from directories
 *
 * @param  {String|Array} source(s) to read from.
 * @return void
 */
NgScript.prototype.addSources = function(source) {
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
NgScript.prototype.loadFiles = function() {
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
NgScript.prototype.buildScripts = function(files) {
	for(var file in files) {
		this.scripts.push(this.getContents(file));
	}
};

/**
 * Get file contents as json.
 *
 * @param  {fileName} The file path
 * @return {String}   The file contents.
 */
NgScript.prototype.getContents = function(filePath) {
	var fileBuffer = FileSystem.readFileSync(filePath);
	
	return fileBuffer.toString();
};

/**
 * Get the module syntax for the main module.
 *
 * @param  {String} The name of the module.
 * @param  {Array}  A list of dependencies that the module has.
 * @return {String}
 */
NgScript.prototype.getModuleSyntax = function(moduleName, dependencies) {

	if(!Array.isArray(dependencies)) {
		dependencies = []
	}

	var formatted = dependencies.map(function(value){
		return "'" + value + "'";
	});

	return "var " + moduleName + " = angular.module('" + moduleName + "', [" + formatted.join(',') + "]);\n";
};

/**
 * Write to file.
 *
 * @param  {String} The destination of the file to write to.
 * @return void
 */
NgScript.prototype.writeToFile = function(destination) {
	var contents = 
	this.getModuleSyntax(this.moduleName, this.dependencies) + "\n" + 
	this.scripts.join(";\n");
	
	FileSystem.writeFileSync(destination, contents);
};


module.exports = function(source, moduleName, dependencies) {
	return new NgScript(source, moduleName, dependencies);
}

