//主控制器
myApp.controller('footerCtrl',function($scope,$http,$location,$rootScope){
	var mail  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	//尾部
	$(".float_weixin").hover(function(){
		// $(".float_weixin img").show("slow");
		$(".float_weixin img").addClass('show');
	},function(){
		// $(".float_weixin img").hide("fast");
		$(".float_weixin img").removeClass('show');
	});
	
	// 电子邮件
	$scope.sendEmail = function (e) {      
		var keycode = window.event ? e.keyCode : e.which;//获取按键编码  
		if (keycode == 13) {  
			if(typeof $scope.dy == 'undefined'||!mail.test($scope.dy)) {
				baison.alert("请输入正确的邮箱号")
				return
			}
	
			var params = {};
			// params.method = "item.list.category";  //请求的接口，由后台提供
			params.method = "member.email.subscribe";
			// params.cat_id=1;
			var p_params = {
				email:$scope.dy,
			};
			params.params = JSON.stringify(p_params);
			$http.get(baison.get_url('api/', params))
				.success(function(data) {
					if (data.status == 1) {
						$scope.cats= data.data;
						baison.alert(data.message);
						
					} else {
						baison.alert(data.message);
					}
				});
			$scope.dy='';
		}  
	}  
	
	
	 $scope.dingyue=function(){

	 	if(typeof $scope.dy == 'undefined'||!mail.test($scope.dy)) {
			baison.alert("请输入正确的邮箱号")
			return
		}

		var params = {};
		// params.method = "item.list.category";  //请求的接口，由后台提供
		params.method = "member.email.subscribe";
		// params.cat_id=1;
		var p_params = {
			email:$scope.dy,
		};
		params.params = JSON.stringify(p_params);
	   //请求的接口，由后台提供
		
		//根据接口需要，可为该对象添加其他参数去请求数据，例如params.goods_code = $scope.goods_code;
		$http.get(baison.get_url('api/', params))
			.success(function(data) {
				if (data.status == 1) {
					$scope.cats= data.data;
					baison.alert(data.message);
					
				} else {
					baison.alert(data.message);
				}
			});
		$scope.dy='';
	};
	
	//go跳到商店shop
	$scope.goShop = function (e) {      
		var keycode = window.event ? e.keyCode : e.which;//获取按键编码
		var obj;
		if (screen.width >768) {
			obj = $('#go_shop');
		}else{
			obj = $('#home_go');
		}
		if (keycode == 13) {  
			if(obj.val()==''){
				$rootScope.go_shop='';
				$location.path('/shop');
			// 	baison.alert('请填写对应城市名')
			}else{
				$rootScope.go_shop=2;
				$rootScope.go_=obj.val();
				$location.path('/shop');
			}
		}
	}
	
	
	$scope.go=function(){
		var obj;
		if (screen.width >768) {
			obj = $('#go_shop');
		}else{
			obj = $('#home_go');
		}
		if(obj.val()==''){
			$rootScope.go_shop='';
			$location.path('/shop');
		// 	baison.alert('请填写对应城市名')
		}else{
			$rootScope.go_shop=2;
			$rootScope.go_=obj.val();
			$location.path('/shop');
		}
		// if($('#go_shop').val()==''){
		// 	baison.alert('请填写对应城市名')
		// }else{
			// $rootScope.go_shop=2;
			// $rootScope.go_=$('#go_shop').val();
			// $location.path('/shop');
		// }
	}
		// 微博分享
		$scope.WeiBo1=function(){
		window.open('http://v.t.sina.com.cn/share/share.php?title=' + encodeURIComponent('') + '&pic=' + encodeURIComponent('') + '&sourceUrl=http%3A%2F%2Fwww.lofter.com&appkey=895033136',
		 '_parent',
		['toolbar=0,status=0,resizable=1,width=630,height=500,left=',(screen.width-630)/2,
		',top=',(screen.height-500)/2].join(''));
		return false;
	};
	// 文章foot1
	var params = {};
	// params.method = "item.list.category";  //请求的接口，由后台提供
	params.method = "article.detail.article";
	// params.cat_id=1;
	var p_params = {
		article_id:33,
	};
	params.params = JSON.stringify(p_params);
   //请求的接口，由后台提供
	
	//根据接口需要，可为该对象添加其他参数去请求数据，例如params.goods_code = $scope.goods_code;
	$http.get(baison.get_url('api/', params))
		.success(function(data) {
			if (data.status == 1) {
				// alert("成功");
				$scope.WenZhangs= data.data;
				// alert($scope.cats);
				$('.wen_foot1').append(data.data.content)
			} else {
				// baison.alert(data.message);
				// alert("shibai");
			}
		});	
	
	// 文章foot2
	var params = {};
	// params.method = "item.list.category";  //请求的接口，由后台提供
	params.method = "article.detail.article";
	// params.cat_id=1;
	var p_params = {
		article_id:41,
	};
	params.params = JSON.stringify(p_params);
   //请求的接口，由后台提供
	
	//根据接口需要，可为该对象添加其他参数去请求数据，例如params.goods_code = $scope.goods_code;
	$http.get(baison.get_url('api/', params))
		.success(function(data) {
			if (data.status == 1) {
				// alert("成功");
				$scope.WenZhangs= data.data;
				// alert($scope.cats);
				$('.wen_foot2').append(data.data.content)
			} else {
				// baison.alert(data.message);
				// alert("shibai");
			}
		});	
		
		
	// wap端
	// 文章foot在线服务
	
	//go跳到商店shop
	$scope.home_s=function(){
		// if($('#home_go').val()==''){
		// 	baison.alert('请填写对应城市名')
		// }else{
			$rootScope.go_shop=2;
			$rootScope.go_=$('#home_go').val();
			$location.path('/shop')
		// }
	}
		
	//wap微信
	$scope.weixin=function(){
		
	};

	$scope.foot_to_top = function(){
		jQuery("html,body").animate({scrollTop:0}, 500);
	}
		
	//瞄点对应滚动
 // $(".footer_top,.foot_com_top").click(function(event) { 
 //     $("html,body").animate({scrollTop:0}, 500);
 //   });	
		
	$(document).on('click','.foo_we', function(){
		if($(this).attr("biao")=='0'){
			$(this).attr("biao","1");
			$('.foo_wei').hide();
		}else{
			$(this).attr("biao","0");
			$('.foo_wei').show();
		}
	})
 // 在线客服事件
	 $(document).on('click','.foot_com_ke', function(){
		　window.open ("http://59.60.10.21:9090/BolonWebservice/blpc", "newwindow", "height=500, width=500, toolbar =no, menubar=no, scrollbars=no, resizable=no, location=no, status=no") 
	 })
	 // 移动端底部点击在线客服
	$(document).on('click','.footer_foot_fu', function(){
		$(".ico1").attr("biao","0");
		$(".head_f").animate({"left":"-76%"}).hide();
		$("html").animate({"marginLeft":"0","height":"auto"});
		$("html").scrollTop(0);
		$("body").removeAttr("style");
		window.open("http://192.168.254.222:8080/BolonWebservice/blWeiXin");
	})
	 
	 
	 
	 
	 
	
	 
});




