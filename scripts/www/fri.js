//首页banner
$(function(){
    $("#kinMaxShow").kinMaxShow({
            height:414,
            //幻灯片切换间隔时间 单位:秒
            intervalTime:6,
            //幻灯片切换时间 单位：秒 ,若设置为0 则无切换效果 直接跳到下一张
            switchTime:1000,
            //悬停暂停切换 鼠标停留在kinMaxShow内 是否暂停切换 默认true 悬停暂停，设置为false 悬停不暂停
            hoverPause:true,
            //擦除效果(切换) jQuery自带有 "linear" 和 "swing" ,如需要其他擦除效果请使用 jquery.easing.js  插件
            easing:'linear',
            //图片对齐方式
            imageAlign:'center center',
            button:{
                    showIndex:false,
                    normal:{background:'url(images/index/button.png) no-repeat -14px 0',marginRight:'8px',border:'0',right:'48%',bottom:'20px'},
                    focus:{background:'url(images/index/button.png) no-repeat 0 0',border:'0'}
                }
    });
    $(".header .nav li").eq(1).addClass("current");
    /* count */
    var options = {
      useEasing : true, 
      useGrouping : true, 
      separator : ',', 
      decimal : '.', //小数
      prefix : '', //前缀
      suffix : '' //后缀
    };
    var customer = new CountUp("customer", 2052, 2824, 0, 2, options);
    var fund = new CountUp("charge",217982,247826,0,2,options);
    customer.start();
    fund.start();
    /* data */
    var init = {top:0,opacity:1};
    var animate = $('.animate-init');
    animate.animate(init).delay(10000);
});