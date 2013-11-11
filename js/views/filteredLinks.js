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
			var titleKey = $('#filterTitle').val(), 
				newCollection = null;
			
			if(titleKey){
				newCollection = this.getFilteredLinks('title', titleKey);
			}
			else{
				newCollection = this.getAllIncompletedLinks();
			}

			this.resetCollection(newCollection);
		},
		
		filterByArea:function(){
			var areaKey = $('#filterArea').val();
			
			if(areaKey){
				this.applyStringFilter('title', areaKey);
			}
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

		getAllIncompletedLinks:function(){
			return this.collection.localStorage.findAll().filter(function(lnk) {			    
			    return lnk.completed !=100;
			});
		},

		getFilteredLinks:function(filterAttr, filterKey){
			var fKey = filterKey.toLowerCase(), 
				attrVal ='';

			return this.collection.localStorage.findAll().filter(function(lnk) {			    		    
			    attrVal = lnk[filterAttr];
			    return lnk.completed !=100 && attrVal && attrVal.toLowerCase().indexOf(fKey) > -1;
			});
				
		},

		resetCollection:function(newCollection){
			
			// reset current collection silently so the event doesn't trigger			
			this.collection.reset({ silent: true });
						
			// trigger reset again. but this time trigger the event so the collection view is rerendered
			this.collection.reset(newCollection);
			
			this.render();
		},

		clearFilter:function(){
			alert('cleared');
		}
		
	});	
})();