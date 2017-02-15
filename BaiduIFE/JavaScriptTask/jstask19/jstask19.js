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
		var pattern = /[1-9]\d*/g;  // 首位只能是1-9 \d 匹配任意数字0-9 *表示匹配0到n次
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
		if(!isDigit(inputValue)){
			alert("the input should be a num");
		}else if(data.length >= 60){
			alert("the length of elements in the queue exceed 60");
		}else{
			data.unshift(inputValue);
			renderQueue();
		}
		
	};
	$("right-in").onclick = function(){
		var inputValue = document.getElementsByTagName("input")[0].value;

		if(!isDigit(inputValue)){
			alert("the input should be a number");
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
		console.log(typeof e.dataset.num);
		console.log(e.getAttribute("data-num"));
		data=data.filter(function(item,index,array){
			return index!==parseInt(e.dataset.num);
		});

		renderQueue();
	}
	function renderQueue(){
		var html = "";
		for(var i = 0;i < data.length;i++){
			html += "<div onclick='removeElement(this);' style='float:left;background-color:red;margin:5px;' data-num='"+i+"'><span style='color:white;padding:5px;'>"+data[i]+"</span></div>";
		}
		$("queue-wrap").innerHTML = html;
	}
	init();
