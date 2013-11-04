(function(){

	window.linkApp = {
		Models:{},
		Collections:{},
		Views:{}
	};

	//Template
	window.template = function (id) {
		return _.template($('#'+id).html());
	}

	//Model
	linkApp.Models.Link = Backbone.Model.extend({
		defaults:{
			title:'',
			description:'',
			url:'',
			source:'',
			created:new Date(),
			contentType:'',
			focus:'javascript',
			completed:0,
			importance:'',
			tags:''
		}
	});

	//Collection
	linkApp.Collections.Links = Backbone.Collection.extend({
		model: linkApp.Models.Link
	});

	//view for all links
	linkApp.Views.Links = Backbone.View.extend({
		tagName:'ul',
		initialize:function(){
			console.log(this.collection);
		},
		render:function(){
			this.collection.each(this.addOne, this);
			return this;
		},
		addOne:function(link){
			//create child view and add to the root
			var linkView = new linkApp.Views.Link({model:link});
			this.$el.append(linkView.render().el);
		}
	});

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
		},
		destroy:function(){
			this.model.destroy();	
		},
		render:function () {		
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});


	linkApp.Collections.Links = new linkApp.Collections.Links([
		{
			title:'MDN with', 
			description:'use of with for presentation', 
			url:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/with",
			tags:'JavaScript'
		},
		{
			title:'MDN eval', 
			description:'use of with for presentation', 
			url:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/with",
			tags:'JavaScript'
		},
		{
			title:'git hub', 
			description:'use of with for presentation', 
			url:"https://github.com/khan4019?tab=repositories",
			tags:'JavaScript'
		}
	]);

	var allLinkView = new linkApp.Views.Links({collection: linkApp.Collections.Links});
	
	//push to body
	$('.links').append(allLinkView.render().el);

})();