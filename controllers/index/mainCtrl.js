//主控制器
myApp.directive('whenPcScrolled', function() {  
    return function(scope, elm, attr) {  
        // 内层DIV的滚动加载  
        if(screen.width <=768){
        	return false;
        }
        var raw = elm[0];
        $(window).bind('scroll', function() {
        	var pageYOffset = window.pageYOffset;
        	var innerHeight = window.innerHeight;

        	var obj_offsetTop = raw.offsetTop;
        	var obj_scrollHeight = raw.scrollHeight;
        	// console.log(pageYOffset+ innerHeight);
        	// console.log(obj_offsetTop + obj_scrollHeight);
        	if( pageYOffset+ innerHeight > obj_offsetTop + obj_scrollHeight){
        		scope.pagination();
        	}
        });
    };  
}); 
myApp.directive('whenScrolled', function() {  
    return function(scope, elm, attr) {  
        // 内层DIV的滚动加载  
        if(screen.width >768){
        	return false;
        }
        var raw = elm[0];
        $(window).bind('scroll', function() {
        	var pageYOffset = window.pageYOffset;
        	var innerHeight = window.innerHeight;

        	var obj_offsetTop = raw.offsetTop;
        	var obj_scrollHeight = raw.scrollHeight;
        	if( pageYOffset+ innerHeight > obj_offsetTop + obj_scrollHeight){
        		scope.pagination();
        	}
        });
    };  
}); 
myApp.controller('mainCtrl',function($scope,$rootScope,$anchorScroll,$location){
	// $anchorScroll();
	$rootScope.user = "";
	$rootScope.userShow = true;
	
	if(screen.width >768){
    	var _hmt = _hmt || [];
		
		  	var hm = document.createElement("script");
		  	hm.src = "https://hm.baidu.com/hm.js?76c60b2b51caee138213a235a5df9861";
		  	var s = document.getElementsByTagName("script")[0]; 
		  	s.parentNode.insertBefore(hm, s);
		
    }else{
    	var _hmt = _hmt || [];
		
		  	var hm = document.createElement("script");
		  	hm.src = "https://hm.baidu.com/hm.js?ce09534359aed6da34b85898062ce236";
		  	var s = document.getElementsByTagName("script")[0]; 
		  	s.parentNode.insertBefore(hm, s);
		
    }

	//整体切换效果
	var n=0;
	$scope.mainLeft=function(){
		if(n==0){
			n=$(".main_ul ul").length-1;
			$(".main_ul ul").removeClass("main_z").eq(n).addClass("main_z")
			$(".main_ul ul").fadeOut().eq(n).fadeIn();
		}else{
			n-=1;
			$(".main_ul ul").removeClass("main_z").eq(n).addClass("main_z")
			$(".main_ul ul").fadeOut().eq(n).fadeIn();
			}

		}
	$scope.mainRight=function(){
		if(n<$(".main_ul ul").length-1){
			n+=1;
			$(".main_ul ul").removeClass("main_z").eq(n).addClass("main_z")
			$(".main_ul ul").fadeOut().eq(n).fadeIn();
		}else{
			n=0;
			$(".main_ul ul").removeClass("main_z").eq(n).addClass("main_z")
			$(".main_ul ul").fadeOut().eq(n).fadeIn();
			}
		}
	//切换效果
	$scope.dianRight=function($event){
		var dian=$($event.target).parent().find(".dian");
		var n=$($event.target).parent().parent();
		var nn=parseInt(n.attr("biao"));
			if(nn<dian.length-1){
					nn+=1;
					n.attr("biao",nn)
					dian.removeClass("dian1");
					dian.eq(nn).addClass("dian1");
					n.find(".toggle").fadeOut().eq(nn).fadeIn()
				}else{
					nn=0;
					n.attr("biao",nn)
					dian.removeClass("dian1");
					dian.eq(nn).addClass("dian1");
					n.find(".toggle").fadeOut().eq(nn).fadeIn()
					}
		}
	
	$scope.dianLeft=function($event){
		var dian=$($event.target).parent().find(".dian");
		var n=$($event.target).parent().parent();
		var nn=parseInt(n.attr("biao"));
			if(nn!=0){
					nn-=1
					n.attr("biao",nn)
					dian.removeClass("dian1");
					dian.eq(nn).addClass("dian1");
					n.find(".toggle").fadeOut().eq(nn).fadeIn()
				}else{
					nn=dian.length-1;
					n.attr("biao",nn)
					dian.removeClass("dian1");
					dian.eq(nn).addClass("dian1");
					n.find(".toggle").fadeOut().eq(nn).fadeIn()
					}
		}
	//切换效果end
	
	//切换小点，点击效果
		$scope.dian=function($event){
				var e=parseInt($($event.target).attr("biao"));
				var n=$($event.target).parent().parent();
				n.attr("biao",e)
				var dian=$($event.target).parent().find(".dian");
				dian.removeClass("dian1");
				$($event.target).addClass("dian1");
				n.find(".toggle").fadeOut().eq(e).fadeIn()
			}	
	
});
