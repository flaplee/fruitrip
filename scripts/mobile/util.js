if(typeof($util)=='undefined')$util={};
/**
* 加载 css 文件
*
* @type Object
*/
$util.loadCss=function(path){
	$('head').append('<link rel="stylesheet" type="text/css" href="' + $util.resBaseUrl + 'css/' + path + '?' + $util.resVersion + '"/>');
}
/**
* 获取 XMLHttpRequest 返回的 json 数据。如果发生错误则返回 false。
*
* @param XMLHttpRequest
* @param textStatus
* @param options
*/
$util.getJsonResponse=function(XMLHttpRequest, textStatus, options){
	$util.getJsonResponse.defaultOptions = {
		actionName: '操作',
		alertOnError: false
	};

	options = $.extend({}, $util.getJsonResponse.defaultOptions, options);

	if(textStatus == 'success') {
		try {
			var result = JSON.parse(XMLHttpRequest.responseText);
			if(typeof(result.redirect) != 'undefined' && result.redirect) {
				if(result.redirect == '__self__') {
					location.href = location.href;
				}
				else {
					location.href = result.redirect;
				}
				return false;
			}
			return result;
		}
		catch(e) {
			$util.showMessageBox(options.actionName + '失败: 无法解析服务器的响应结果');
		}
	}
	else if(textStatus == 'timeout') {
		$util.showMessageBox(options.actionName + '超时！');
	}
	else if(textStatus == 'error') {
		$util.showMessageBox(options.actionName + '失败[' + XMLHttpRequest.status + ']: ' + XMLHttpRequest.statusText);
	}
	else {
		$util.showMessageBox(options.actionName + '失败[' + textStatus + ']');
	}
	return false;
};
/**
* 获取 XMLHttpRequest 返回的文本。如果发生错误则返回 false。
*
* @param XMLHttpRequest
* @param textStatus
* @param options
*/
$util.getHtmlResponse=function(XMLHttpRequest, textStatus, options) {
	$util.getHtmlResponse.defaultOptions = {
	};

	options = $.extend({
		actionName: '操作',
		alertOnError: false
	}, options);

	if(textStatus == 'success') {
		return XMLHttpRequest.responseText;
	}
	else if(textStatus == 'timeout') {
		$util.showMessageBox(options.actionName + '超时！');
	}
	else if(textStatus == 'error') {
		$util.showMessageBox(options.actionName + '失败[' + XMLHttpRequest.status + ']: ' + XMLHttpRequest.statusText);
	}
	else {
		$util.showMessageBox(options.actionName + '失败[' + textStatus + ']');
	}
	return false;
};
/**
* 显示消息
*
* @param message
* @param options
*/
$util.showMessageBox=function(message, options) {
	options = $.extend({
	}, options);
	alert(message);
};


$(document).bind('pageinit', function(){
	/* disable data-ajax by default */
	$('a:not([data-ajax])').attr('data-ajax', 'false');

	/* use mobiscroll if type=date not supported */
	var inputDate = $('input[type=date]');
	if(inputDate.length != 0 && !Modernizr.inputtypes.date) {
		$util.loadCss('mobiscroll.custom.min.css');
		$.ajax({
			url: $util.resBaseUrl + 'js/mobiscroll.custom.min.js?' + $util.resVersion,
			complete: function(XMLHttpRequest, textStatus){
				if(textStatus != 'success') return;
				inputDate.mobiscroll().calendar({
					animate: '',
					theme: 'mobiscroll',
					lang: 'zh',
					display: 'bottom',
					controls: ['calendar']
				});
			}
		});
	}
});

