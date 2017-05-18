$(document).ready(function(){
	waterFall();
	
	//模拟从后台接收来的数据
	var dataInt = {"data" : [{"src" : "p_00.jpg"},{"src" : "p_01.jpg"},{"src" : "p_02.jpg"},{"src" : "p_03.jpg"}]};
	
	$(window).on('scroll',function(){
		if(checkScrollSlide()){
			$.each(dataInt.data,function(index,value){
				var oBox = $('<div>').addClass('box').appendTo($('#main'));
				var oPic = $('<div>').addClass('pic').appendTo(oBox);
				//此处value是JS原生对象，和DOM对象一样不能直接用JQ方法
				$('<img>').attr('src','images/'+ $(value).attr('src')).appendTo(oPic);
			})
			waterFall();
		}
	});
});

function waterFall(){
	var $boxs = $('#main>div');
	var w = $boxs.eq(0).outerWidth();
	var cols = Math.floor($(document).width()/w);
	$('#main').width(cols*w).css('margin','0 auto');

	var hArr = new Array();
	$boxs.each(function(index,value){
		var h = $boxs.eq(index).outerHeight();
		if(index < cols){
			hArr[index] = h;
		}else{
			var minH = Math.min.apply(null,hArr);
			//获得最小值的索引
			var minHIndex = $.inArray(minH,hArr);
			//可以通过console.log查看得知value是DOM对象，所以要将其转为jquery对象
			//才能给其添加CSS或者使用jquery方法。  所以$(value);
			$(value).css({
				'position':'absolute',
				'top':minH + 'px',
				'left':minHIndex*w +'px'
			})
		}
			hArr[minHIndex] += $boxs.eq(index).outerHeight();
	});
}

 function checkScrollSlide(){
 	var $lastBox = $('#main>div').last();
 	var lastBoxH = $lastBox.offset().top + Math.floor($lastBox.outerHeight()/2);
 	var scrollTop = $(window).scrollTop();
 	var windowHeight = $(window).height();

 	return (lastBoxH < (scrollTop + windowHeight)) ? true : false;
}
