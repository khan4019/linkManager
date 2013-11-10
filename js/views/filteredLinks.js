(function () {
	'use strict';
	//when links are filtered
	linkApp.Views.FilteredLinks = Backbone.View.extend({
		
		el:'#divFilter',

		events:{			
			'keyup #filterTitle': "filterByTitle",
			'keyup #filterArea': "filterByArea",
			'keyup #filterTags': "filterByTags",
			'keyup #filterImportance': "filterByImportance",
			'click #clearFilter':"clearFilter"
		},

		initialize:function(){
			//Debounce the keyup
			this.filterByTitle = _.debounce(this.filterByTitle, 400);
			this.filterArea = _.debounce(this.filterArea, 400);
			this.filterByTags = _.debounce(this.filterByTags, 400);
			this.filterByImportance = _.debounce(this.filterByImportance, 400);
			this.clearFilter = _.debounce(this.clearFilter, 400);
		},

		
		render:function(){
			// this.collection.each(this.addOne, this);
			// return this;
		},
		
		filterByTitle:function(){
			console.log('Actual filtering byTitle');
		},
		
		filterByArea:function(areaKey){
			console.log('Actual filtering by Area');
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

		clearFilter:function(){
			alert('cleared');
		}
		
	});	
})();