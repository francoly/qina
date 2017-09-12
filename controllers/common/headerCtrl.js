//跳转到产品列表
myApp.directive("catSel", ['$location','$routeParams','$route',function($location,$routeParams,$route) {
	return {  
        restrict:"AE",//Element,Attribute  
        link:function(scope,element,attrs){  
            element.bind('click', function(event){
            	localStorage.ctype = attrs.ctype;
            	var url_str = '';
        		for(x in scope.pass_data){
        			url_str += x+"="+scope.pass_data[x]+"&";
        		}
        		url_str += "ctype="+attrs.ctype;
            	if($location.url().indexOf('/cp') < 0){
            		// return false;
            		// $route.updateParams(scope.pass_data);
					// scope.$apply($location.path('/cp?'+url_str.slice(0,-1)));
					location.href = $location.$$absUrl.split('#')[0] + '#/cp?' + url_str;
				}else{
					$route.current.params = scope.pass_data;
            		$route.updateParams();
            		scope.cp_location(attrs.ctype,scope.pass_data);
            		// var his = $location.$$absUrl.split('#')[0] + '#/cp/' + url_str.slice(0,-1);
            		// console.log($location.search('abc',1));
            		// window.history.pushState({}, 0, his);
            		// location.hash = encodeURI('/cp/'+url_str.slice(0,-1));
            		// $location.path('/cp/'+url_str.slice(0,-1));
				}
            });  	
        }  
    }
}]);
// 跳转到custom全定制列表
myApp.directive("catcus", ['$location','$route',function($location,$route) {
	return {  
        restrict:"AE",//Element,Attribute  
        link:function(scope,element,attrs){  
            element.bind('click', function(event){
            	if($location.url()!='/custom'){
            		$route.current.params = {};
            		$route.updateParams();
					scope.$apply($location.path('/custom'));
				}else{
            		scope.custom_location();
				}
            });  
        }  
    }
}]);
//主控制器
myApp.controller('headerCtrl',function($scope,$rootScope,$http,$location){
	$(document).on('contextmenu','video',function(e){
		return false;
	});
	$scope.mini_cart_show = false;
	//判断登录用户名
	var wapl='';
	var params = {};
	params.method = "member.topright";   //请求的接口，由后台提供
	//params.code=localStorage.code;
	//根据接口需要，可为该对象添加其他参数去请求数据，例如params.goods_code = $scope.goods_code;
	$http.get(baison.get_url('api/', params))
		.success(function(e) {
			if (e.status == 1) {
				$rootScope.user=e.data.user;
				$rootScope.user_tui='退出' ;
				$scope.user_reg="";
				wapl=1;
			}else{
				$rootScope.user='';
				$rootScope.user_tui='' ;
				$scope.user_reg="登录/注册";
				wapl=0;
				}
		});
	//end用户
	
	//wap登录
	$scope.wapLogin=function(){
		$(".ico1").attr("biao","0");
		$(".head_f").animate({"left":"-76%"}).hide();
		$("html").animate({"marginLeft":"0","height":"auto"});
		$("html").scrollTop(0);
		$("body").removeAttr("style");
		if(wapl==1){
			$location.path('/user')
		}else{
			$location.path('/login');
			if(localStorage.wang){
				$(".login_main").show();
				$(".wang1-hide").hide();
				localStorage.wang = false;
			}
		}
	}
	
	// 一级导航
	var params = {};
	params.method = "item.get.topmenu";
	var p_params = {
		platform_id:1,
	};
	params.params = JSON.stringify(p_params);
	$http.get(baison.get_url('api/', params))
		.success(function(data) {
			if (data.status == 1) {
				$scope.first_menu = data.data;
			}
		});

	var params = {};
	params.method = "item.get.topmenu";
	var p_params = {
		platform_id:5,
	};
	params.params = JSON.stringify(p_params);
	$http.get(baison.get_url('api/', params))
		.success(function(data) {
			if (data.status == 1) {
				$scope.wap_first_menu = data.data;
			}
		});
			

	if (screen.width >768) {
		fro="1";
	}else{
		fro="5";
	}
// 二级菜单
	// 男士
	var params = {};
	params.method = "item.attr.list";    //请求的接口，由后台提供
	var p_params = {
		pcode:"man",
		from:fro,
	};
	params.params = JSON.stringify(p_params);
	//根据接口需要，可为该对象添加其他参数去请求数据，例如params.goods_code = $scope.goods_code;
	$http.get(baison.get_url('api/', params))
		.success(function(e) {
			if (e.status == 1) {
				$scope.head_man = e.data;
			}
		});
	// 女士
	var params = {};
	//params.method = "item.list.category";
	params.method = "item.attr.list";    //请求的接口，由后台提供
	//params.code=localStorage.code;
	var p_params = {
		pcode:"woman",
		from:fro,
	};
	params.params = JSON.stringify(p_params);
	//根据接口需要，可为该对象添加其他参数去请求数据，例如params.goods_code = $scope.goods_code;
	$http.get(baison.get_url('api/', params))
		.success(function(e) {
			if (e.status == 1) {
				$scope.head_miss = e.data;
			} 
		});
	// 儿童
	var params = {};
	//params.method = "item.list.category";
	params.method = "item.attr.list";    //请求的接口，由后台提供
	//params.code=localStorage.code;
	var p_params = {
		pcode:"children",
		from:fro,
	};
	params.params = JSON.stringify(p_params);
	//根据接口需要，可为该对象添加其他参数去请求数据，例如params.goods_code = $scope.goods_code;
	$http.get(baison.get_url('api/', params))
		.success(function(e) {
			if (e.status == 1) {
				$scope.head_child = e.data;
			}
		});
		// 全定制
	var params = {};
	//params.method = "item.list.category";
	params.method = "item.attr.list";    //请求的接口，由后台提供
	//params.code=localStorage.code;
	var p_params = {
		pcode:"dingzhi",
	};
	params.params = JSON.stringify(p_params);
	//根据接口需要，可为该对象添加其他参数去请求数据，例如params.goods_code = $scope.goods_code;
	$http.get(baison.get_url('api/', params))
		.success(function(e) {
			if (e.status == 1) {
				$scope.head_cus = e.data;
			}
		});
			// 品牌
	var params = {};
	//params.method = "item.list.category";
	params.method = "item.attr.list";    //请求的接口，由后台提供
	//params.code=localStorage.code;
	var p_params = {
		pcode:"pinpai",
	};
	params.params = JSON.stringify(p_params);
	//根据接口需要，可为该对象添加其他参数去请求数据，例如params.goods_code = $scope.goods_code;
	$http.get(baison.get_url('api/', params))
		.success(function(e) {
			if (e.status == 1) {
				$scope.head_pinpai = e.data;
			}
		});
	// 二级导航栏文章
	var params = {};
	// params.method = "item.list.category";  //请求的接口，由后台提供
	params.method = "article.detail.article";
	// params.cat_id=1;
	var p_params = {
		article_id:80,
	};
	params.params = JSON.stringify(p_params);
   //请求的接口，由后台提供
	
	//根据接口需要，可为该对象添加其他参数去请求数据，例如params.goods_code = $scope.goods_code;
	$http.get(baison.get_url('api/', params))
		.success(function(data) {
			if (data.status == 1) {
				$scope.wen_head_text= data.data;
				$('.wen_head_text').append(data.data.content)
			}
		});
	// 二级导航栏文章end
// 头部服务
	var params = {};
	// params.method = "item.list.category";  //请求的接口，由后台提供
	params.method = "article.detail.article";
	// params.cat_id=1;
	var p_params = {
		article_id:86,
	};
	params.params = JSON.stringify(p_params);
   //请求的接口，由后台提供
	
	//根据接口需要，可为该对象添加其他参数去请求数据，例如params.goods_code = $scope.goods_code;
	$http.get(baison.get_url('api/', params))
		.success(function(data) {
			if (data.status == 1) {
				$scope.wen_head_text= data.data;
				$('.wen_head_fuwu').append(data.data.content)
		
			}
		});
	// 头部服务

// 移动头部2017
	var params = {};
	// params.method = "item.list.category";  //请求的接口，由后台提供
	params.method = "article.detail.article";
	// params.cat_id=1;
	var p_params = {
		article_id:87,
	};
	params.params = JSON.stringify(p_params);
   //请求的接口，由后台提供
	
	//根据接口需要，可为该对象添加其他参数去请求数据，例如params.goods_code = $scope.goods_code;
	$http.get(baison.get_url('api/', params))
		.success(function(data) {
			if (data.status == 1) {
				$scope.wen_head_mobil_ss= data.data;
				$('.wen_head_mobil_ss').append(data.data.content)
			}
		});
	// 移动头部2017
// 移动底部文章
	var params = {};
	// params.method = "item.list.category";  //请求的接口，由后台提供
	params.method = "article.detail.article";
	// params.cat_id=1;
	var p_params = {
		article_id:88,
	};
	params.params = JSON.stringify(p_params);
   //请求的接口，由后台提供
	
	//根据接口需要，可为该对象添加其他参数去请求数据，例如params.goods_code = $scope.goods_code;
	$http.get(baison.get_url('api/', params))
		.success(function(data) {
			if (data.status == 1) {
				// alert("成功");
				$scope.wen_head_text= data.data;
				// alert($scope.cats);
				$('.wen_foot_mobil_ss').append(data.data.content)
			}
		});
	// 移动底部文章
		
	$scope.mini_cart_num = '';
	if(localStorage.mini_cart_num){
		$scope.mini_cart_num = localStorage.mini_cart_num;
	}
	$scope.show_cart = function(show,status){
		if(status!=1){
			$scope.mini_cart_show = !show;
		}
		$scope.mini_cart_loading = true;
		if($scope.mini_cart_show || status==1){
			var params = {};
			params.method = "item.cart.info";
			var p_params = {
				platform_type:1,
			};
			params.params = JSON.stringify(p_params);
			$http.get(baison.get_url('api/', params))
				.success(function(data) {
					if (data.status == 1) {
						$scope.mini_cart_data = data.data;
						localStorage.mini_cart_num = $scope.mini_cart_data.all_num;
						$scope.mini_cart_num = $scope.mini_cart_data.all_num;
						$scope.mini_cart_loading = false;
					}
			});
		}
	};
	
    //加载购物车信息
    var params = {};
	params.method = "item.cart.info";
	var p_params = {
				platform_type:1,
		};
	params.params = JSON.stringify(p_params);
	$http.get(baison.get_url('api/', params))
		.success(function(data) {
			if (data.status == 1) {
				$scope.mini_cart_data = data.data;
				localStorage.mini_cart_num = $scope.mini_cart_data.all_num;
				$scope.mini_cart_num = $scope.mini_cart_data.all_num;
				$scope.mini_cart_loading = false;
			}
	});
    //加载购物车信息END

	
	
	
	$scope.goto_cart = function(){
		$location.path('/cart');
	}

	$scope.goto_jz = function(){
		var params = {};
		params.method = "item.cart.check";
		var p_params = {
			platform_type:1,
		};
		params.params = JSON.stringify(p_params);
		$http.get(baison.get_url('api/', params))
			.success(function(data) {
				if(data.status==1){
					$location.path("/jz");
				}else{
					baison.alert(data.message);
					return false;
				}
			});
	}
	
	//跳到商店
	$scope.shop=function(){
		$rootScope.go_shop='';
		$location.path('/shop');
		}
		
		
	//退出
	$scope.tui=function(){
	var params = {};
	params.method = "member.logout";   //请求的接口，由后台提供
	//params.code=localStorage.code;
	//根据接口需要，可为该对象添加其他参数去请求数据，例如params.goods_code = $scope.goods_code;
	$http.get(baison.get_url('api/', params))
		.success(function(e) {
			if (e.status == 1) {
				$rootScope.user_tui='' ;
				$scope.user_reg="登录/注册";
				baison.alert(e.message)
				$location.path("/home");
			}else{
				baison.alert("退出失败，请稍后重试")
				}
		});
	}
	//end退出
		
	$scope.service=false;
	
	
	
	//菜单列表
	// $(".first_menu").hover(function(){
	// 	// $(".head_list_back").hide();
	// 	// $(".head_list_back").eq($(".first_menu").index(this)).show()
	// 	$(".head_list_back").eq($(".first_menu").index(this)).addClass('show').siblings().removeClass('show');
	// },function(){
	// 	// $(".head_list_back").hide()
	// 	$(".head_list_back").removeClass('show');
	// });
	$scope.first_hover = function(e){
		var n;
		if($(e.target).hasClass('first_menu')){
			n = $(e.target).index();
		}else if($(e.target).parent().hasClass('first_menu')){
			n = $(e.target).parent().index();
		}
		$(".head_list_back").eq(n).addClass('show').siblings().removeClass('show');
	};
	$scope.first_leave = function(e){
		if($(e.target).hasClass('first_menu') || $(e.target).parent().hasClass('first_menu')){
			$(".head_list_back").removeClass('show');
		}
	};
	$scope.block_hover = function(e){
		if(!$(e.target).parent().hasClass('show')){
			$(e.target).parent().addClass('show');
		}
	};
	$scope.block_leave = function(e){
		$(e.target).parent().removeClass('show');
	};
	// $(document).on('mouseover','.head_list_back',function(){
	// 	if(!$(this).hasClass('show')){
	// 		$(this).addClass('show');
	// 	}
	// 	// $(this).show()
	// });
	// $(document).on('mouseout','.head_list_back',function(){
		// $(this).removeClass('show');
		// $(this).show()
	// });
	// $(document).on('mouseover','.logo',function(){
		// $(".head_list_back").hide();
		// $(".head_text_list").hide()
	// });
	//菜单end
	// 菜单品牌
	// $(".text_menu").hover(function(){
	// 	$(".head_text_list").hide();
	// 	$(".head_text_list").eq($(".text_menu").index(this)).show()
	// },function(){
	// 	$(".head_text_list").hide()
	// });
	// $(document).on('mouseover','.head_text_list',function(){
	// 	$(this).show()
	// })
	// // 品牌end
	// $(document).on('mouseover','.head_list1',function(){
	// 	$(".head_list_back").hide('fast');
	// 	$(".head_text_list").hide('fast')
	// })
		//购物车显示
	// $(".cart_bag").click(function(){
	// 	if($(this).attr("biao")==0){
	// 		$(this).attr("biao","1")
	// 		$(".gwc_main").show();
	// 		}else{
	// 			$(this).attr("biao","0")
	// 			$(".gwc_main").hide();
	// 			}
	
		
	// 	})
	//搜索
	$(".search a").eq(1).hide();
	$scope.search_=function(){
		$(".search input").animate({"width":"250px"})
		$(".search a").eq(0).hide();
		$(".search a").eq(1).show().animate({"right":"15px"});
		$(".search span").show();
	}
	
	$scope.head_xx=function(){
		if($(".search input").val()==''){
			$(".search input").animate({"width":"0px"})
			$(".search a").eq(0).show();
			$(".search a").eq(1).hide().animate({"right":"15px"});
			$(".search span").hide();
		}else{
			$(".search input").val("");
		}
	}
	
	//回车提交事件
	$scope.toSearch	 = function(e){
		var keycode = window.event ? e.keyCode : e.which;//获取按键编码  
		if (keycode == 13) {  
			// localStorage.search_key=$('.h_search').val();
			if($location.url().indexOf('/search1') < 0){
				// $location.path("/search1");
				location.href = $location.$$absUrl.split('#')[0] + '#/search1?key=' + $('.h_search').val();
			}else{
				var obj = {
					key:$('.h_search').val()
				};
				$route.updateParams(obj);
				$scope.$emit('search_done',$('.h_search').val());
			}
		}
	}
			 
	//搜索传值
	$scope.search=shou;
	
	function shou(){
		// localStorage.search_key=$('.h_search').val();
		if($location.url().indexOf('/search1') < 0){
			// $location.path("/search1");
			location.href = $location.$$absUrl.split('#')[0] + '#/search1?key=' + $('.h_search').val();
		}else{
			var obj = {
				key:$('.h_search').val()
			};
			$route.updateParams(obj);
			$scope.$emit('search_done',$('.h_search').val());
		}
		/*
		$('.h_search').hide();
		$('.h_search').next().show();
		$('.h_search').next().next().hide();
		$('.h_search').next().next().next().hide();*/
	}
	//wap头部显示
	$scope.wap_head_ctl = function(e){
		var _this = $(e.target);
		if(_this.hasClass("head_list_strong")){
			$(".head_list strong").removeClass("head_list_strong");
			_this.parent().parent().find(".head_list1").hide();
		}else{
			$(".head_list strong").removeClass("head_list_strong");
			_this.addClass("head_list_strong");
			$(".head_list1").hide();
			_this.parent().parent().find(".head_list1").show();
		}
	};
		
	$(".head_list #yu").click(function(){
		if($(this).hasClass("head_list_span1")){
			$(this).removeClass("head_list_span1");
			$(this).parent().find(".head_list1").hide();
			}else{
				$(this).addClass("head_list_span1");
				$(this).parent().find(".head_list1").show();
				}
		})

	$scope.wap_logo_act = function(){
		$(".ico1").attr("biao","0");
		$(".head_f").animate({"left":"-76%"}).hide();
		$("html").animate({"marginLeft":"0","height":"auto"});
		$("html").scrollTop(0);
		$("body").removeAttr("style");
		$location.path('/home');
	};

	$scope.wap_logo_no_act = function(){
		$(".ico1").attr("biao","0");
		$(".head_f").animate({"left":"-76%"}).hide();
		$("html").animate({"marginLeft":"0","height":"auto"});
		$("html").scrollTop(0);
		$("body").removeAttr("style");
	};

	$scope.ToWapMan = function(){
		$(".ico1").attr("biao","0");
		$(".head_f").animate({"left":"-76%"}).hide();
		$("html").animate({"marginLeft":"0","height":"auto"});
		$("html").scrollTop(0);
		$("body").removeAttr("style");
		$location.path('/man');
	}

	$scope.ToWapMiss = function(){
		$(".ico1").attr("biao","0");
		$(".head_f").animate({"left":"-76%"}).hide();
		$("html").animate({"marginLeft":"0","height":"auto"});
		$("html").scrollTop(0);
		$("body").removeAttr("style");
		$location.path('/miss');
	}

	$scope.ToWapChild = function(){
		$(".ico1").attr("biao","0");
		$(".head_f").animate({"left":"-76%"}).hide();
		$("html").animate({"marginLeft":"0","height":"auto"});
		$("html").scrollTop(0);
		$("body").removeAttr("style");
		$location.path('/child');
	}

	$scope.ToWapCustom = function(){
		$(".ico1").attr("biao","0");
		$(".head_f").animate({"left":"-76%"}).hide();
		$("html").animate({"marginLeft":"0","height":"auto"});
		$("html").scrollTop(0);
		$("body").removeAttr("style");
		$location.path('/custom');
	}

	$scope.ToWapBrand = function(){
		$(".ico1").attr("biao","0");
		$(".head_f").animate({"left":"-76%"}).hide();
		$("html").animate({"marginLeft":"0","height":"auto"});
		$("html").scrollTop(0);
		$("body").removeAttr("style");
		$location.path('/gushi');
	}

	$(document).on('click','.wen_head_text .pc_hide a',function(){
		$(".ico1").attr("biao","0");
		$(".head_f").animate({"left":"-76%"}).hide();
		$("html").animate({"marginLeft":"0","height":"auto"});
		$("html").scrollTop(0);
		$("body").removeAttr("style");
	});

	//wap点击滑动
	$scope.wap_show_menu = function(event){
		var _this = $(event.target);
		if(_this.attr("biao")==0){
			var h = $(".head_banner").height() +51;
			_this.attr("biao","1");
			$(".head_f").show().animate({"left":"0","top":h});
			$("html").animate({"marginLeft":"76%","height":"100vh"});
			$("body").css("overflow","hidden");
		}else{
			_this.attr("biao","0");
			$(".head_f").animate({"left":"-76%"}).hide();
			$("html").animate({"marginLeft":"0","height":"auto"});
			$("body").removeAttr("style");
		}
	};
	// $(document).on('click',".head_f a,.ico3,.logo",function(){
	// 			$(".ico1").attr("biao","0");
	// 			$(".head_f").animate({"left":"-76%"}).hide();
	// 			$("html").animate({"marginLeft":"0","height":"auto"})
	// 			$("body").css("overflow","auto");
	// 	})
		
	//中英文切换
	$('.lan p').click(function(){
		if($(this).attr('biao')==0){
			$(this).attr('biao','1').addClass('p_img')
			$('.show_box').show();
		}else{
			$(this).attr('biao','0').removeClass('p_img')
			$('.show_box').hide();
		}
	})
	/*$('.switch.show_box a').click(function(){
		$(this).parent().hide();
		$('.lan p').text($(this).text())
		})*/


	var t = $(".nav").offset().top+50;
	$(".sub_menu").css("top",0);

	// 移动端点击事件隐藏
	$(".head_list_title a").click(function(){
		$('.head_f_moblie').fadeOut();
	});

	// 点击空白处隐藏mini购物车
	$scope.mini_cart_hide = function(e){
		if($(e.target).parents('.gwc_main').length==0 && $(e.target)[0]!=$('.cart_bag a')[0]){
			$scope.mini_cart_show = false;
		}
	};

	$scope.goto_shop = function(){
		$(".ico1").attr("biao","0");
		$(".head_f").animate({"left":"-76%"}).hide();
		$("html").animate({"marginLeft":"0","height":"auto"});
		$("html").scrollTop(0);
		$("body").removeAttr("style");
		
		$rootScope.go_shop=2;
		$rootScope.go_="";
		$location.path('/shop')
	};


//二级菜单跳转事件
// 男士
	//品类
	$scope.ToHomeClass=function(ee){
		// localStorage.e1='';
		// localStorage.e2='';
		// localStorage.e3='';
		// localStorage.e4='';
		// localStorage.e5='';
		// localStorage.reflag="";
		// localStorage.Title="";
		localStorage.code=ee;
		// localStorage.CppId=ee;
		// localStorage.index_man_cls="";
		// localStorage.index_light_cls="";
		localStorage.sex="man";
		// localStorage.Htype="4";

		$scope.pass_data = {
			sex:"man",
			Htype:"4",
			CppId:ee,
			title:"",
			Cateid:ee,
		};
		// $scope.$apply($location.path('/cp'));
		// window.location.reload();
		// $scope.loadData();
		localStorage.f = false;

		$(".ico1").attr("biao","0");
		$(".head_f").animate({"left":"-76%"}).hide();
		$("html").animate({"marginLeft":"0","height":"auto"});
		$("html").scrollTop(0);
		$("body").removeAttr("style");
		// $(event.target).parents('.head_list_back').removeClass('show');
	};
	// 款式
	$scope.ToHomeStyle=function(ee){
		// localStorage.e1='';
		// localStorage.e2='';
		// localStorage.e3='';
		// localStorage.e4='';
		// localStorage.e5='';
		// localStorage.reflag="";
		// localStorage.Title="";
		// localStorage.e1=ee;
		localStorage.sex="man";
		// localStorage.CppId=ee;
		// localStorage.Htype="1";
		// localStorage.index_man_cls="";
		// localStorage.index_light_cls="";

		$scope.pass_data = {
			sex:"man",
			Htype:"1",
			CppId:ee,
			title:"",
			e1:ee,
		};
		// $location.path('/cp');
		// alert(localStorage.CppId);
		 // window.location.reload();
		  // $scope.loadData(); 
		  
		localStorage.f = 1;  
	};
	//材质
	$scope.ToHomeMaterial=function(ee){
		// localStorage.e1='';
		// localStorage.e2='';
		// localStorage.e3='';
		// localStorage.reflag="";
		// localStorage.e4='';
		// localStorage.Title="";
		// localStorage.e5='';
		// localStorage.index_man_cls="";
		// localStorage.index_light_cls="";
		// localStorage.e2=ee;
		// localStorage.CppId=ee;
		localStorage.sex="man";
		// $location.path('/cp');
		// alert(localStorage.CppId);

		// localStorage.Htype="2";

		$scope.pass_data = {
			sex:"man",
			Htype:"2",
			CppId:ee,
			title:"",
			e2:ee,
		};
		 // window.location.reload();
		  // $scope.loadData(); 
		localStorage.f = 3;
	};
	//框型
	$scope.ToHomeframe=function(ee){
		// localStorage.e1='';
		// localStorage.e2='';
		// localStorage.reflag="";
		// localStorage.e3='';
		// localStorage.Title="";
		// localStorage.e4='';
		// localStorage.e5='';
		// 	localStorage.index_man_cls="";
		// localStorage.index_light_cls="";
		// localStorage.e3=ee;
		// localStorage.CppId=ee;
		localStorage.sex="man";
		// alert(localStorage.CppId);
		// $location.path('/cp');
		// localStorage.Htype="3";

		$scope.pass_data = {
			sex:"man",
			Htype:"3",
			CppId:ee,
			title:"",
			e3:ee,
		};
		 // window.location.reload();
		  // $scope.loadData(); 
		localStorage.f = 2;  
	};
// 女士
	// 品类
	$scope.ToHoClass=function(ee){
		// localStorage.e1='';
		// localStorage.e2='';
		// localStorage.e3='';
		// localStorage.reflag="";
		// localStorage.e4='';
		// localStorage.Title="";
		// localStorage.e5='';
		// 	localStorage.index_man_cls="";
		// localStorage.index_light_cls="";
		localStorage.code=ee;
		// localStorage.CppId=ee;
		// // alert(localStorage.CppId);
		localStorage.sex="woman";
		// localStorage.Htype="4";

		localStorage.f = false;

		$scope.pass_data = {
			sex:"woman",
			Htype:"4",
			CppId:ee,
			title:"",
			Cateid:ee,
		};

		$(".ico1").attr("biao","0");
		$(".head_f").animate({"left":"-76%"}).hide();
		$("html").animate({"marginLeft":"0","height":"auto"});
		$("html").scrollTop(0);
		$("body").removeAttr("style");
		// alert(localStorage.code);
		// $location.path('/cp');
	};
	//款式
	$scope.ToHoStyle=function(ee){
		// localStorage.e1='';
		// localStorage.e2='';
		// localStorage.e3='';
		// localStorage.reflag="";
		// localStorage.e4='';
		// localStorage.Title="";
		// localStorage.e5='';
		// 	localStorage.index_man_cls="";
		// localStorage.index_light_cls="";
		// localStorage.e1=ee;
		// localStorage.CppId=ee;
		localStorage.sex="woman";
		// // alert(localStorage.CppId);
		// localStorage.Htype="1";


		$scope.pass_data = {
			sex:"woman",
			Htype:"1",
			CppId:ee,
			title:"",
			e1:ee,
		};
		localStorage.f = 1;
		// $location.path('/cp');
	};
	//材质
	$scope.ToHoMaterial=function(ee){
		// localStorage.e1='';
		// localStorage.e2='';
		// localStorage.e3='';
		// localStorage.reflag="";
		// localStorage.e4='';
		// localStorage.Title="";
		// localStorage.e5='';
		// 	localStorage.index_man_cls="";
		// localStorage.index_light_cls="";
		localStorage.sex="woman";
		// localStorage.CppId=ee;
		// // alert(localStorage.CppId);
		// localStorage.e2=ee;
		// localStorage.Htype="2";

		$scope.pass_data = {
			sex:"woman",
			Htype:"2",
			CppId:ee,
			title:"",
			e2:ee,
		};
		localStorage.f = 3;
		// $location.path('/cp');
	};
	// 框型
	$scope.ToHoframe=function(ee){
		// localStorage.e1='';
		// localStorage.e2='';
		// localStorage.e3='';
		// localStorage.reflag="";
		// localStorage.Title="";
		// localStorage.e4='';
		// localStorage.e5='';
		// 	localStorage.index_man_cls="";
		// localStorage.index_light_cls="";
		localStorage.sex="woman";
		// localStorage.CppId=ee;
		// localStorage.e3=ee;
		// // alert(localStorage.CppId);
		// localStorage.Htype="3";

		$scope.pass_data = {
			sex:"woman",
			Htype:"3",
			CppId:ee,
			title:"",
			e3:ee,
		};
		localStorage.f = 2;
		// $location.path('/cp');
	};
//儿童
	// 款式
	$scope.ToHCStyle=function(ee){
		// localStorage.e1='';
		// localStorage.e2='';
		// localStorage.e3='';
		// localStorage.e4='';
		// localStorage.reflag="";
		// localStorage.Title="";
		// localStorage.e5='';
		localStorage.code="";
		// 	localStorage.index_man_cls="";
		// localStorage.index_light_cls="";
		// localStorage.e1=ee;
		// localStorage.CppId=ee;
		localStorage.sex="children";
		// // alert(localStorage.CppId);
		// localStorage.Htype="1";

		$scope.pass_data = {
			sex:"children",
			Htype:"1",
			CppId:ee,
			title:"",
			e1:ee,
		};
		localStorage.f = false;
		// $location.path('/cp');
	};
	// 材质
	$scope.ToHCMaterial=function(ee){
		// localStorage.e1='';
		// localStorage.e2='';
		// localStorage.e3='';
		// localStorage.e4='';
		// localStorage.Title="";
		// localStorage.reflag="";
		// localStorage.e5='';
		localStorage.code="";
		// 	localStorage.index_man_cls="";
		// localStorage.index_light_cls="";
		localStorage.sex="children";
		// localStorage.CppId=ee;
		// // alert(localStorage.CppId);
		// localStorage.e2=ee;
		// localStorage.Htype="2";

		$scope.pass_data = {
			sex:"children",
			Htype:"2",
			CppId:ee,
			title:"",
			e2:ee,
		};
		localStorage.f = 3;
		// $location.path('/cp');
	};
	// 框形
	$scope.ToHCframe=function(ee){
		// localStorage.e1='';
		// localStorage.e2='';
		// localStorage.e3='';
		// localStorage.reflag="";
		// localStorage.Title="";
		// localStorage.e4='';
		// localStorage.e5='';
		// 	localStorage.index_man_cls="";
		// localStorage.index_light_cls="";
		localStorage.code="";
		localStorage.sex="children";
		// localStorage.CppId=ee;
		// localStorage.e3=ee;
		// // alert(localStorage.CppId);
		// localStorage.Htype="3";

		$scope.pass_data = {
			sex:"children",
			Htype:"3",
			CppId:ee,
			title:"",
			e3:ee,
		};
		localStorage.f = 2;
		// $location.path('/cp');
	};
//全定制
	//全定定制
	$scope.ToCUcustom=function(){
		// localStorage.e1='';
		// localStorage.e2='';
		// localStorage.e3='';
		// localStorage.reflag="";
		// localStorage.e4='';
		// localStorage.e5='';
		localStorage.clas_id='';
		$(".ico1").attr("biao","0");
		$(".head_f").animate({"left":"-76%"}).hide();
		$("html").animate({"marginLeft":"0","height":"auto"});
		$("html").scrollTop(0);
		$("body").removeAttr("style");
	}
	// // 款式
	// $scope.ToCUSStyle=function(ee){
	// 	localStorage.e1='';
	// 	localStorage.e2='';
	// 	localStorage.e3='';
	// 	localStorage.reflag="";
	// 	localStorage.e4='';
	// 	localStorage.e5='';
	// 	localStorage.clas_id='';
	// 	localStorage.e1=ee;
	// 	// $location.path('/custom');

	// };
	// // 材质
	// $scope.ToCUSMaterial=function(ee){
	// 	localStorage.e1='';
	// 	localStorage.e2='';
	// 	localStorage.reflag="";
	// 	localStorage.e3='';
	// 	localStorage.e4='';
	// 	localStorage.e5='';
	// 	localStorage.clas_id='';
	// 	localStorage.e2=ee;
	// 	// $location.path('/custom');

	// };
	// //框型
	// $scope.ToCUSframe=function(ee){
	// 	localStorage.e1='';
	// 	localStorage.e2='';
	// 	localStorage.reflag="";
	// 	localStorage.e3='';
	// 	localStorage.e4='';
	// 	localStorage.e5='';
	// 	localStorage.clas_id='';
	// 	localStorage.e3=ee;
	// 	// $location.path('/custom');
		
	// };

	$scope.$on('cart_animate',function(event,obj){
		$scope.show_cart(false,1);
		// obj.offset().left
		var clone_html = obj.clone();
		clone_html.css({
			position:'absolute',
			width:'100px',
			height:'100px',
		});
		clone_html.addClass('wap_hide');

		var x = $('.good_info .xq').scrollLeft();
		var y = $('.good_info').offset().top;
		var X = $('.cart_bag').offset().left;
		var Y = $('.headbar').offset().top;
		var w_y = $(document).scrollTop();
		var parent = obj.parent();
		if($('.good_info .xq').length > 0){
			if($('.good_info .xq').length > 1){
				$('.good_info .xq').eq(0).append(clone_html);
			}else{
				$('.good_info .xq').append(clone_html);
			}
		}else{
			$('.good_info .main_img').append(clone_html);
		}
		var n_y = y-w_y;
		if(w_y>200){
			n_y = 42;
		}
		if(!clone_html.is(':animated')){	
			clone_html.css({'left': 350,'top': n_y,'position':'fixed'}).animate({'left': X - 20,'top': 42},800,function() {
				clone_html.stop(false, false).animate({'top': 0,'opacity':0},600,function(){
					clone_html.fadeOut(300,function(){
						clone_html.remove();
					});
				});
			});	
		};

	});

	$scope.$on('wap_add_cart',function(event){
		$scope.show_cart(false,1);
	});
});




