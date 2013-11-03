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
	initialize:function () {
		this.render();
	},
	render:function () {
		
	}
});

var link = new Link();
var linkView = new LinkView();