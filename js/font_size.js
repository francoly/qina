
$(function(){

	var oHtml=document.documentElement;

	getSize();
	function getSize(){

		var screenWidth=oHtml.clientWidth;

		if (screenWidth>=640) {

			oHtml.style.fontSize='40px';

		}else if (screenWidth<=320) {

			oHtml.style.fontSize='20px';

		}else{

			oHtml.style.fontSize=screenWidth/(640/40)+'px';
		}
	}

	window.onresize=function(){
		getSize();
	};
});
//tab切换
function tabFun(tab,content,current){
    var conNum = 0;
    $(tab).click(function(){
        $(this).addClass(current).siblings().removeClass(current);
        conNum =$(this).index();
        $(content).eq(conNum).show().siblings().hide(); 
        return false;
    }); 
}
tabFun(".orderTitle a",".order_state>div","current");
