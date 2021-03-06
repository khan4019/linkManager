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
			'click .edit' : 'edit',
			'click .archive':'archive',
			'click .delete':'destroy'
		},
		
		add10Percent:function(){
			var mod = this.model, 
				currentLevel = mod.get('completed');
			if(currentLevel <100) mod.set('completed', currentLevel+10);
			mod.save();
			//will increase to hundred and will archive it
			if(currentLevel ==90) this.archive();
		},

		edit:function(){			
			var editHTML = template('editLinkTemplate')(this.model.toJSON());
			$('#editModalBody').html(editHTML);
			$('#editLinkModal').modal('show');
		},
		
		archive:function(){			
			this.remove();			
		},
		
		remove:function(){
			this.model.set('completed', 100);
			this.model.save();
			this.$el.remove();
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