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
* 获取 document.body.scrollTop
*
*/
$util.getScrollTop=function() {
	if (typeof window.pageYOffset != 'undefined')
	{
	   return window.pageYOffset;
	}
	else if (typeof document.compatMode != 'undefined' &&    document.compatMode != 'BackCompat')
	{
	   return document.documentElement.scrollTop;
	}
	else if (typeof document.body != 'undefined')
	{
	   return document.body.scrollTop;
	}
};
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
$util.enableScrollTop=function() {
	//var scrollTop = $('#back-to-top');
	//if(scrollTop.length != 0) return;

	//scrollTop = $('<div id="back-to-top1"><a href="javascript:;"><span></span>回顶部去预订</a></div>').appendTo($('body'));
	//当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
	$(function () {
		$(window).scroll(function(){
			if ($(window).scrollTop() > 100){
				$("#back-to-top").fadeIn(200);
			} else {
				$("#back-to-top").fadeOut(200);
			}
		});
		//当点击跳转链接后，回到页面顶部位置
		$("#back-to-top").click(function(){
			$('body,html').animate({scrollTop:0}, 200);
			return false;
		});
	});
};

function addfavorite()
{
	try
	{
		window.external.addFavorite(window.location, document.title);
	}
	catch (e)
	{
		try
		{
			window.sidebar.addPanel(document.title, window.location, "");
		}
		catch (e)
		{
			try
			{
				var mbm = document.createElement('a');
				mbm.setAttribute('rel','sidebar');
				mbm.setAttribute('href',window.location);
				mbm.setAttribute('title',document.title);
				mbm.click();
				var desktop = google.gears.factory.create("beta.desktop");
				var description = document.title;
				var name = document.title;   //name不支持中文
				var icons = {"64x64": "favicon.ico"};
				desktop.createShortcut(name, window.location, icons, description);
			}
			catch (e)
			{
				alert("加入收藏失败，请使用Ctrl+D进行添加");
			}
		}
	}
}

$(function(){
	$('[accept-target]').keydown(function(event){
		if(event.which == 13) {
			var self = $(this);
			if(self.prop('disabled')) return;
			$(self.attr('accept-target')).click();
		}
	});

	$('#header > span.searchbox-button').click(function(){
		var keyword=$(this).prev().val().trim();
		location.href = '/program/query/' + (keyword == '' ? '' : ('?keyword=' + encodeURIComponent(keyword)));
	});

	var preHeader = $('.pre-header');
	if(preHeader.length != 0) {
		if(currentUser == null) {
			preHeader.find('> .not_login').show();
			preHeader.find('> .is_login').hide();
		}
		else {
			preHeader.find('> .not_login').hide();
			preHeader.find('> .is_login').show().find('.user-name').text(currentUser.name == '' ? '亲' : currentUser.name);
		}
	}

	$util.enableScrollTop();
});
