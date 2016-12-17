'use strict';

new NgTemplate([
    './fixtures/example/app/**Page.html', 
    './fixtures/example/app/**.tpl.html', 
    './fixtures/example/app/**Directive.html'
])
.writeToFile('./fixtures/temp/templates.js');

new NgScript(
	['./fixtures/example/app/**/**.js', './fixtures/example/app/**.js'], 
	'app', 
	['ngRoute']
)
.writeToFile('./fixtures/temp/app.js');
