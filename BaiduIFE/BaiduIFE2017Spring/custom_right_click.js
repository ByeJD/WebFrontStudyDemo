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