(function () {
	'use strict';
	
	//Collection is backed by "localStorage" instead of remote server
	linkApp.Collections.Links = Backbone.Collection.extend({
		model: linkApp.Models.Link,

		// save all links under 'linApp' namespace
		localStorage: new Backbone.LocalStorage('linkApp-backbone'),

		initialize:function(){			
			
		},

		allIncomplete: function(){			
			var filtered = this.localStorage.findAll().filter(function(lnk){				
				return lnk.completed <100;
			});
			return new linkApp.Collections.Links(filtered);
		},

		byTitle:function (filterKey){
			var filtered = this.filter(function(lnk){
				return lnk.get('title').contains(filterKey);
			});
			return new linkApp.Collections.Links(filtered);
		}
	});

})();