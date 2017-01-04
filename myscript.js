var i = 0,msg = '666',href = window.location.href,interval=1000;
var send_state = 0;
var textareaSelector = '.room-chat-texta',sendBtnSelector = '.room-chat-send';
var interval_object = null;
if(href.indexOf('panda')>0){
	sendPanda();
}
function sendReq(){
	chrome.runtime.sendMessage("ioollajoihjchplceabbhpnobmegpncj",{greeting:"hello"},function(response){
        if(window.hasOwnProperty('response.farewell')== true){
		console.log(response.farewell);}
		msg = response.danmu;
		interval = response.interval_seconds;
	});
}
var oneInterval = function(){
	if(send_state>0){
	    $(textareaSelector).val(msg);$(sendBtnSelector).click();
	}
}
function sendPanda(){
	interval_object = setInterval(function(){
		if(send_state>0){
			$(textareaSelector).val(msg);$(sendBtnSelector).click();
		}
	},interval);
}
chrome.runtime.onMessage.addListener(
    	function(request,sender,sendResponse){
    		if(request.greeting=="begin"){
    	        //alert(request.danmu_con);
    		    //alert(request.interval_seconds);
    		    send_state = 1;
    		    if(request.interval_seconds>0){
    		    	interval = request.interval_seconds;
    		    	clearInterval(interval_object);
    		    	interval_object = setInterval(function(){
    		    		if(send_state>0){
    		    		    $(textareaSelector).val(msg);$(sendBtnSelector).click();
    		    		}
	                 },request.interval_seconds);
    		    }
    		    if(request.danmu_con!=""){
    		    	msg = request.danmu_con;
    		    }
    		    $(textareaSelector).val(msg);$(sendBtnSelector).click();
    		}
    		else if(request.greeting=="goodbye"){
    			send_state = 0;
    		}
    		else if(request.greeting=="aquireInfo"){
    			sendResponse({danmu:msg,interval_seconds:interval});
    		}
    	})