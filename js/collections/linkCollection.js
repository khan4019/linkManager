var linkApp = linkApp || {
		Models:{},
		Collections:{},
		Views:{}
	};


(function () {
	'use strict';
	//Collection
	linkApp.Collections.Links = Backbone.Collection.extend({
		model: linkApp.Models.Link
	});

})();