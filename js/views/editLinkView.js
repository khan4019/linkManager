(function () {
	'use strict';
	
	//Add new link
	linkApp.Views.EditLink = Backbone.View.extend({
		el:'#editLink', 
		
		initialize:function(){
			 // _.bindAll(this, 'contentChanged');
    		// this.inputContent = this.$('input.content');
		},
		
		events:{
			'click #updateLink':'submit', 
			'submit':'submit',
			'change input#editLinkTitle':'updateTitlse'
		},
		
		updateTitle:function(){
			alert('title changed');
		},

		submit:function(e){
			alert('kkk');
			e.preventDefault();
			
			var currentTarget = $(e.currentTarget),
				newTitle = currentTarget.find('#newLinkTitle').val(),
				newURL = currentTarget.find('#newLinkURL').val(),
				newArea = currentTarget.find('#newLinkArea').val(),
				newDescription = currentTarget.find('#newLinkDescription').val(),
				newSource = currentTarget.find('#newLinkSource').val(),
				newType = currentTarget.find('#newLinkType').val(),
				newTags = currentTarget.find('#newLinkTags').val(),
				newImportance = currentTarget.find('#newLinkImportance').val(),
				newLink = new linkApp.Models.Link({
					title:newTitle,
					url: newURL,
					area:newArea,
					description: newDescription,					
					source:newSource,
					contentType:newType,
					tags:newTags,
					importance:newImportance
				});

			if(newLink.isValid()){
				this.collection.add(newLink);
				newLink.save();
				$('#addLinkModal').modal('hide');
				$('#btnNewLinkReset').trigger('click');
			}
			else{
				alert('Failed to submit. Please provide valid Title, URL and area.');
			}
		}
	});
})();