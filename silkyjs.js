/**
 * @author System Crasher.
 * @version 0.2.0.0.
 */
(function( window, undefined ) {
	// Use the correct document accordingly with window argument (sandbox)
	var document = window.document,
		navigator = window.navigator,
		location = window.location;
	var silkyJsAnother = window.silkyJs; // Map over silkyJs in case of overwrite
	/* Library object. */
	var silkyJs = {
		/* This object contains public information about silkyJs. */
		manifest: {
			name: 'Silky Javascript Framework',
			version: '0.2.0.0'
		},
		/* Initialization function. */
		init: function() {
			// TODO
		},
		/* Helper methods for objects. */
		isEmpty: function(it){
			for(var p in it){
				return false;
			}
			return true;
		},
		isFunction: function(obj){
			var getType = {};
			return obj && getType.toString.call(obj) == '[object Function]';
		},
		isString: function(obj){
			return obj.constructor == 'string';
		},
		isArray: function(obj){ // X-Browser isArray(), including Safari
    		return obj.constructor == Array;
		},
		forEach: function(vector, callback){
			if(vector){
				for(var i = 0; i < vector.length;){
					callback(vector[i++]);
				}
			}
		},
		/* It extends destination object with source properties. */
		extend: function(destination, source) {
			for (var property in source) {
				if (source[property] && source[property].constructor &&
		     		source[property].constructor === Object) {
		      		destination[property] = destination[property] || {};
		      		arguments.callee(destination[property], source[property]);
			    } else {
			   		destination[property] = source[property];
			   	}
		  	}
			return destination;
		},
		/* Method to get a valid instance of silkyJs, even if the library was referenced more than once. */
		noConflict: function() {
			if (window.silkyJs === silkyJs ) {
				window.silkyJs = silkyJsAnother;
			}
			return silkyJs;
		}
	};
	silkyJs.init(); // autoinitialize.
	window.silkyJs = silkyJs; // Expose library to the global object.
	// Expose silkyJs as an AMD module, but only for AMD loaders that
	// understand the issues with loading multiple versions of silkyJs
	// in a page that all might call define(). The loader will indicate
	// they have special allowances for multiple silkyJs versions by
	// specifying define.amd.silkyJs = true. Register as a named module,
	// since silkyJs can be concatenated with other files that may use define,
	// but not use a proper concatenation script that understands anonymous
	// AMD modules. A named AMD is safest and most robust way to register.
	// Lowercase silkyJs is used because AMD module names are derived from
	// file names, and silkyJs is normally delivered in a lowercase file name.
	// Do this after creating the global so that if an AMD module wants to call
	// noConflict to hide this version of silkyJs, it will work.
	if ( typeof define === "function" && define.amd && define.amd.silkyJs ) {
		define( "silkyJs", [], function () { return silkyJs; } );
	}
})(window);