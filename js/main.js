(function(){

	window.linkApp =  linkApp || {
		Models:{},
		Collections:{},
		Views:{}
	};

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

				//clear the input field. hide the form and show the add link button
				currentTarget.find('#newLinkTitle, #newLinkURL, #newLinkArea').val('');
				$('#addLink, #btnShowAdd').toggleClass('hide');
			}
			else{
				alert('Title, valid URL and area are required');
			}
		}
	});

	//temp data for development
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
			title:'MDN null', 
			description:'use of with for presentation', 
			url:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null",
			tags:'JavaScript'
		}
	]);

	//initiate a new view that would be used for creating new link
	var addLinkView = new linkApp.Views.AddLink({collection:linkApp.Collections.Links});
	var allLinkView = new linkApp.Views.Links({collection: linkApp.Collections.Links});
	
	//push to body to display
	$('.links').append(allLinkView.render().el);


})();

//utility. Validate url. Grabbed from http://stackoverflow.com/questions/4314741/url-regex-validation
function isURLValid(url){
	return /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/.test(url);
}