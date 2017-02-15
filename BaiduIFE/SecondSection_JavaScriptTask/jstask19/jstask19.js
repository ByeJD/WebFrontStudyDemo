/**
 * Array的方法：
 * push(): 在Array的末尾添加元素，返回数组长度
 * pop()： 在Array的末尾删除元素，返回要删除的元素的值
 * shift()： 删除数组第一项元素，返回第一项元素
 * unshift(): 给数组第一项添加元素，返回数组数组长度
 **/
	var $ = function(id){
		return document.getElementById(id);
	}
	function init(){
		var div = document.createElement("div");
		div.id="queue-wrap";
		document.body.appendChild(div);	
	}
	
	function isDigit(value){
		var pattern = /[1-9]\d*/g;  // 首位只能是1-9 \d 匹配任意数字0-9 *表示匹配0到n次 但是好像可以匹配09 类似的
		if(pattern.test(value))
		{
			return true;
		}else{
			return false;
		}
	}
	var data = [];
	//function isInputE
	$("left-in").onclick = function(){
		var inputValue = document.getElementsByTagName("input")[0].value;
		var numInputValue = parseInt(inputValue);
		if(isNaN(numInputValue)){
			alert("the input should be a number");
		}else if(numInputValue < 10 || numInputValue > 100){
			alert("please input the  num between 10 and 100")
		}else if(data.length >= 60){
			alert("the length of elements in the queue exceed 60");
		}else{
			data.unshift(inputValue);
			renderQueue();
		}
	};
	// http://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
	// just for testing/dev
	function sleepFor( sleepDuration ){
	    var now = new Date().getTime();
	    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
	}
	function bubbleSort(arr){

		var flag = true;
		for (var i = 0; i < arr.length-1; i++) {
			for (var j = 0; j < arr.length-i-1; j++) {
				if(arr[j]>arr[j+1])
				{
					flag=false;
					var t = arr[j];
					arr[j] = arr[j+1];
					arr[j+1] = t;
				}
				sleepFor(2000);
				renderQueue();
			}
			if (flag) {
				break;
			}
		}
	}
	function bubbleSort(){

		var flag = true;
		for (var i = 0; i < data.length-1; i++) {
			for (var j = 0; j < data.length-i-1; j++) {
				if(data[j]>data[j+1])
				{
					flag=false;
					var t = data[j];
					data[j] = data[j+1];
					data[j+1] = t;
				}
				renderQueue();
				sleepFor(3000);
				
			}
			if (flag) {
				break;
			}
		}
	}
	$("bubble-sort").onclick=function(){
		bubbleSort();
	};
	$("right-in").onclick = function(){
		var inputValue = document.getElementsByTagName("input")[0].value;
		var numInputValue = parseInt(inputValue);
		if(isNaN(numInputValue)){
			alert("the input should be a number");
		}else if(numInputValue < 10 || numInputValue > 100){
			alert("please input the  num between 10 and 100")
		}else if(data.length >= 60){
			alert("the length of elements in the queue exceed 60");
		}else{
			data.push(inputValue);	
			renderQueue();
		}		
	};

	$("left-out").onclick = function(){
		if(data.length===0){
			alert("there is no element in the queue");
		}else{
			alert(data.shift());	
			renderQueue();
		}
	};

	$("right-out").onclick = function(){
		
		if(data.length===0){
			alert("there is no element in the queue");
		}else{
			alert(data.pop());
			renderQueue();
		}
		
	};
	function removeElement(e){
		//var targetElement = arguments[0].target;
		console.log(typeof e.dataset.num);   // string
		console.log(e.getAttribute("data-num"));
		data=data.filter(function(item,index,array){
			return index!==parseInt(e.dataset.num);
		});

		renderQueue();
	}
	function renderQueue(){
		var html = "";
		for(var i = 0;i < data.length;i++){
			html += "<div onclick='removeElement(this);' title='"+data[i]+"' style='float:left;margin-left:5px;margin-top:"+(100-data[i])+"px;background-color:red;width:20px;height:"+data[i]+"px;' data-num='"+i+"'></div>";
		}
		$("queue-wrap").innerHTML = html;
	}
	init();
