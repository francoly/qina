//自定义指令

var myDirectives = angular.module('myDirectives',[]);

//头部模板
myDirectives.directive('ngHeader',function(){
	return{
		restrict:"AE",
		templateUrl:"html/common/header.html",
		replace:true
	};
});


//底部模板
myDirectives.directive('ngFooter',function(){
	return{
		restrict:"AE",
		templateUrl:"html/common/footer.html",
		replace:true
	};
});

//返回顶部按钮
myDirectives.directive('backToTop', function () { 
    return { 
      restrict: "A", 
      link: function (scope, element, attr) { 
        var e = $(element); 
		e.hide();
        $(window).scroll(function () {         //滚动时触发 
          if ($(document).scrollTop() > 300)     //获取滚动条到顶部的垂直高度,到相对顶部300px高度显示 
            e.fadeIn(300) 
          else
            e.fadeOut(200); 
        }); 
        /*点击回到顶部*/
        e.click(function () { 
          $('html, body').animate({         //添加animate动画效果 
            scrollTop: 0 
          }, 500); 
        }); 
      } 
    }; 
}); 

myDirectives.directive('repeatDone',function(){ 
	return{
		link:function(scope,element,attr){
			if(scope.$last){
				scope.$eval(attr.repeatDone);
			}
		}
	}
})