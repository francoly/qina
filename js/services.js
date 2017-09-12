//自定义服务
var myServices = angular.module("myServices", []);

//例1：生成函数
myServices.factory('UserService',function($http){
	var current_user;	
	return{
		getCurrentUser:function(){
			return current_user;	
		},
		setCurrentUser:function(user){
			current_user = user;
		}
	}
});

//例2：生成对象
myServices.factory('githubService',function($http){
	var serviceInstance = {};
	return serviceInstance;
});



//封装调用接口的请求服务——通过将方法设置为服务对象的一个属性来将其暴露给外部
myServices.factory('apiService',function($http){
	var site = 'http://m.caixuan.com';
	
	var runUserRequest = function(params){
		var site_url = site;
		//var sid =localStorage.getItem('sid');
		site_url +='?app_act=api/';
		//params['sid']=sid;
		for( var x in params ){
			 site_url+='&'+x+'='+params[x];
		}
		site_url += '&sign='+create_sign( params );
		
		return $http({
			method:'GET',
			url:site_url
		});

	}
	
	var create_sign = function(sign_arr){

	    var array = new Array();
	    var appkey = 'baison';
	    var secrect = '123456';  
         for(var key in sign_arr )  
         {
             if( key == '' || key == 'act' || key == 'method' || key == 'sign' ) continue;  
             array.push(key);  
         }  
         array.sort();
         // ƴ������Ĳ�����-ֵ��  
         var paramArray = new Array();  
         paramArray.push(secrect);  
         for(var index in array)  
         {  
             var key = array[index];
             paramArray.push(key+sign_arr[key]);  
         }  
        paramArray.push(appkey);
        //return paramArray.join("");
        return hex_md5( paramArray.join(""));    

	}
	
	//返回带有一个events函数的服务对象
	return{
		events:function(params){
			return runUserRequest(params);
		}
	}
});


