(function () {
	'use strict';

	linkApp.Routers.LinkRoutes = Backbone.Router.extend({
		routes:{
			'':'index',
			'archieved':'archieved',
			'area':'byArea',
			'area/:areaKey':'filterByArea',
			'importance':'byImportance',
			'importance/:importanceKey':'filterByImportance',
			'tags':'byTags',
			'tags/:tagkey':'filterByTag',
			'*other':'default'
		},
		index:function(){
			console.log('hi there');
		},

		archieved:function(){
			vent.trigger('links:archieved');
		},
		
		byArea:function(){			
			linkAppEvents.trigger('linksByArea');
		},
		filterByArea:function(areaKey){
			linkAppEvents.trigger('filterByArea', areaKey);			
		},
		
		byImportance:function(){
			console.log('ordered by importance');
		},
		filterByImportance:function(importanceKey){
			console.log('Filter by importance: '+importanceKey);	
		},
		
		byTags:function(){
			console.log('Ordered by Tags')
		},
		filterByTag:function(tagkey){
			console.log('Filtered by Tag: '+tagkey);
		},

		default:function(){
			console.log('this doesnt exists');
		}
	});

	new linkApp.Routers.LinkRoutes;
	//backbone uses # style routing. Express urses slash style. ()
	//TODO: Its not done. have to do crappy stuff http://backbonejs.org/#Router-navigate 
	// use pushState Backbone.history.start({pushState: true});
	Backbone.history.start();
})();