var linkApp = linkApp || {
		Models:{},
		Collections:{},
		Views:{}
	};


(function () {
	'use strict';
	
	//Collection is backed by "localStorage" instead of remote server
	linkApp.Collections.Links = Backbone.Collection.extend({
		model: linkApp.Models.Link,

		// save all links under 'linApp' namespace
		localStorage: new Backbone.LocalStorage('linkApp-backbone'),
	});

})();