function checkweb(url){
	var userAgentInfo = navigator.userAgent;  
	var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod", "Windows CE", "BlackBerry");  
	var flag = true;  
	for (var v = 0; v < Agents.length; v++) {  
	   if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
	}  
	if(flag){
		window.location=url;
	}
}
	