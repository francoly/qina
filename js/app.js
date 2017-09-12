//配置路由，一个控制器对应一个模板，默认指向首页，如有不正确路径也重定向为首页
var myApp = angular.module('myApp', ['ngRoute','ngAnimate','myDirectives','myFilters','myServices','lazyload']);
myApp.value("userll","sadasd");
myApp.config(['$routeProvider','$locationProvider',function ($routeProvider,$locationProvider) {
				$routeProvider
				.when('/', {
					templateUrl: 'html/home.html',
					controller: 'homeCtrl'
				})
				.when('/home', {
					templateUrl: 'html/home.html',
					controller: 'homeCtrl'
				})
				//可继续往下添加新路由	
				.when('/about', {
					templateUrl: 'html/about.html',
					controller: 'aboutCtrl'
				})
				.when('/pinpai', {
					templateUrl: 'html/pinpai.html',
					controller: 'pinpaiCtrl'
				})
				.when('/bianjidizhi', {
					templateUrl: 'html/bianjidizhi.html',
					controller: 'bianjidizhiCtrl'
				})
				.when('/querendingdan', {
					templateUrl: 'html/querendingdan.html',
					controller: 'querendingdanCtrl'
				})
				.when('/tianjiadizhi', {
					templateUrl: 'html/tianjiadizhi.html',
					controller: 'tianjiadizhi'
				})
				.when('/user_center', {
					templateUrl: 'html/user_center.html',
					controller: 'user_center'
				})
				//可继续往下添加新路由
				.otherwise({
					redirectTo: '/'
				});
				//$locationProvider.html5Mode(true);
			}]);
			
			