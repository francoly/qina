//测试控制器
myApp.controller('aboutCtrl',function($scope,$anchorScroll,$http){
	$anchorScroll();
			//文章添加
	var params = {};
	// params.method = "item.list.category";  //请求的接口，由后台提供
	params.method = "article.detail.article";
	// params.cat_id=1;
	var p_params = {
		article_id:60,
	};
	params.params = JSON.stringify(p_params);
   //请求的接口，由后台提供
	
	//根据接口需要，可为该对象添加其他参数去请求数据，例如params.goods_code = $scope.goods_code;
	$http.get(baison.get_url('api/', params))
		.success(function(data) {
			if (data.status == 1) {
				$scope.zhang_about= data.data;
				$('.wen_about').eq(0).append(data.data.content)
				$('.wen_about').eq(1).append(data.data.m_content)
			} else {
				// baison.alert(data.message);
				// alert("shibai");
			}
		});
});




