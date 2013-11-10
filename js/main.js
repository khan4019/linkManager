(function(){

	//TODO: get data localstorage and upse fetch or something similar
	//Implement database and do fetching from there
	var incompletedLinks = new linkApp.Collections.Links().allIncomplete(); 
	
	//initiate a new view that would be used for creating new link
	var addLinkView = new linkApp.Views.AddLink({collection:incompletedLinks});
	var allLinkView = new linkApp.Views.Links({collection: incompletedLinks});
	
	//push to body to display
	$('.links').append(allLinkView.render().el);


})();

//utility. Validate url. Grabbed from http://stackoverflow.com/questions/4314741/url-regex-validation
function isURLValid(url){
	return /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/.test(url);
}