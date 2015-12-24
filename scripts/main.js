$(function ($, window, undefind) {
    //定义插件内容
    var plugs ={
        owlCarousel:function(id,config){
            var defaultConfig ={
                items: 1,                                        //一屏显示的图片数量，singleItem为false时才有效
                singleItem: true,                                //单页
                autoPlay: true,                                  //自动播放 默认为false,true为显示(5000)。 为数值时则为图片切换间隔时间
                navigation: true,                                //是否显示按钮导航
                navigationText: ["<", ">"],            //定义导航文字  自定义样式['.owl-buttons','.owl-prev','.owl-next']
                lazyLoad: true,                                  //是否开启懒加载
                slideSpeed: 500,                               //图片切换速度，点击上下按钮时
                stopOnHover: false,                              //鼠标悬停停止自动播放 ,默认false
                pagination: true,                                //显示分页
                paginationNumbers: false,                        //分页按钮显示数字
                addClassActive: true,                            //给可见的项目加入 “active” 类,方便控制
                beforeInit: function (e) {                         //初始化之前的回调函数
                    // console.log('beforeInit:',e);
                },
                afterInit: function (e) {                          //初始化之后的回调函数
                    //  console.log('afterInit:',e);
                },
                beforeMove: function (e) {                         //移动之前的回调函数 , 每次移动之前执行
                    //  console.log('beforeMove:',e);
                },
                afterMove: function (e) {                         //移动之后的回调函数 , 每次移动之后执行
                    // console.log('afterMove:', e, this, this.currentItem);
                },
                afterAction: function (e) {                       //初始化之后的回调函数
                    // console.log('afterAction:',e);
                }
            };
            if(typeof id === 'string'){
                $(id).owlCarousel(typeof config === 'object' ? $.extend({},defaultConfig,config):defaultConfig);
            }
        },
        //初始化插件
        init: function () {
            var self = this;
            var change2_config = {
                navigationText: ["<", ">"],            		  //定义导航文字  自定义样式['.owl-buttons','.owl-prev','.owl-next']
                pagination: false,                                        //显示分页按钮  
                afterMove: function (e) {
                    $('.owl-title').hide().eq(this.currentItem).show();
                    $('.owl-content').hide().eq(this.currentItem).show();
                    $('.owl-small-img li a').removeClass('current-chgs-item').eq(this.currentItem).addClass('current-chgs-item');
                }
            }
            this.owlCarousel('#owl-demo2', change2_config);
            //添加方法2
            var owl = $('#owl-demo2').data('owlCarousel');
            $('.owl-small-img li').hover(function () {
                var index = $('.owl-small-img li').index(this);
                owl.jumpTo(index);
            });
        }
    }
    plugs.init();
}(jQuery, window, window.undefind))