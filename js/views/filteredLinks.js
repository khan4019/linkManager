(function () {
	'use strict';
	//when links are filtered
	linkApp.Views.FilteredLinks = Backbone.View.extend({
		
		el:'#divFilterAndAdd',

		tagName:'li',
		
		template:template('linkTemplate'),

		events:{			
			'keyup #filterTitle': "filterByTitle",
			'keyup #filterArea': "filterByArea",
			'keyup #filterTags': "filterByTags",
			'keyup #filterImportance': "filterByImportance",
			'click #clearFilter':"clearFilter",
			'click #swapArchived': 'swapArchivedLinks'
		},

		initialize:function(){			
			
			//Debounce the keyup
			this.filterByTitle = _.debounce(this.filterByTitle, 400);
			this.filterArea = _.debounce(this.filterArea, 400);
			this.filterByTags = _.debounce(this.filterByTags, 400);
			this.filterByImportance = _.debounce(this.filterByImportance, 400);			
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

		swapArchivedLinks:function(){
			var el = document.getElementById('swapArchived'),
				$btn = $(el), 
				textNode = el.lastChild,
				showArchived = $btn.hasClass('showArchived');

			this.freshLoad(showArchived);
			
			//swap button text, icon and class
			$btn.toggleClass('showArchived');			
			$btn.find('.glyphicon').toggleClass('glyphicon-road glyphicon-fire');	        
	        textNode.nodeValue = ' Show ' + (showArchived ? 'Incomplete' : 'Archived');
			
		},

		freshLoad:function(loadArchived){
			var newCollection = null;
			if(loadArchived){
				newCollection = this.getArchivedLinks();
			}
			else{
				newCollection = this.getAllIncompletedLinks();
			}
			
			if(newCollection) this.resetCollection(newCollection);
		},
		
		filterByTitle:function(){
			
			this.filterLinks('title', $('#filterTitle').val());
			
		},
		
		filterByArea:function(){
			this.filterLinks('area', $('#filterArea').val());
		},

		filterByTags:function(){
			this.filterLinks('tags', $('#filterTags').val());
		},

		filterByImportance:function(){
			this.filterLinks('importance', $('#filterImportance').val());
		},

		getFilterCount:function(){
			var counter = 0;

			//used to check multi. hence need to know  1 or 2

			if($('#filterTitle').val()){
				counter++;
			}

			if($('#filterArea').val()){
				counter++;
			}

			if(counter <2 && $('#filterTags').val()){
				counter++;
			}

			if(counter <2 && $('#filterImportance').val()){
				counter++;
			}

			return counter;
		},

		filterByMultipleKey:function(){
			console.log('Someday I will implement this');
		},

		filterLinks:function (filterAttr, filterKey) {
			//TODO: Don't works when filter backwards. As you are backsapcing filtered key
			var newCollection = null, 
				filterCount = this.getFilterCount();
			
			
			if(filterKey || filterCount == 2){
				newCollection = this.getFilteredCurrentLinks(filterAttr, filterKey);
			}
			else if (!filterCount){
				//for no filter we will brand new
				newCollection = this.getAllIncompletedLinks();
			}
			else{
				
			}

			if(newCollection) this.resetCollection(newCollection);
		},

		getAllIncompletedLinks:function(){
			return this.collection.localStorage.findAll().filter(function(lnk) {			    
			    return lnk.completed !=100;
			});
		},

		getArchivedLinks:function(){
			return this.collection.localStorage.findAll().filter(function(lnk) {			    
			    return lnk.completed ==100;
			});
		},

		getFilteredCurrentLinks:function(filterAttr, filterKey){
			var fKey = filterKey.toLowerCase(), 			
				attrVal ='';
			
			return this.collection.filter(function(lnk) {			    		    
			    attrVal = lnk.get(filterAttr);
			    return attrVal && attrVal.toLowerCase().indexOf(fKey) > -1;
			});
		},

		getFilteredIncompletedLinks:function(filterAttr, filterKey){
			var fKey = filterKey.toLowerCase(), 				
				attrVal ='';

			return his.collection.localStorage.findAll().filter(function(lnk) {			    		    
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
			if(this.getFilterCount()){
				$('#filterTitle, #filterArea, #filterTags, #filterImportance').val('');
			this.filterLinks('',''); //Force to reload links	
			}			
		}
		
	});	
})();