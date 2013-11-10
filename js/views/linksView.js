(function () {
	'use strict';
	//view for all links
	linkApp.Views.Links = Backbone.View.extend({
		
		tagName:'ul',

		//dont wanna see dot on each link
		className: "list-unstyled",
		
		initialize:function(){
			//when add a new one render it
			this.collection.on('add', this.addOne, this);
		},
		
		render:function(){
			this.collection.each(this.addOne, this);
			return this;
		},
		
		addOne:function(link){
			//create child view and add to the root
			var linkView = new linkApp.Views.Link({model:link});
			this.$el.prepend(linkView.render().el);
		}
	});
})();