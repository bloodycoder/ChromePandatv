alert("hello");
function oneDanmu(timeout){
	alert(timeout);
	setTimeout(oneDanmu(timeout+1000),timeout);
}
oneDanmu(1000);