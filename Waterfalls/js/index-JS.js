window.onload = function(){
	waterFall('main','box');
	//模拟从后台接收来的数据
	var dataInt = {"data" : [{"src" : "p_00.jpg"},{"src" : "p_01.jpg"},{"src" : "p_02.jpg"},{"src" : "p_03.jpg"}]};
	window.onscroll = function() {
		if(checkScrollSlide){
			var oParent = document.getElementById('main');
			//将数据渲染到页面底部
			for(var i=0;i<dataInt.data.length;i++){
				var oBox = document.createElement('div');
				oBox.className = 'box';
				oParent.appendChild(oBox);
				var oPic = document.createElement('div');
				oPic.className = 'pic';
				oBox.appendChild(oPic);
				var oImg = document.createElement('img');
				oImg.src = "images/"+ dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterFall('main','box');
		}
	}
}

 function waterFall(parent,box){
 	var oParent = document.getElementById('main');
 	/*将getByClass返回的数组赋值给oBoxs,即用其来接收返回值*/
 	var oBoxs = getByClass(oParent,box);
 	/*计算图片的列数。即页面宽度/盒子宽度*/
 	var clientWidth = document.documentElement.clientWidth,
 	 	oBoxW = oBoxs[0].offsetWidth,
 	 	cols = Math.floor(clientWidth/oBoxW);
 	/*设置main的宽度*/
 	oParent.style.cssText='width:'+oBoxW*cols+'px;margin: 0 auto;';
 	/*hArr 各个列高度的数组*/
 	var hArr = new Array();
 	for(var i=0;i<oBoxs.length;i++){
 		if(i<cols){
 			hArr.push(oBoxs[i].offsetHeight);
 		}else{
 			var minH = Math.min.apply(null,hArr);
 			var index = getMinhIndex(hArr,minH);
 			oBoxs[i].style.position = 'absolute';
 			oBoxs[i].style.top = minH +'px';
 			oBoxs[i].style.left = oBoxW*index + 'px'; 
 			/*oBoxs[i].style.left = oBoxs[index].offsetLeft + 'px'; */
 			hArr[index]+=oBoxs[i].offsetHeight;
 		}
 	}
 }
 function getByClass(parent,classname){
 	var boxArr = new Array();
 	var oElements = parent.getElementsByTagName('*');
 	for(var i=0;i<oElements.length;i++){
 		if(oElements[i].className == classname){
 		boxArr.push(oElements[i]);
 		}
 	}
 	return boxArr;
 }

 function getMinhIndex(arr,val){
 	for(var i in arr){
 		if(arr[i]==val){
 			return i;
 		}
 	}
 }

 /*检测是否达到加载的条件*/
 function checkScrollSlide(){
 	var oParent = document.getElementById('main');
 	var oBoxs = getByClass(oParent,'box');
 	var lastBoxH = oBoxs[oBoxs.length-1].offsetTop + Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
 	var scrollTop  =document.body.scrollTop || document.documentElement.scrollTop;
 	var clientHeight = document.body.clientHeight || document.documentElement.clientHeight; 
 	return (lastBoxH < scrollTop + clientHeight) ? true : false;
 }
