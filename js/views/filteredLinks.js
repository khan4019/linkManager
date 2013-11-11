(function () {
	'use strict';
	//when links are filtered
	linkApp.Views.FilteredLinks = Backbone.View.extend({
		
		el:'#divFilter',

		tagName:'li',
		
		template:template('linkTemplate'),

		events:{			
			'keyup #filterTitle': "filterByTitle",
			'keyup #filterArea': "filterByArea",
			'keyup #filterTags': "filterByTags",
			'keyup #filterImportance': "filterByImportance",
			'click #clearFilter':"clearFilter"
		},

		initialize:function(){			
			//this.collection.on("reset", this.render, this);

			//Debounce the keyup
			this.filterByTitle = _.debounce(this.filterByTitle, 400);
			this.filterArea = _.debounce(this.filterArea, 400);
			this.filterByTags = _.debounce(this.filterByTags, 400);
			this.filterByImportance = _.debounce(this.filterByImportance, 400);
			this.clearFilter = _.debounce(this.clearFilter, 400);
		},
		
		render:function(){
			//reset while rendering
			var linkHolder = $('#displayingLinks');
		    linkHolder.html('');
		    
		    var allLinkView = new linkApp.Views.Links({collection: this.collection});
			
			//push to body to display
			linkHolder.html(allLinkView.render().el);
		    return this;
		},
		
		filterByTitle:function(){
			var titleKey = $('#filterTitle').val();

			// reset current collection silently so the event doesn't trigger			
			this.collection.reset({ silent: true });
			
			var filtered = this.collection.localStorage.findAll().filter(function(lnk) {			    		    
			    return lnk.completed !=100 && lnk.title && lnk.title.toLowerCase().indexOf(titleKey) > -1;
			});
			
			// trigger reset again. but this time trigger the event so the collection view is rerendered
			this.collection.reset(filtered);
			
			this.render();
		},
		
		filterByArea:function(areaKey){
			
		},

		filterByTags:function(){
			console.log('Actual filtering by Tags');
		},

		filterByImportance:function(){
			console.log('Actual filtering by Importance');
		},

		filterByMultipleKey:function(){
			console.log('Someday I will implement this');
		},

		addOne:function(link){
			//add one by one other then dumping everyone
			var linkView = new linkApp.Views.Link({model:link});
			$('#displayingLinks').append(linkView.render().el);
		},

		clearFilter:function(){
			alert('cleared');
		}
		
	});	
})();