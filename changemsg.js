$(function(){
    var a1 = $("#five-seconds"),a2 = $("#ten-seconds"),a3 = $("#twen-seconds"),a4=$("#one-minute");
    var btn_end = $("#close-btn");
    var btn_begin = $("#begin-btn");
    var interval = -1;
    var danmu = $('#inputEmail3');
        chrome.tabs.query({active:true,currentWindow:true},function(tabs){
            chrome.tabs.sendMessage(tabs[0].id,{greeting:"aquireInfo"},
                function(response){
                    danmu.val(response.danmu);
                    interval = response.interval_seconds;
                    switch(interval){
                        case 5000:
                        a1.attr("class","active");break;
                        case 10000:
                        a2.attr("class","active");break;
                        case 20000:
                        a3.attr("class","active");break;
                        case 60000:
                        a4.attr("class","active");break;
                    }
                });

        });
	/*
	document.getElementById("pig").addEventListener("click",function(){
		},false);*/
 a1.on('click', function () {
    a1.attr("class","active");
    a2.attr("class","inactive");
    a3.attr("class","inactive");
    a4.attr("class","inactive");
    interval = 5000;
});
  a2.on('click', function () {
  	a1.attr("class","inactive");
    a2.attr("class","active");
    a3.attr("class","inactive");
    a4.attr("class","inactive");
    interval = 10000;
});
  a3.on('click', function () {
  	a1.attr("class","inactive");
    a2.attr("class","inactive");
    a3.attr("class","active");
    a4.attr("class","inactive");
    interval = 20000;
});
    a4.on('click', function () {
  	a1.attr("class","inactive");
    a2.attr("class","inactive");
    a3.attr("class","inactive");
    a4.attr("class","active");
    interval = 60000;
});
    btn_end.on('click',function(){
  	a1.attr("class","inactive");
    a2.attr("class","inactive");
    a3.attr("class","inactive");
    a4.attr("class","inactive");  
    interval = -1;	
        chrome.tabs.query({active:true,currentWindow:true},function(tabs){
            chrome.tabs.sendMessage(tabs[0].id,{greeting:"goodbye",danmu_con:danmu.val(),interval_seconds:interval},
                function(response){
                    console.log(response.farewell);
                });
            window.close();
        });
    })
    btn_begin.on('click',function(){
        chrome.tabs.query({active:true,currentWindow:true},function(tabs){
            chrome.tabs.sendMessage(tabs[0].id,{greeting:"begin",danmu_con:danmu.val(),interval_seconds:interval},
                function(response){
                    console.log(response.farewell);
                });

        });
        window.close();
    })
})
