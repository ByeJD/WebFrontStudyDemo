
// var square = {
// 	eleID:"",
// 	curRow: 5,
// 	curCol: 5,
// 	direction: 0,
// 	curDeg: 0,
// 	squareWidth:52,
// 	ele:undefined,
// 	squareMove:function(argument) {
// 		// body... 
// 	},
// 	init:function (eleID) {
// 		this.eleID = eleID;
// 		this.getStyle("left")  = squareWidth * curCol + 'px';
// 		this.getStyle("top")  = squareWidth * curCol + 'px';
// 	},
// 	$1:function (id) {
// 		return document.getElementById(id);
// 	},
// 	getStyle:function(attr) {
// 		return this.$1(this.eleID).style[attr];
// 	},
// }

function Square(){
	this.curRow = 5;
	this.curCol = 5;
	this.direction = 0;
	this.curDeg = 0;
	this.eleName = "";
	this.squareWidth = 52;
	this.timer = null;
	this.ele = null;
	var self = this;
	this.init = function (id) {
		this.ele = this.$(id);
		this.eleName = id;
		this.$(id).style["left"] = this.squareWidth * this.curCol + 'px';
		this.$(id).style["top"] = this.squareWidth * this.curCol + 'px';
	};
	this.$ = function(id){
		return document.getElementById(id);
	};
	this.move = function (targetRow,targetCol) {
		clearInterval(self.timer);
		self.timer = setInterval(function(){
			if (self.direction % 2== 0) {
				self.moveSubFun(targetRow,self.curRow,"top");
			}
			else if(self.direction % 2 == 1){
				self.moveSubFun(targetCol,self.curCol,"left");
			}
		},1);
	};
	this.turnAction = function (targetDeg) {
		clearInterval(self.timer);  // 用自己的timer.
		var tempcurDeg = self.curDeg;
		$('targetSquare').style.transform = "rotate("+self.curDeg+"deg)";
		self.timer = setInterval(function(){
			if ($('targetSquare').style.transform== "rotate("+targetDeg+"deg)") {
				self.curDeg = targetDeg%360;
				clearInterval(self.timer);
			}else{
				var t = $('targetSquare').style.transform; //rotate(180deg)
				var te = t.slice(7,t.length-4); // slice(start,end):左闭 右开区间
				var deg = parseInt(te);
				var degSpeed = 0;
				if(self.curDeg > targetDeg)
					speed = -1;
				else
					speed = 1;
				$('targetSquare').style.transform = "rotate("+(deg+speed)+"deg)";
			}},1);
		}
	this.turnDirection = function (command) {
		switch (command) {
			case "TUN LEF":
				self.direction = (self.direction+3)%4;
				self.turnAction((self.curDeg + 90));
				break;
			case "TUN RIG":
				self.direction = (self.direction+1)%4;
				self.turnAction((self.curDeg - 90));
				break;
			case "TUN BAC":
				self.direction = (self.direction+2)%4;
				self.turnAction((self.curDeg - 180));
				break;
		}
	}	
	this.style = function (attr) {
		return this.ele.style[attr];
	};
	this.moveSubFun= function (target,curP,attr) {
		if (parseInt(self.style(attr)) == (self.squareWidth * target)) {
				clearInterval(this.timer);
		}else{
			var speed = 0;
			if(target > curP){
				speed = 1;
			}else{
				speed = -1
			}
			document.getElementById("targetSquare").style[attr] = parseInt(self.style(attr)) + speed + 'px';	
		}
	};

}