//Model
var Link = Backbone.Model.extend({
	defaults:{
		title:'MDN eval',
		description:'',
		url:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval",
		created:new Date(),
		focus:'javascript',
		notRead:'',
		levelOfImportance:'',
		tags:'JavaScript'
	}
});

//Collection
var LinkCollection = Backbone.Collection.extend({
	model:Link
});

//view for all link

var AllLinkView = Backbone.View.extend({
	tagName:'ul',
	initialize:function(){
		console.log(this.collection);
	},
	render:function(){
		this.collection.each(function(link){
			var linkView = new LinkView({model:link});
			this.$el.append(linkView.render().el);
		}, this);

		return this;
	}
});

//View
var LinkView = Backbone.View.extend({
	tagName:'li',
	template:_.template($('#linkTemplate').html()),
	
	render:function () {		
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});


var linkCollection = new LinkCollection([
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

var allLinkView = new AllLinkView({collection: linkCollection});

//Temporary
$(document.body).append(allLinkView.render().el);