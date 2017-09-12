//首页控制器[]
myApp.controller('homeCtrl',function($scope,$http,$window,$anchorScroll,$sce,$location,$rootScope){
	$anchorScroll();
	$('#video_box').bind('contextmenu',function() { return false; });
	//视频
	$scope.videoUrl = function(url){
		return $sce.trustAsResourceUrl(url);
	};
	//轮播图
	var params = {};
	params.method = "article.list.article";
	var p_params = {
		cat_id: 1,
		m:1
	};
	params.params = JSON.stringify(p_params);
	//根据接口需要，可为该对象添加其他参数去请求数据，例如params.goods_code = $scope.goods_code;
	$http.get(baison.get_url('api/', params))
		.success(function(data) {
			if (data.status == 1) {
				// alert("成功");
				$scope.cats= data.data;
				// alert($scope.cats);
				
			} else {
				// baison.alert(data.message);
				// alert("shibai");
			}
		});

	$scope.isRepeat=function(){
		var swiper = new Swiper('.swiper-container', {
			pagination: '.swiper-pagination',
			paginationClickable: true,
			autoplay:3000
		});
	};

	/*
	$scope.refresh = function() { 
		//$window.location.reload();
		location.reload();
	}*/

	//特别推荐
	var params = {};
	params.method = "item.most.wanted";
	// params.cat_id=1;
	var p_params = {
		type: 1
	};
	params.params = JSON.stringify(p_params);
	//请求的接口，由后台提供

	//根据接口需要，可为该对象添加其他参数去请求数据，例如params.goods_code = $scope.goods_code;
	$http.get(baison.get_url('api/', params))
		.success(function(data) {
			if (data.status == 1) {
				// alert("成功");
				$scope.TeBies= data.data;
		
			} else {
				// baison.alert(data.message);
			}
		});

	//文章home_process极致工艺
	var params = {};
	// params.method = "item.list.category";  //请求的接口，由后台提供
	params.method = "article.detail.article";
	// params.cat_id=1;
	var p_params = {
		article_id:38
	};
	params.params = JSON.stringify(p_params);

	//根据接口需要，可为该对象添加其他参数去请求数据，例如params.goods_code = $scope.goods_code;
	$http.get(baison.get_url('api/', params))
		.success(function(data) {
			if (data.status == 1) {
				// alert("成功");
				$scope.home_process= data.data;
				// alert($scope.cats);
				$('.wen_home1').append(data.data.content)
		
			} else {
				// baison.alert(data.message);
				// alert("shibai");
			}
		});

	//文章home_story品牌故事
	var params = {};
	// params.method = "item.list.category";  //请求的接口，由后台提供
	params.method = "article.detail.article";
	// params.cat_id=1;
	var p_params = {
		article_id:42
	};
	params.params = JSON.stringify(p_params);

	//根据接口需要，可为该对象添加其他参数去请求数据，例如params.goods_code = $scope.goods_code;
	$http.get(baison.get_url('api/', params))
		.success(function(data) {
			if (data.status == 1) {
				// alert("成功");
				$scope.home_story= data.data;
				// alert($scope.cats);
				$('.wen_home2').append(data.data.content)
		
			} else {
				// baison.alert(data.message);
				// alert("shibai");
			}
		});

	//文章home_about联系我们
	var params = {};
	// params.method = "item.list.category";  //请求的接口，由后台提供
	params.method = "article.detail.article";
	// params.cat_id=1;
	var p_params = {
		article_id:43
	};
	params.params = JSON.stringify(p_params);

	//根据接口需要，可为该对象添加其他参数去请求数据，例如params.goods_code = $scope.goods_code;
	$http.get(baison.get_url('api/', params))
		.success(function(data) {
			if (data.status == 1) {
				// alert("成功");
				$scope.home_about= data.data;
				// alert($scope.cats);
				// $('.wen_home3').append(data.data.content)
		
			} else {
				// baison.alert(data.message);
				// alert("shibai");
			}
		});

//文章零售店铺
	var params = {};
	// params.method = "item.list.category";  //请求的接口，由后台提供
	params.method = "article.detail.article";
	// params.cat_id=1;
	var p_params = {
		article_id:67
	};
	params.params = JSON.stringify(p_params);

	//根据接口需要，可为该对象添加其他参数去请求数据，例如params.goods_code = $scope.goods_code;
	$http.get(baison.get_url('api/', params))
		.success(function(data) {
			if (data.status == 1) {
				// alert("成功");
				$scope.home_stores= data.data;
				// alert($scope.cats);
				// $('.wen_home3').append(data.data.content)
			} else {
				// baison.alert(data.message);
				// alert("shibai");
			}
		});
	//文章太阳镜
	var params = {};
	// params.method = "item.list.category";  //请求的接口，由后台提供
	params.method = "article.detail.article";
	// params.cat_id=1;
	var p_params = {
		article_id:68
	};
	params.params = JSON.stringify(p_params);

	//根据接口需要，可为该对象添加其他参数去请求数据，例如params.goods_code = $scope.goods_code;
	$http.get(baison.get_url('api/', params))
		.success(function(data) {
			if (data.status == 1) {
				// alert("成功");
				$scope.home_Sunglasses= data.data;
				// alert($scope.cats);
				// $('.wen_home3').append(data.data.content)
		
			} else {
				// baison.alert(data.message);
				// alert("shibai");
			}
		});

	//文章光学镜
	var params = {};
	// params.method = "item.list.category";  //请求的接口，由后台提供
	params.method = "article.detail.article";
	// params.cat_id=1;
	var p_params = {
		article_id:69
	};
	params.params = JSON.stringify(p_params);

	//根据接口需要，可为该对象添加其他参数去请求数据，例如params.goods_code = $scope.goods_code;
	$http.get(baison.get_url('api/', params))
		.success(function(data) {
			if (data.status == 1) {
				// alert("成功");
				$scope.home_Optical= data.data;
				// alert($scope.cats);
				// $('.wen_home3').append(data.data.content)
			} else {
				// baison.alert(data.message);
				// alert("shibai");
			}
		});

	//文章专属定制
	var params = {};
	// params.method = "item.list.category";  //请求的接口，由后台提供
	params.method = "article.detail.article";
	// params.cat_id=1;
	var p_params = {
		article_id:70
	};
	params.params = JSON.stringify(p_params);
   //请求的接口，由后台提供

	//根据接口需要，可为该对象添加其他参数去请求数据，例如params.goods_code = $scope.goods_code;
	$http.get(baison.get_url('api/', params))
		.success(function(data) {
			if (data.status == 1) {
				// alert("成功");
				$scope.home_customs= data.data;
				// alert($scope.cats);
				// $('.wen_home3').append(data.data.content)
			} else {
				// baison.alert(data.message);
				// alert("shibai");
			}
		});

	//文章15周年
	var params = {};
	// params.method = "item.list.category";  //请求的接口，由后台提供
	params.method = "article.detail.article";
	// params.cat_id=1;
	var p_params = {
		article_id:34
	};
	params.params = JSON.stringify(p_params);

	//根据接口需要，可为该对象添加其他参数去请求数据，例如params.goods_code = $scope.goods_code;
	$http.get(baison.get_url('api/', params))
		.success(function(data) {
			if (data.status == 1) {
				// alert("成功");
				$scope.WenHomeYear= data.data;
				// alert($scope.cats);
				$('.wen_home4').append(data.data.content)
			} else {
				// baison.alert(data.message);
				// alert("shibai");
			}
		});
	//banner视频
	$(document).on('click','.banner_back',function(){
		$(this).hide();
		$(this).parent().parent().find("img").addClass("opacity");
		$(".banner_sp").eq($(".banner_back").index(this)).show().get(0).play();
		$(".swiper-pagination").hide();
		$('.banner_x').hide()
	});

	//瞄点对应滚动
 // $(".footer_top").click(function(event) { 
 //     $("html,body").animate({scrollTop:0}, 500);
 //   });
 // 特别推荐事件跳转
    $scope.ToHome=function(ee){
		// localStorage.cpcode=ee;
		// $location.path('/xq');
		location.href = $location.$$absUrl.split('#')[0] + '#/xq?code=' + ee;
	};

	if (screen.width >768) {
		fro="1";
	}else{
		fro="5";
	}

	var url_str = '';
	// 太阳
	$scope.CpTaiyang=function(ee){
		// localStorage.index_man_cls = 1;
		// localStorage.Title="太阳镜";

		var params = {};
		params.method = "item.pic.category";
		var p_params = {
			code:"man_sg,woman_sg,children_bsg,children_gsg",
			from:fro,
		};
		params.params = JSON.stringify(p_params);
		$http.get(baison.get_url('api/', params))
			.success(function(data) {
				// localStorage.ctype = "";
				if (data.status == 1 && 1 < data.data.length) {
					// localStorage.index_light_cls="";
					localStorage.sex="main";
					// localStorage.Htype="4";
					// localStorage.reflag="1";

					// localStorage.e1 = "";
					// localStorage.e2 = "";
					// localStorage.e3 = "";
					// localStorage.e4 = "";
					// localStorage.e5 = "";
					// localStorage.CppId = 
					localStorage.code = data.data;
					url_str += 'sex=main&Htype=4&reflag=1&CppId='+data.data+'&index_man_cls=1';
				} else if (data.status == 1 && 1 >= data.data.length) {
					// localStorage.index_light_cls="";
					localStorage.sex="main";
					// localStorage.Htype="4";
					// localStorage.reflag="1";

					// localStorage.e1 = "";
					// localStorage.e2 = "";
					// localStorage.e3 = "";
					// localStorage.e4 = "";
					// localStorage.e5 = "";
					// localStorage.CppId = 
					localStorage.code = data.data[0];
					//localStorage.Title = data.data.platform_category_name;
					url_str += 'sex=main&Htype=4&reflag=1&CppId='+data.data[0]+'&index_man_cls=1';
				} else {
					// localStorage.CppId = 
					localStorage.code = data.data.platform_category_id;
					url_str += 'CppId='+data.data.platform_category_id+'&index_man_cls=1';
					//localStorage.Title = data.data.platform_category_name;
					baison.alert(data.message);
				}
			})
			.then(function () {
				// $location.path('/cp');
				location.href = $location.$$absUrl.split('#')[0] + '#/cp?' + url_str;
			});
	};
	//光学
	$scope.CpGuang=function(ee){
		// localStorage.index_light_cls = 1;
		// localStorage.Title="光学镜";

		var params = {};
		params.method = "item.pic.category";
		var p_params = {
			code:"man_of,woman_of",
			from:fro,
		};
		params.params = JSON.stringify(p_params);
		$http.get(baison.get_url('api/', params))
			.success(function(data) {
				localStorage.ctype = "";
				if (data.status == 1 && 1 < data.data.length) {
					// localStorage.index_man_cls = "";
					localStorage.sex = "main";
					// localStorage.Htype = "4";
					// localStorage.reflag = "1";

					// localStorage.e1 = "";
					// localStorage.e2 = "";
					// localStorage.e3 = "";
					// localStorage.e4 = "";
					// localStorage.e5 = "";
					// localStorage.CppId = 
					localStorage.code = data.data;
					// localStorage.Title = "光学镜";
					url_str += 'sex=main&Htype=4&reflag=1&CppId='+data.data+'&index_light_cls=1';
				} else if (data.status == 1 && 1 >= data.data.length) {
					// localStorage.index_man_cls = "";
					localStorage.sex = "main";
					// localStorage.Htype = "4";
					// localStorage.reflag = "1";

					// localStorage.e1 = "";
					// localStorage.e2 = "";
					// localStorage.e3 = "";
					// localStorage.e4 = "";
					// localStorage.e5 = "";
					// localStorage.CppId = 
					localStorage.code = data.data[0];
					//localStorage.Title = data.data.platform_category_name;
					url_str += 'sex=main&Htype=4&reflag=1&CppId='+data.data[0]+'&index_light_cls=1';
				} else {
					// localStorage.CppId = 
					localStorage.code = data.data.platform_category_id;
					url_str += 'CppId='+data.data.platform_category_id+'&index_light_cls=1';
					//localStorage.Title = data.data.platform_category_name;
					baison.alert(data.message);
				}
			})
			.then(function () {
				// $location.path('/cp');
				location.href = $location.$$absUrl.split('#')[0] + '#/cp?' + url_str;
			});
	};

	//全国商店
	$scope.home_shop=function(){
		$rootScope.go_shop=1;
		$location.path('/shop')
	}
});
