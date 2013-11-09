var linkApp = linkApp || {
		Models:{},
		Collections:{},
		Views:{}
	};

(function () {
	
	linkApp.Models.Link = Backbone.Model.extend({
		//set deafult parameters
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
		//Validate title, url and area
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
})();