var iframeId, iid, handleSetupResponse;
var spongeapi = spongeapi || {};
spongeapi.initComplete = false;

spongeapi.init = function(type,initObj,isDynamic,onReady){
	//console.log('API.init('+type+')');
	/*
	DEFAULT PARAMS:
		type:'custom',
		initObj:{},
		isDynamic:false,
		onReady:undefined

	CANVAS DYNAMIC PARAMS:
		type:'canvas',
		initObj:loader,
		isDynamic:true,
		onReady:undefined

	GOOGLE WEB DESIGNER DYNAMIC PARAMS:
		type:'gwd',
		initObj:gwdAd,
		isDynamic:true,
		onReady:undefined
	*/
	iid = window.location.search.slice(1);
	window.spongecell = window.spongecell || {};
	spongeapi.type = type;
	spongeapi.initObj = initObj;
	spongeapi.isDynamic = isDynamic;
	spongeapi.onReady = onReady;
	parent.postMessage(JSON.stringify({
	  type: 'api',
	  topic: 'setup',
	  iid: iid,
	  callback: 'handleSetupResponse'
	}), '*');

};


spongeapi.openScreen = function(screenName){
	//console.log('API::openScreen('+screenName+')');
	parent.postMessage(JSON.stringify({
	  iid: iid,
	  topic: 'nav',
	  type: 'api',
	  screen: screenName
	}), '*');
};

spongeapi.openLanding = function(landingPage){
	//console.log('API::openLanding('+landingPage+')');
	parent.postMessage(JSON.stringify({
	    iid: iid,
	    topic: 'nav',
	    type: 'api',
	    landingPage: spongecell.apiData.landingPages[landingPage]
	  }), '*');
};

spongeapi.getDynamicText = function(prop){
	//console.log('API::getDynamicText('+prop+')');
	return spongecell.apiData.properties[prop].text;
};

spongeapi.getDynamicImage = function(prop){
	//console.log('API::getDynamicImage('+prop+')');
	return spongecell.apiData.assets[prop].src;
};

spongeapi.parseDynamicCanvasImages = function()
{
	//console.log('API::parseDynamicCanvas()');
	// PARSE THE FLASH LIBRARY FOR DYNAMIC IMAGES

	/* INSTRUCTIONS:
	Simply rename bitmaps in the Flash library 
	to match dynamic item text properties.

	Apply by passing "true" to the "isDynamic"
	parameter in spongeapi.init
	*/
	var libImg;
	for(var i=0; libImg = lib.properties.manifest[i]; i++)
	{

		if(spongecell.apiData.assets.hasOwnProperty(libImg.id)){
			libImg.src = spongeapi.getDynamicImage(libImg.id);
		}
	}
}
spongeapi.parseDynamicCanvasText = function()
{
	//console.log('API::parseDynamicCanvasText()');
	// PARSE THE FLASH LIBRARY FOR DYNAMIC TEXT

	/* INSTRUCTIONS:

	Place spongeapi.parseDynamicCanvasText() in 
	handleComplete function, before stage.update();
	
	/*** MANUAL TARGETING
	Problem: 
	You have a textfield named "ctaTxt" inside 
	a movieclip named "ctaMC", and a dynamic text
	item property named "dynamic_cta_txt".
	
	Solution:
	Add the following line in handleComplete 
	function, before stage.update():

	exportRoot.ctaMC.ctaTxt.text = spongeapi.getDynamicText("dynamic_cta_txt");

	/*** AUTO PARSING 
	The loop below will automatically parse any 
	movieclip instances on the main timeline 
	whose name matches a dynamic text item property.

	These movieclip instances must contain a 
	text instance named "txt".

	*/

	for (var property in spongecell.apiData.properties) {
    	if(exportRoot[property]){
    		exportRoot[property].txt.text = spongeapi.getDynamicText(property);
    	}
    }


}

spongeapi.parseDynamicClasses = function()
{
	//console.log('API::parseDynamicClasses()');
	/*

	UPDATE TEXT & IMAGES WITH DYNAMIC ASSETS & PROPERTIES
	MATCHING CLASS NAMES TO SIGNAL PROCESSOR PROPERTIES

	*/
	var el;
	

	for (var property in spongecell.apiData.properties) {
		el = document.getElementsByClassName(property);
    	if(el.length > 0){
    		for(var i = 0; i < el.length; i++){
	    		el[i].innerHTML = spongeapi.getDynamicText(property);
	    	}
    	}
    }

    for (var property in spongecell.apiData.assets) {
    	el = document.getElementsByClassName(property);
    	if(el.length > 0){
    		for(var i = 0; i < el.length; i++){
	    		el[i].src = spongeapi.getDynamicImage(property);
	    		el[i].setAttribute('source',spongeapi.getDynamicImage(property));
	    	}
    	}
	}
}
handleSetupResponse = function(message) {
	if(!spongeapi.initComplete){
		window.spongecell.apiData = message || {};

		console.log('API::handleSetupResponse');
		console.log(spongecell.apiData.landingPages);
		console.log(spongecell.apiData.assets);
		console.log(spongecell.apiData.properties);

		switch(spongeapi.type)
		{
			case 'canvas':
			if(spongeapi.isDynamic) spongeapi.parseDynamicCanvasImages();
			spongeapi.initObj.loadManifest(lib.properties.manifest);
			break;
			case 'gwd':
			spongeapi.initObj.initAd();
			if(spongeapi.isDynamic) spongeapi.parseDynamicClasses();
			break;
			case 'custom':
			if(spongeapi.isDynamic) spongeapi.parseDynamicClasses();
			break;
		}
		if(spongeapi.onReady) spongeapi.onReady();
	}
	spongeapi.initComplete = true;
}
window.addEventListener('message', function(event) {
	  var message = event.data;
	  if (message) {
	    eval(message.callback)(message.data)
	  }
	});