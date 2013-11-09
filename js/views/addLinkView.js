var linkApp = linkApp || {
		Models:{},
		Collections:{},
		Views:{}
	};

(function () {
	'use strict';
	
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
})();