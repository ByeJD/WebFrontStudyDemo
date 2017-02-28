function func(e) {

	e.preventDefault();
	var ctmenu = document.getElementById("contextmenu");
	ctmenu.style.display="inline-block";

	// the width and height of contextmenu div
	var ctmenuId = document.getElementById("contextmenu");
	var ctmenuIdWidth = ctmenuId.offsetWidth;
	var ctmenuIdHeight = ctmenuId.offsetHeight;

	// the width and height of the contextmenu container
	var ctmenuContainerId = document.getElementById("contextmenuContainer");
	var ctmenuContainerIdWidth = ctmenuContainerId.offsetWidth;
	var ctmenuContainerIdHeight = ctmenuContainerId.offsetHeight;


	if(ctmenuContainerIdWidth - e.clientX > ctmenuIdWidth && ctmenuContainerIdHeight - e.clientY > ctmenuIdHeight){
		ctmenu.style.top = e.clientY + "px";
		ctmenu.style.left = e.clientX + "px";
	}else if(ctmenuContainerIdWidth - e.clientX > ctmenuIdWidth &&  ctmenuContainerIdHeight - e.clientY < ctmenuIdHeight){
		ctmenu.style.left = e.clientX + "px";
		ctmenu.style.top = (e.clientY - ctmenuIdHeight) + "px";
	}else if(ctmenuContainerIdWidth - e.clientX < ctmenuIdWidth && ctmenuContainerIdHeight - e.clientY > ctmenuIdHeight){
		ctmenu.style.left = (e.clientX-ctmenuIdWidth) + "px";
		ctmenu.style.top = e.clientY + "px";
	}else{
		ctmenu.style.left = (e.clientX-ctmenuIdWidth) + "px";
		ctmenu.style.top = (e.clientY-ctmenuIdHeight) + "px";
	}
}

// check if the mouse is in the div named divId
function isInDiv(e,divId){
	var ctmenuId = document.getElementById(divId);
	var ctmenuIdWidth = ctmenuId.offsetWidth;
	var ctmenuIdHeight = ctmenuId.offsetHeight;
	var ctmenuoffsetTop = ctmenuId.offsetTop;
	var ctmenuoffsetLeft = ctmenuId.offsetLeft;
	if(e.clientX > ctmenuoffsetLeft && e.clientX < ctmenuoffsetLeft + ctmenuIdWidth && e.clientY > ctmenuoffsetTop && e.clientY < ctmenuoffsetTop + ctmenuIdHeight){
		return true;
	}
	else {
		return false;
	} 
}

document.addEventListener("mousedown", function(event){
	if(event.button == 0 && !isInDiv(event,"contextmenu")){
		var ctmenu = document.getElementById("contextmenu");
		ctmenu.style.display="none";
	}
});