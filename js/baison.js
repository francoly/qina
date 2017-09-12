/*
model:baison.js
author:guoxuemin
created:2012-3-29
email:469477762@qq.com
*/

var baison = {
	smoketimeout: [],
	//site: "http://ishop.test.baison.com.cn/ishop/web/",
	site: "https://www.bolon.cn/ishop/web/",
	//site: "http://local.bolon.com/ishop/web/",
	init: false,
	zindex: 999999, //遮罩层初始层叠顺序
	get_url: function(app_act, params) { //get 请求处理url 
		var site_url = baison.site;
		//原先请求部分
		var sid = localStorage.getItem('sid');
		site_url += '?app_act=' + app_act;
		//params['sid'] = sid;
		for (var x in params) {
			site_url += '&' + x + '=' + params[x];
		}
		site_url += '&sign=' + this.create_sign(params);

		return site_url;

		//

	},
	gsid_url: function(app_act) {
		var site_url = baison.site;
		site_url += '?app_act=' + app_act;
		site_url += '&sign=' + this.create_sign();

		return site_url;
	},
	create_sign: function(sign_arr) {
		var array = new Array();
		var appkey = 'baison';
		var secrect = '123456';
		for (var key in sign_arr) {
			if (key == '' || key == 'act' || key == 'method' || key == 'sign') continue;
			array.push(key);
		}
		array.sort();
		// ƴ������Ĳ�����-ֵ��
		var paramArray = new Array();
		paramArray.push(secrect);
		for (var index in array) {
			var key = array[index];
			paramArray.push(key + sign_arr[key]);
		}
		paramArray.push(appkey);
		//return paramArray.join("");
		return hex_md5(paramArray.join(""));
	},
	bodyload: function(id) {
		var ff = document.createElement('div');
		ff.setAttribute('id', 'baison-out-' + id);
		ff.className = 'baison-base';
		ff.style.zIndex = baison.zindex;
		baison.zindex++;
		document.body.appendChild(ff);
	},
	newdialog: function() {
		var newid = new Date().getTime();
		newid = Math.random(1, 99) + newid; //当前时间毫秒数+随机数,避免id重复的可能性

		if (!baison.init) {
			baison.listen(window, "load", function() {
				baison.bodyload(newid);
			});
		} else {
			baison.bodyload(newid);
		}

		return newid;
	},
	forceload: function() {},
	build: function(e, f) {
		//e = e.replace(/\n/g,'<br />');
		//e = e.replace(/\r/g,'<br />');
		e = "<div class='dialog-con'>" + e + "</div>";
		var prompt = '',
			ok = '确定',
			cancel = '取消',
			className = '',
			buttons = '',
			popup = '',
			title = f.params.title ? f.params.title : '提示',
			close = '<p id="close-' + f.newid + '" class="close">×</p>',
			box = '',
			timeout = '';
		if (f.type === 'prompt') {
			prompt =
				'<div class="dialog-prompt">' +
				'<input id="dialog-input-' + f.newid + '" type="text" ' + (f.params.value ? 'value="' + f.params.value + '"' : '') + ' />' +
				'</div>';
		}
		if (f.params.ok) {
			ok = f.params.ok;
		}
		if (f.params.cancel) {
			cancel = f.params.cancel;
		}

		if (f.params.className) {
			className = f.params.className;
		}
		if (f.type == 'signal') {
			//alert(f.timeout);
			timeout = "<div class='timeout'>还剩<b id='timeout-" + f.newid + "'>" + f.timeout / 1000 + "</b>秒自动关闭</div>"
		}
		if (f.type !== 'signal' && f.type !== 'popup') {
			buttons = '<div class="dialog-buttons average">';
			if (f.type === 'alert') {
				buttons +=
					'<p class="button" id="alert-ok-' + f.newid + '">' + ok + '</p>';
			} else if (f.type === 'prompt' || f.type === 'confirm') {
				if (f.params.reverseButtons) {
					buttons +=
						'<p class="button cancel" id="' + f.type + '-cancel-' + f.newid + '">' + cancel + '</p>' +
						'<p class="button ok" id="' + f.type + '-ok-' + f.newid + '">' + ok + '</p>';
				} else {
					if (f.params.signalbtn) {
						buttons +=
							'<p class="button ok" id="' + f.type + '-ok-' + f.newid + '">' + ok + '</p>';
					} else {
						buttons +=
							'<p class="button ok" id="' + f.type + '-ok-' + f.newid + '">' + ok + '</p>' +
							'<p class="button cancel" id="' + f.type + '-cancel-' + f.newid + '" >' + cancel + '</p>';
					}
				}
			}
			buttons += '</div>';
		}

		box =
			'<div id="baison-bg-' + f.newid + '" class="smokebg"></div>' +
			'<div class="dialog baison ' + className + '">' +
			'<div class="dialog-inner"><div class="inner-inner">' +
			'<div class="dialog-title">' + title + close + '</div>' +
			e +
			prompt +
			timeout +
			buttons +
			'</div></div>' +
			'</div>';

		if (!baison.init) {
			baison.listen(window, "load", function() {
				baison.finishbuild(e, f, box);
			});
		} else {
			baison.finishbuild(e, f, box);
		}

	},
	finishbuild: function(e, f, box) {
		var ff = document.getElementById('baison-out-' + f.newid);
		ff.className = 'baison-base baison-visible baison-' + f.type;
		ff.innerHTML = box;
		while (ff.innerHTML === "") {
			ff.innerHTML = box;
		}

		// 清除队列事件
		if (baison.smoketimeout[f.newid + 1]) {
			clearInterval(baison.smoketimeout[f.newid + 1]);
		}
		if (baison.smoketimeout[f.newid]) {
			clearTimeout(baison.smoketimeout[f.newid]);
		}
		// 点击当前背景关闭
		baison.listen(
			document.getElementById('baison-bg-' + f.newid),
			"click",
			function() {
				baison.destroy(f.type, f.newid);
				if (f.type === 'prompt' || f.type === 'confirm') {
					f.callback(false);
				} else if (f.type === 'alert' && typeof f.callback !== 'undefined') {
					f.callback();
				}
			}
		);
		baison.listen(
			document.getElementById('close-' + f.newid),
			"click",
			function() {
				baison.destroy(f.type, f.newid);
				if (f.type === 'prompt' || f.type === 'confirm') {
					f.callback(false);
				} else if (f.type === 'alert' && typeof f.callback !== 'undefined') {
					f.callback();
				}
			}
		);
		// 按钮事件
		switch (f.type) {
			case 'alert':
				baison.finishbuildAlert(e, f, box);
				break;
			case 'popup':
				baison.finishbuildPopup(e, f, box);
				break;
			case 'confirm':
				baison.finishbuildConfirm(e, f, box);
				break;
			case 'prompt':
				baison.finishbuildPrompt(e, f, box);
				break;
			case 'signal':
				baison.finishbuildSignal(e, f, box);
				break;
			default:
				throw "Unknown type: " + f.type;
		}
	},
	finishbuildAlert: function(e, f, box) {
		baison.listen(
			document.getElementById('alert-ok-' + f.newid),
			"click",
			function() {
				baison.destroy(f.type, f.newid);
				if (typeof f.callback !== 'undefined') {
					f.callback();
				}
			}
		);

		//绑定回车、空格、退出键 关闭事件
		document.onkeyup = function(e) {
			if (!e) {
				e = window.event;
			}
			if (e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 27) {
				baison.destroy(f.type, f.newid);
				if (typeof f.callback !== 'undefined') {
					f.callback();
				}
			}
		};
	},
	finishbuildPopup: function(e, f) {
		//绑定回车、空格、退出键 关闭事件
		document.onkeyup = function(e) {
			if (!e) {
				e = window.event;
			}
			if (e.keyCode === 27) {
				baison.destroy(f.type, f.newid);
			}
		};
	},
	finishbuildConfirm: function(e, f, box) {
		baison.listen(
			document.getElementById('confirm-cancel-' + f.newid),
			"click",
			function() {
				baison.destroy(f.type, f.newid);
				f.callback(false);
			}
		);

		baison.listen(
			document.getElementById('confirm-ok-' + f.newid),
			"click",
			function() {
				baison.destroy(f.type, f.newid);
				f.callback(true);
			}
		);

		// 回车键和空格键关闭并返回true,退出键关闭并返回false；
		document.onkeyup = function(e) {
			if (!e) {
				e = window.event;
			}
			if (e.keyCode === 13 || e.keyCode === 32) {
				baison.destroy(f.type, f.newid);
				f.callback(true);
			} else if (e.keyCode === 27) {
				baison.destroy(f.type, f.newid);
				f.callback(false);
			}
		};
	},
	finishbuildPrompt: function(e, f, box) {
		var pi = document.getElementById('dialog-input-' + f.newid);
		setTimeout(function() {
			pi.focus();
			pi.select();
		}, 100);

		// 绑定‘取消按钮’事件
		baison.listen(
			document.getElementById('prompt-cancel-' + f.newid),
			"click",
			function() {
				baison.destroy(f.type, f.newid);
				f.callback(false);
			}
		);

		// 绑定“确定按钮”事件
		baison.listen(
			document.getElementById('prompt-ok-' + f.newid),
			"click",
			function() {
				baison.destroy(f.type, f.newid);
				f.callback(pi.value);
			}
		);

		// 回车键关闭并返回true,退出键关闭并返回false；
		document.onkeyup = function(e) {
			if (!e) {
				e = window.event;
			}

			if (e.keyCode === 13) {

				//回车不做处理baison.destroy(f.type, f.newid);
				//f.callback(pi.value);
			} else if (e.keyCode === 27) {
				baison.destroy(f.type, f.newid);
				f.callback(false);
			}
		};
	},
	//定时器
	finishbuildSignal: function(e, f, box) {
		var time = parseInt(f.timeout) / 1000;
		baison.smoketimeout[f.newid + 1] = setInterval(function() {
				time -= 1;
				document.getElementById('timeout-' + f.newid).innerHTML = time;
			},
			1000);
		baison.smoketimeout[f.newid] = setTimeout(function() {
			baison.destroy(f.type, f.newid);
			clearInterval(baison.smoketimeout[f.newid + 1]);
			baison.smoketimeout[f.newid + 1] = null;
		}, f.timeout);
	},
	destroy: function(type, id) {
		var box = document.getElementById('baison-out-' + id),
			okButton = document.getElementById(type + '-ok-' + id),
			cancelButton = document.getElementById(type + '-cancel-' + id);
		while (box == null) {
			return true;
		}
		box.className = 'baison-base'; //通过重置类实现隐藏关闭
		// 取消“确定按钮”绑定事件
		if (okButton) {
			baison.stoplistening(okButton, "click", function() {});
			document.onkeyup = null;
		}
		if (baison.smoketimeout[id + 1]) {
			clearInterval(baison.smoketimeout[id + 1]);
		}
		// 取消“取消按钮”绑定事件
		if (cancelButton) {
			baison.stoplistening(cancelButton, "click", function() {});
		}
		//box.innerHTML = '';
		document.body.removeChild(box);
	},
	alert: function(e, f, g) {
		if (typeof f !== 'object') {
			g = f;
			f = false;
		}
		var id = baison.newdialog();
		baison.build(e, {
			type: 'alert',
			callback: g,
			params: f,
			newid: id
		});
	},
	signal: function(e, f) {
		if (typeof f === 'undefined') {
			f = 1000;
		}

		var id = baison.newdialog();
		baison.build(e, {
			type: 'signal',
			timeout: f,
			params: false,
			newid: id
		});
	},
	popup: function(e, f) {
		if (typeof e == 'object') {
			f = e;
			e = '';
		}
		if (typeof f !== 'object') {
			f = false;
		}
		var id = baison.newdialog();
		baison.build(e, {
			type: 'popup',
			callback: false,
			params: f,
			newid: id
		});
	},
	confirm: function(e, f, g) {
		if (typeof g !== 'object') {
			g = false;
		}

		var id = baison.newdialog();
		baison.build(e, {
			type: 'confirm',
			callback: f,
			params: g,
			newid: id
		});
	},
	prompt: function(e, f, g) {
		if (typeof g !== 'object') {
			g = false;
		}

		var id = baison.newdialog();
		return baison.build(e, {
			type: 'prompt',
			callback: f,
			params: g,
			newid: id
		});
	},
	listen: function(e, f, g) {
		if (!isEmptyObject(e)) {
			if (e.addEventListener) {
				return e.addEventListener(f, g, false);
			}

			if (e.attachEvent) {
				return e.attachEvent('on' + f, g);
			}
		}
		return false;
	},
	stoplistening: function(e, f, g) {
		if (e.removeEventListener) {
			return e.removeEventListener("click", g, false);
		}

		if (e.detachEvent) {
			return e.detachEvent('on' + f, g);
		}
		return false;
	}
};
if (!baison.init) {
	baison.listen(window, "load", function() {
		baison.init = true;
	});
}

apiready = function() {
	/*================极光推送开始====================*/
	var ajpush = api.require('ajpush');

	//初始化推送服务，只Android有效，ios上会自动初始化
	ajpush.init(function(ret) {
		if (ret && ret.status) {
			//success
		}
	});
	//恢复Push推送
	ajpush.resumePush(function(ret) {
		if (ret && ret.status) {
			//success
		}
	});
	//监听推送消息
	ajpush.setListener(
		function(ret) {
			//alert("setListener:" + JSON.stringify(ret));
			//var id = ret.id;
			//var title = ret.title;
			//var content = ret.content;
			//var extra = ret.extra;

			//有消息时跳转到消息页 ？？待验证
			localStorage.new_notice = 1;
			//window.location.href = "index.html#/notice";
		}
	);
	//Android状态栏通知后的点击事件
	api.addEventListener({
		name: 'appintent'
	}, function(ret, err) {
		if (ret && ret.appParam.ajpush) {
			//alert("Android appintent:" + JSON.stringify(ret));
			//var ajpush = ret.appParam.ajpush;
			//var id = ajpush.id;
			//var title = ajpush.title;
			//var content = ajpush.content;
			//var extra = ajpush.extra;

			//有消息时跳转到消息页 ？？待验证
			localStorage.new_notice = 1;
			window.location.href = "index.html#/notice";
		}
	});
	//iOS状态栏通知后的点击事件
	api.addEventListener({
		name: 'noticeclicked'
	}, function(ret, err) {
		if (ret && ret.value) {
			//alert("iOS noticeclicked:" + JSON.stringify(ret));
			//var ajpush = ret.value;
			//var content = ajpush.content;
			//var extra = ajpush.extra;

			//有消息时跳转到消息页 ？？待验证
			localStorage.new_notice = 1;
			window.location.href = "index.html#/notice";
		}
	});

	if (localStorage.biz_code) {
		//绑定用户别名和标签
		var param = { alias: localStorage.biz_code.replace("-", ""), tags: ['iShop_app'] };
		ajpush.bindAliasAndTags(param, function(ret) {
			var statusCode = ret.statusCode;
			//alert(statusCode + "-baison.js");
			//alert(localStorage.biz_code.replace("-", ""));
		});
	}

	//获取唯一设备标识 登录后使用绑定方法，此处不需要
	//ajpush.getRegistrationId(function(ret) {
	//    var registrationId = ret.id;
	//    alert(registrationId);
	//});
	/*================极光推送结束====================*/
};

function isEmptyObject(obj) {
	for (var n in obj) {
		return false;
	}
	return true;
}

window.addEventListener("keyback", function() {
	api.closeWidget();
});


function getParameter(divClass) {
	var data = new Object();
	var parameter = new Object();
	var parameterUrl = new Object();

	jQuery("." + divClass).find("input[type='text']").each(function() {
		if (jQuery(this).val() != null && typeof jQuery(this).attr("name") != "undefined" && jQuery(this).attr("name").indexOf("valueClass") < 0) {
			if (jQuery(this).attr("name") != "")
				parameter[jQuery(this).attr("name")] = jQuery(this).val();
		}
	});

	jQuery("." + divClass).find("input[type='hidden']").each(function() {
		if (jQuery(this).val() != null && typeof jQuery(this).attr("name") != "undefined" && jQuery(this).attr("name").indexOf("hideClass") < 0) {
			if (jQuery(this).attr("name") != "")
				parameter[jQuery(this).attr("name")] = jQuery(this).val();
		}
	});

	jQuery("." + divClass).find("input[type='password']").each(function() {
		if (jQuery(this).val() != null && typeof jQuery(this).attr("name") != "undefined" && jQuery(this).attr("name").indexOf("hideClass") < 0)
			parameter[jQuery(this).attr("name")] = jQuery(this).val();
	});

	jQuery("." + divClass).find("input[type='checkbox']").each(function() {
		if (jQuery(this).attr("checked")) {
			if (parameter[jQuery(this).attr("name")]) {
				if (typeof jQuery(this).attr("check") != "undefined") {
					parameter[jQuery(this).attr("name")] = parameter[jQuery(this).attr("name")] + "," + jQuery(this).attr("check");
				} else {
					parameter[jQuery(this).attr("name")] = parameter[jQuery(this).attr("name")] + "," + jQuery(this).val();
				}

			} else {
				if (typeof jQuery(this).attr("check") != "undefined") {
					parameter[jQuery(this).attr("name")] = jQuery(this).attr("check");
				} else {
					parameter[jQuery(this).attr("name")] = jQuery(this).val();
				}

			}
		} else {
			if (typeof jQuery(this).attr("no_check") != "undefined") {
				if (!parameter[jQuery(this).attr("name")]) {
					parameter[jQuery(this).attr("name")] = jQuery(this).attr("no_check");
				}
			}
		}
	});

	jQuery("." + divClass).find("input[type='radio']").each(function() {
		if (jQuery(this).attr("checked")) {
			if (parameter[jQuery(this).attr("name")]) {
				parameter[jQuery(this).attr("name")] = parameter[jQuery(this).attr("name")] + "," + jQuery(this).val();
			} else {
				parameter[jQuery(this).attr("name")] = jQuery(this).val();
			}
		}
	});

	jQuery("." + divClass).find("select").each(function() {
		if (jQuery(this).val() != null)
			parameter[jQuery(this).attr("name")] = jQuery(this).val();
	});

	jQuery("." + divClass).find("textarea").each(function() {
		if (jQuery(this).val() != null && jQuery(this).attr("name") != "")
			parameter[jQuery(this).attr("name")] = filter_xss(escape2Html(jQuery(this).val()));
	});

	//fck编辑器值

	if (typeof(CKEDITOR) != "undefined" && typeof(CKEDITOR.instances.text) != "undefined" && jQuery("." + divClass).find("textarea[name='text']").length > 0) {
		parameter['text'] = filter_xss(escape2Html(CKEDITOR.instances.text.getData()));
	}
	if (typeof(CKEDITOR) != "undefined" && typeof(CKEDITOR.instances.text) != "undefined" && jQuery("." + divClass).find("textarea[name='text1']").length > 0) {
		parameter['text1'] = filter_xss(escape2Html(CKEDITOR.instances.text1.getData()));
	}
	data['parameter'] = parameter;
	data['parameterUrl'] = parameterUrl;
	return data;
}

//过滤 iframe 和 js 标签
function filter_xss(string) {
	if (!string) return '';
	var reg_js = new RegExp("<.*?script[^>]*?>.*?(<\/.*?script.*?>)*", "ig");
	var str = string.replace(reg_js, '');

	var reg_if = new RegExp("<.*?frame[^>]*?>.*?(<\/.*?frame.*?>)*", "ig");
	var string = str.replace(reg_if, '');
	return string;
}

//转意符换成普通字符
function escape2Html(str) {
	var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
	return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function(all, t) {
		return arrEntities[t];
	});
}

/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz = 8; /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s) {
	return binl2hex(core_md5(str2binl(s), s.length * chrsz));
}

function b64_md5(s) {
	return binl2b64(core_md5(str2binl(s), s.length * chrsz));
}

function str_md5(s) {
	return binl2str(core_md5(str2binl(s), s.length * chrsz));
}

function hex_hmac_md5(key, data) {
	return binl2hex(core_hmac_md5(key, data));
}

function b64_hmac_md5(key, data) {
	return binl2b64(core_hmac_md5(key, data));
}

function str_hmac_md5(key, data) {
	return binl2str(core_hmac_md5(key, data));
}

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test() {
	return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len) {
	/* append padding */
	x[len >> 5] |= 0x80 << ((len) % 32);
	x[(((len + 64) >>> 9) << 4) + 14] = len;

	var a = 1732584193;
	var b = -271733879;
	var c = -1732584194;
	var d = 271733878;

	for (var i = 0; i < x.length; i += 16) {
		var olda = a;
		var oldb = b;
		var oldc = c;
		var oldd = d;

		a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
		d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
		c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
		b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
		a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
		d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
		c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
		b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
		a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
		d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
		c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
		b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
		a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
		d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
		c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
		b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

		a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
		d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
		c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
		b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
		a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
		d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
		c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
		b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
		a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
		d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
		c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
		b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
		a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
		d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
		c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
		b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

		a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
		d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
		c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
		b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
		a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
		d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
		c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
		b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
		a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
		d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
		c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
		b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
		a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
		d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
		c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
		b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

		a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
		d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
		c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
		b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
		a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
		d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
		c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
		b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
		a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
		d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
		c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
		b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
		a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
		d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
		c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
		b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

		a = safe_add(a, olda);
		b = safe_add(b, oldb);
		c = safe_add(c, oldc);
		d = safe_add(d, oldd);
	}
	return Array(a, b, c, d);

}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t) {
	return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}

function md5_ff(a, b, c, d, x, s, t) {
	return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}

function md5_gg(a, b, c, d, x, s, t) {
	return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}

function md5_hh(a, b, c, d, x, s, t) {
	return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5_ii(a, b, c, d, x, s, t) {
	return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Calculate the HMAC-MD5, of a key and some data
 */
function core_hmac_md5(key, data) {
	var bkey = str2binl(key);
	if (bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

	var ipad = Array(16),
		opad = Array(16);
	for (var i = 0; i < 16; i++) {
		ipad[i] = bkey[i] ^ 0x36363636;
		opad[i] = bkey[i] ^ 0x5C5C5C5C;
	}

	var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
	return core_md5(opad.concat(hash), 512 + 128);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y) {
	var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt) {
	return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
function str2binl(str) {
	var bin = Array();
	var mask = (1 << chrsz) - 1;
	for (var i = 0; i < str.length * chrsz; i += chrsz)
		bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
	return bin;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2str(bin) {
	var str = "";
	var mask = (1 << chrsz) - 1;
	for (var i = 0; i < bin.length * 32; i += chrsz)
		str += String.fromCharCode((bin[i >> 5] >>> (i % 32)) & mask);
	return str;
}

/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray) {
	var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
	var str = "";
	for (var i = 0; i < binarray.length * 4; i++) {
		str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
			hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
	}
	return str;
}

/*
 * Convert an array of little-endian words to a base-64 string
 */
function binl2b64(binarray) {
	var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var str = "";
	for (var i = 0; i < binarray.length * 4; i += 3) {
		var triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16) | (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8) | ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
		for (var j = 0; j < 4; j++) {
			if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;
			else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
		}
	}
	return str;
}
