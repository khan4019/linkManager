var linkApp = linkApp || {
		Models:{},
		Collections:{},
		Views:{}
	};

(function () {
	'use strict';

	//cache the Template for single item
	window.template = function (id) {
		return _.template($('#'+id).html());
	}

	//View (single)
	linkApp.Views.Link = Backbone.View.extend({
		tagName:'li',
		
		template:template('linkTemplate'),
		
		initialize:function(){
			this.model.on('change', this.render, this);
			this.model.on('destroy', this.remove, this);
		},		
		
		events:{
			'click .add10Percent':'add10Percent',
			'click .archieve':'archieve',
			'click .delete':'destroy'
		},
		
		add10Percent:function(){
			var mod = this.model, 
				currentLevel = mod.get('completed');
			if(currentLevel <100) mod.set('completed', currentLevel+10);
			console.log(mod.get('completed'));
		},
		
		archieve:function(){
			//archieve it
			this.remove();
			console.log('archieved is not implemented. Hence not archieved. but remove. '+this.model.get('title'));
		},
		
		remove:function(){
			this.$el.remove();
			this.model.completed = 100;
		},
		
		destroy:function(){
			this.model.destroy();	
		},
		
		render:function () {		
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});
})();