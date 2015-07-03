//module for associating names with day-of-the-week numbers:
var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function dayName(number) {
	return names[number];
}
console.log(dayName(1));
//The dayName function is part of the module's INTERFACE, but the 'names' variable is not. 
//It would be preferable not to spill 'names' variable into global scope.

//So we write it this way:
var dayName = function() {
	var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	return function(number) {
		return names[number];
	};
}();
console.log(dayName(3));

//Wrapping the function as a statement (instead of an expression) isolates the code from the
//outside world entirely. 
(function() {
	function square(x) { return x * x; }
	var hundred = 100;

	console.log(square(hundred));
})();

//If you want to have 2 functions inside your module, you can't just return the function anymore;
//you need to wrap the two functions in an object.
var weekDay = function() {
	var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	return {
		name: function(number) { return names[number]; },
		number: function(name) { return names.indexOf(name); }
	};
}();
console.log(weekDay.name(weekDay.number("Sunday")));

//For bigger modules, instead of gathering all of the exported values into one object at the end of 
//a function, you can declare an object named 'exports' and add properties to it whenever you are 
//defining something that needs to be exported. 
(function(exports) {
	var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	exports.name = function(number) {
		return names[number];
	};
	exports.number = function(name) {
		return names.indexOf(name);
	};
})(this.weekDay = {});

console.log(weekDay.name(weekDay.number("Saturday")));
//The above module takes an interface (exports) as an argument, allowing code outside of the function to
//create the interface and store it in a variable (weekDay). 'this' is outside of the function, which 
//means it refers to the global variable.



//There are several ways to take data in the form of a string of code, and run it as part of the
//current program. One example is 'eval':
function evalAndReturnX(code) {
	eval(code);
	return x;
}
console.log(evalAndReturnX("var x = 2"));



//A better way is to use the Function constructor:
var plusOne = new Function("n", "return n + 1;");
console.log(plusOne(4));



//A minimal implementation of a 'require' function that, when given a module name, will load that
//module's file (from disk or web) and return the appropriate interface value:
//the function's parameter is  the name of a module file
function require(name) {
	//'code' is a function with 'exports' as argument, and the parsed version of the module file as the function
	var code = new Function('exports', readFile(name));
	//declare exports as an empty object
	var exports = {};
	//run the function 'code' with the argument 'exports'
	code(exports);
	//return exports so that it's available as an interface to the outside world.
	return exports;
}
//First you parse the module named 'weekDay', then you call the 'name' method with number 1 as argument.
console.log(require("weekDay").name(1))


//This is the 'readFile' function supplied by Eloquent JavaScript:
function readFile(name) {
  return readFile.files[name] || "";
}
readFile.files = {
  "weekDay": 'var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];\
exports.name = function(number) { return names[number]; };\
exports.number = function(name) { return names.indexOf(name); };',
  "today": 'exports.dayNumber = function() { return (new Date).getDay(); };'
};

//Since the 'new Function' constructor wraps the module code in a function, we don't have to write a wrapping
//namespace function in the module file itself. And since we make 'exports' an argument to the module funciton,
//the module does not have to declare it. 
var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
exports.name = function(number) {
	return names[number];
};
exports.number = function(name) {
	return names.indexOf(name);
};
//This module is contained in a string in readFile.files above.



//When using this pattern, a module typically starts with a few variable declarations that load the modules it
//depends on. 
var weekDay = require("weekDay");
var today = require("today");
console.log(weekDay.name(today.dayNumber());

//In order to be able to export a value other than the 'exports' object, you can provide modules with 
//another variable, 'module', which has a property 'exports'. This property intially points at the empty
//object created by 'require' but can be overwritten with another value in order to export something else.
//This style of module system is called "CommonJS Modules". It's used in Node.js.
function require(name) {
	//if module has already been loaded, use the stored value of the module
	if (name in require.cache)
		//returns the exports of 'name'
		return require.cache[name];
	//'code' is a function with 'exports' and 'module' arguments, and the parsed file as the function
	var code = new Function("exports, module", readFile(name));
	//initialize 'exports' as an empty object, and module as an object with a property called 'exports' that
	//points to the current 'exports' object.
	var exports = {}, module = {exports: exports};
	//run the module in the parsed file with 'exports' and 'module' arguments.
	code(exports, module);
	//since 'name' was not already in require.cache, make require.cache[name] point to module.exports
	require.cache[name] = module.exports;
	//make the exports available to outside world
	return module.exports;
}
require.cache = Object.create(null);

//The Asynchronous Module Definition module system wraps the module in a function
//so that the dependencies can be loaded in the background, and then calls the function -- initializing 
//the module -- so that it runs once they're loaded. 
//Our trivial program with dependencies would look like this in AMD:

//Arguments are module names
define(["weekDay", "today"], function(weekDay, today) {
	console.log(weekDay.name(today.dayNumber()));
});

//Modules loaded this way MUST ALSO contain a call to 'define'. The value used as their interface is
//whatever was returned by the function passed to 'define'. Here is the 'weekDay' module in AMD style:
define([], function() {
	var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	return {
		//these are the values used as the module's interface
		name: function(number) { return names[number]; },
		number: function(name) { return names.indexOf(name); }
	};
});

//The backgroundReadFile function -- supplied by Eloquent JS -- takes a filename and a function and
//calls the function with the content of the file as soon as it has finished loading it.
function backgroundReadFile(name, c) {
  setTimeout(function() {
    c(backgroundReadFile.files[name] || "");
  }, 200 * Math.random());
}
backgroundReadFile.files = {
  "weekDay": 'define([], function() {\
  var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];\
  return { name: function(number) { return names[number]; }, number: function(name) { return names.indexOf(name); }};\
});',
  "today": 'define([], function() { return {dayNumber: function() { return (new Date).getDay(); }}; });'
};

var exports = {};

//For keeping track of modules while they're being loaded, our implementation of 'define' will use 
//objects that describe the state of modules, telling us whether they are available yet and providing
//their interface when they are.
//The getModule function returns such an object (when given a name) and ensure that the module is scheduled
//to be loaded. 
var defineCache = Object.create(null);
var currentMod = null;

function getModule(name) {
	//use a cache object to avoid loading the same module twice
	if (name in defineCache)
		return defineCache[name];

	var module = {exports: null,
								loaded: false,
								onLoad: []};
	//while the module is loading, it takes the above properties
	defineCache[name] = module;
	//the below function calls some code on the module once it's loaded
	backgroundReadFile(name, function(code) {
		//store the module in the currentMod variable
		currentMod = module;
		//evaluate the code for that module
		new Function("", code)();
	});
	return module;
}

//Here is the declaration of the 'define' function:
function define(depNames, moduleFunction) {
	var myMod = currentMod;
	//get the current module's dependency module objects
	var deps = depNames.map(getModule);
	//if the dependency module has not loaded (loaded: false), push the functions in whenDepsLoaded to 
	//the module's onLoad property.
	deps.forEach(function(mod) {
		if (!mod.loaded) 
			mod.onLoad.push(whenDepsLoaded);
	});

	function whenDepsLoaded() {
		//If not all of the dependency modules are loaded (loaded: true), return (do nothing).
		if (!deps.every(function(m) { return m.loaded; }))
			return;
		//map the exports properties (their interfaces that were returned) to their dependency modules
		var args = deps.map(function(m) { return m.exports; });
		//call the function that holds the module, giving it the dependencies' interfaces as arguments
		var exports = moduleFunction.apply(null, args);
		//if myMod (currentMod) is not null:
		if (myMod) {
			//update the module's properties
			myMod.exports = exports;
			myMod.loaded = true;
			myMod.onLoad.forEach(function(f) { f(); });
		}
	}
	whenDepsLoaded();
}


