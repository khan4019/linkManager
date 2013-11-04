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
			area:'javascript',
			completed:0,
			importance:'',
			tags:''
		},
		validate:function(attrs, options){
			var newLink = this.toJSON();
			
			if(!newLink.title){
				return "Please provide a title";				
			}

			if(!newLink.url || ! isURLValid(newLink.url)){
				return "Please provide a valid URL";
			}

			if(!newLink.area){
				return "Please provide at least one valid area";
			}
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

	//Add new link
	linkApp.Views.AddLink = Backbone.View.extend({
		el:'#addLink', 
		initialize:function(){

		},
		events:{
			'submit':'submit'
		},
		submit:function(e){
			e.preventDefault();

			var currentTarget = $(e.currentTarget),
				newTitle = currentTarget.find('#newLinkTitle').val(),
				newURL = currentTarget.find('#newLinkURL').val(),
				newArea = currentTarget.find('#newLinkArea').val(), 
				newLink = new linkApp.Models.Link({
					title:newTitle,
					url: newURL,
					area:newArea
				});

			if(newLink.isValid()){
				this.collection.add(newLink);

				//clear the input field
				currentTarget.find('#newLinkTitle, #newLinkURL, #newLinkArea').val('');	
			}
			else{
				alert('Title, valid URL and area are required');
			}
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

	var addLinkView = new linkApp.Views.AddLink({collection:linkApp.Collections.Links});
	var allLinkView = new linkApp.Views.Links({collection: linkApp.Collections.Links});
	
	//push to body
	$('.links').append(allLinkView.render().el);

	//utility. Validate url. Grabbed from http://stackoverflow.com/questions/4314741/url-regex-validation
	function isURLValid(url){
		return /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/.test(url);
	}

})();