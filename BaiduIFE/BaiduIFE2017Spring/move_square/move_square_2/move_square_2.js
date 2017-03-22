
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
	this.action = function(targetRow,targetCol){
		if (self.direction == 0 && targetRow > 1) {
			targetRow -= 1;
		}else if(self.direction == 1 && targetCol < 10){
			targetCol += 1;
		}else if(self.direction == 2 && targetRow < 10){
			targetRow += 1;
		}else if(self.direction == 3 && targetCol > 1){
			targetCol -= 1;
		}
	}
	this.move = function (targetRow,targetCol,command,targetDeg) {
		clearInterval(self.timer);
		switch (command) {
			case "Go":
				// self.action(targetRow,targetCol);
				// self.timer = setInterval(function(){
				// 	if (self.direction == 0 ||self.direction==2) {
				// 		self.moveSubFun(targetRow,self.curRow,"top");
				// 	}
				// 	else if(self.direction ==1 || self.direction==3){
				// 		self.moveSubFun(targetCol,self.curCol,"left");
				// 	}
				// },1);
				self.timer = setInterval(function () {
					if(targetRow==self.curRow){self.moveSubFun(targetRow,targetCol);}
					if(targetCol==self.curCol){self.moveSubFun(targetRow,targetCol);}
				},1);
				break;
			case "TRA LEF":
				self.timer = setInterval(function () {
						if(targetRow==self.curRow){self.moveSubFun(targetRow,targetCol);}
						if(targetCol==self.curCol){self.moveSubFun(targetRow,targetCol);}
					},1);
				// if(self.curCol<10){
				// 	var t = self.curCol + 1;
				// }
				// self.timer = setInterval(function(){
				// 	self.moveSubFun(t,self.curCol,"left");
				// },1);
				break;
			case "TRA RIG":
				self.timer = setInterval(function () {
						if(targetRow==self.curRow){self.moveSubFun(targetRow,targetCol);}
						if(targetCol==self.curCol){self.moveSubFun(targetRow,targetCol);}
					},1);
				break;
			case "TRA TOP":
				self.timer = setInterval(function () {
						if(targetRow==self.curRow){self.moveSubFun(targetRow,targetCol);}
						if(targetCol==self.curCol){self.moveSubFun(targetRow,targetCol);}
					},1);
				break;
			case "TRA BOT":
				self.timer = setInterval(function () {
						if(targetRow==self.curRow){self.moveSubFun(targetRow,targetCol);}
						if(targetCol==self.curCol){self.moveSubFun(targetRow,targetCol);}
					},1);
				break;
		}
		
	};
	this.temp = function () {
		alert("0");
	}
	this.turnAction = function (targetDeg,fn) {
		clearInterval(self.timer);  // 用自己的timer.
		var tempcurDeg = self.curDeg;
		$('targetSquare').style.transform = "rotate("+self.curDeg+"deg)";
		self.timer = setInterval(function(){
			if ($('targetSquare').style.transform== "rotate("+targetDeg+"deg)") {
				self.curDeg = targetDeg%360;
				clearInterval(self.timer);
				console.log("d");
				if(fn){
					fn();
				}
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
			}},30);
		}
	this.turnDirection = function (command) {
		switch (command) {
			case "TUN LEF":
				self.direction = (self.direction+3)%4;
				self.turnAction((self.curDeg - 90));
				break;
			case "TUN RIG":
				self.direction = (self.direction+1)%4;
				self.turnAction((self.curDeg + 90));
				break;
			case "TUN BAC":
				self.direction = (self.direction+2)%4;
				self.turnAction((self.curDeg + 180));
				break;
		}
	}	
	this.style = function (attr) {
		return this.ele.style[attr];
	};
	this.moveSubFun= function (targetRow,targetCol) {
		if(targetRow==self.curRow){
			if (parseInt(self.style("left")) == (self.squareWidth * targetCol)) {
				self.curCol = targetCol;
				clearInterval(this.timer);
			}else{
				var speed = 0;
				if(targetCol > self.curCol){
					speed = 1;
				}else{
					speed = -1
				}
				document.getElementById("targetSquare").style["left"] = parseInt(self.style("left")) + speed + 'px';	
			}
		}

		if(targetCol==self.curCol){
			if (parseInt(self.style("top")) == (self.squareWidth * targetRow)) {
				self.curRow = targetRow;
				clearInterval(this.timer);
			}else{
				var speed = 0;
				if(targetRow > self.curRow){
					speed = 1;
				}else{
					speed = -1
				}
				document.getElementById("targetSquare").style["top"] = parseInt(self.style("top")) + speed + 'px';	
			}
		}
		
	};

}