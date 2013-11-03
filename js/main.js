var Link = Backbone.Model.extend({
	defaults:{
		title:'John Doe',
		description:'',
		url:'',
		created:new Date(),
		focus:'javascript',
		tags:''
	}
});

var LinkView = Backbone.View.extend({
	tagName:'li',
	template:_.template($('#linkTemplate').html()),
	
	initialize:function () {
		this.render();
	},
	render:function () {		
		this.$el.html(this.template(this.model.toJSON()));
	}
});

var link = new Link();
var linkView = new LinkView({model:link});

