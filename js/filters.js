//自定义过滤器
var myFilters = angular.module("myFilters", []);
myFilters.filter('formaMoney', function () {
    return function (item) {
        return item / 10000;
    };
});
myFilters.filter('timestamp', function () { //时间转化为事件戳
    return function (item) {
		var item = Date.parse(new Date(item));
		return item;
    };
});
myFilters.filter('default', function () { //设置默认值
    return function (val,text) {
        if(val == '' || val == undefined || val=='/' || val== '/'+1){
            val = text;
        }
        return val;
    };
});