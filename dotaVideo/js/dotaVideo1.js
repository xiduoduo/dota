/**
 * Created by 光跃 on 2017-06-19.
 */


//顶部导航栏进入下拉函数
$(function () {
    //给link_div设置鼠标进入事件
    $('.dota2nav >.link_div').mouseenter(function () {
        //找到当前的元素，并转换为JQ对象
        var $this = $(this);
        //link_pop 找到他，并且为其设置
        $this.children('.link_pop').show().css({zIndex: "10"});
        //其他元素隐藏
        $this.siblings().children('.link_pop').hide().css({zIndex: "0"});
    });
    //设置离开事件
    $('.dota2nav').mouseleave(function () {
        $(this).find('.link_pop').hide().css({zIndex: "0"});
    });

});

//导航栏nav02 的固定定位于绝对定位切换
$(function () {
    //固定导航
    $(window).scroll(function () {
        //卷曲高度
        var scrollTop = $(this).scrollTop();
        //当卷曲高度大于下面高度那么，nav02就改变为固定定位
        var Height = $('.nav_main').height() + $('#header').height();
        if (scrollTop > Height) {
            $('.nav02').addClass('fixed');
            //section01需要改变的margintop就是它上面所有盒子的高度
            $('.section01').css({marginTop: 20 + $('.nav02').height()});
        } else {
            $('.nav02').removeClass('fixed');
            $('.section01').css({marginTop: 0});
        }
    });
});
//导航栏nav02的鼠标进入移出事件JS
$(function () {
    //鼠标进入事件
    $('.nav02 a').mouseenter(function () {
        $(this).stop().animate({top: -100}, 200, "linear");
        $(this).siblings().stop().animate({top: 0}, 100);
    });
    //鼠标移出大盒子事件
    $('.nav02').mouseleave(function () {
        $(this).children().stop().animate({top: 0}, 100);
    });
});

//mask的透明度事件
$(function () {
    $('.mask').mouseenter(function () {
        $(this).stop().animate({opacity: 1})
    });
    $('.mask').mouseleave(function () {
        $(this).stop().animate({opacity: 0})
    });
});

////mask的轮播效果
////自动轮播效果，移入停止，移出继续轮播
//var count = 0;//计数器
//var timer = null;
//var imgHet=my$2("mask").offsetHeight;//可是区域高度  就是图片的高度
//var imgs = my$2("imgs");//运动的轮播图整体
//var imgsc = imgs.children;//所有图片
////var nvs = my$2("nvs")//右侧的父盒子
//var nvs=document.getElementsByClassName("nvs")[0];
//var lisnvs=nvs.children;//所有的右测小盒子按钮
//
//
////为右边栏第一个设置默认的bg
////nvs.children[0].className="cur";
//
////涉及到无缝轮播，需要克隆第一张
//imgs.appendChild(imgsc[0].cloneNode(true));
//imgs.onmouseover = function () {
//    //移入停止
//    clearInterval(timer);
//};
//imgs.onmouseout = function () {
//    //移出继续
//    timer = setInterval(function () {
//    }, 2000);
//};

//block02的tab栏手风琴事件
$(function () {
    $('.tabblock li').mouseenter(function () {
        $(this).siblings('.o').slideDown().parent().siblings().children('.o').slideUp();
    });
    //离开事件
    $
});




