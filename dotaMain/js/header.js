/**
 * Created by Administrator on 2017/6/16.
 */
//头部下拉菜单
$(function () {
    $(".link-div ").mouseenter(function () {
        //console.log(this)
        var $this = $(this);
        $this.siblings().show();
        $this.parent().siblings().children(".link-pop").hide();
    });
    $(".link-div").mouseleave(function () {
        $(this).siblings(".link-pop").hide();
        $('.link-div').mouseleave(function () {
            $(this).find('.link-pop').hide();
        });

    });
});


//头部轮播图
$(function () {
    var index = 0;
    var maxIndex = $(".lunbuotus li").length - 1;
    $(".jianto-left").click(function () {
        index--;
        if (index < 0) {
            index = maxIndex;
        }
        $(".lunbuotus li").eq(index).show().siblings().hide();
    });
    $('.jianto-right').click(function () {
        index++;
        if (index > maxIndex) {
            index = 0;
        }
        /*通过索引去找对应的淡入 并且其他淡出*/
        $('.lunbuotus li').eq(index).fadeIn().siblings().fadeOut();
    });
});


/*****************赛事中心**********************/






var box = document.getElementById("lunbotu");
var inner = box.children[1];//可视区域
var list = inner.children[0];//要运动的ul
var imgWid = inner.offsetWidth;//图片宽度
var lisUl = list.children;//所有图片
var sps = inner.children[1].children;//所有的操作按钮


//2 遍历sps设置事件
for (var i = 0; i < sps.length; i++) {
    sps[i].index = i;
    sps[i].onclick = function () {
        //3 设置按钮变色效果
        for (var i = 0; i < sps.length; i++) {
            sps[i].className = "";
        }
        this.className = "current";

        //4 设置ul运动的效果
        var target = -this.index * imgWid;
        animate(list, target);
    };
}


var count = 0;                  //用于记录滚过的图片张数

//8 为了制作无缝滚动效果，先设置一个假的第一张
list.appendChild(lisUl[0].cloneNode(true));
var sepa=-10;//声明全球变量

//setInterval(function(){
//    var count=list.offsetLeft;
//    count+=sepa;
//    if(count>-(list.offsetWidth-imgWid)){
//        list.style.left=count+"px";
//    }else{
//        list.style.left=sepa+"px";
//    }
//},50)

function animate(tag, target) {
    clearInterval(tag.timer);//防止加速
    //使用自定义属性保存每个标签运动时的定时器标识，可以实现对标签自身运动的单独管理。
    tag.timer = setInterval(function () {
        //1 获取元素当前位置
        var current = tag.offsetLeft;
        //2 设置运动的步长
        var step = 16;
        step = current > target ? -step : step;

        if (Math.abs(current - target) > Math.abs(step)) {
            //3 套用运动公式
            current = current + step;
            //4 设置给left值
            tag.style.left = current + "px";
        } else {
            tag.style.left = target + "px";
            clearInterval(tag.timer);
        }
    }, 20);
}





/*****************************************/
//var config = [
//    {
//
//        left:96,
//        zIndex:5
//
//    },//0
//    {
//        top: 0,
//        right:-192,
//        zIndex: 3,
//    },//1
//    {
//        top: 0,
//        right: -192,
//        zIndex: 1,
//    },//2
//    {
//        top: 0,
//        left: 0,
//        zIndex: 2,
//    },//3
//    {
//        top: 0,
//        left: 0,
//        zIndex: 4,
//    },//4
//
//];//config其实就是一个配置单 规定了每张图片的大小位置层级透明度
//var wrap=document.getElementById("bbgx");
//var slide=wrap.children[1];
//var ull=slide.children[0];
//var lis=ull.children;
//var arrow=slide.children[1];
//var arrLeft=arrow.children[0];
//var arrRight=arrow.children[1];
//
//wrap.onmouseover=function(){
//    animate(arrow,{opacity:1});
//};
//wrap.onmouseout=function(){
//    animate(arrow,{opacity:0});
//};
//
//for (var i = 0; i<config.length; i++){
//    animate(lis[i],config[i]);
//};
//var flag=true;//
//arrLeft.onclick=function(){
//    if (flag){//
//        flag=false;//
//        config.unshift(config.pop());
//        for (var i = 0; i < config.length; i++) {
//            animate(lis[i],config[i],function(){
//                flag=true;//
//            });
//        }
//    }
//
//};
//arrRight.onclick=function(){
//    if(flag){
//        flag=false;
//        config.push(config.shift());
//        for (var i = 0; i <config .length; i++) {
//            animate(lis[i],config[i],function(){
//                flag=true;
//            });
//        }
//    }
//
//};
//
//
//function animate(tag, datas, fn) {
//    clearInterval(tag.timer);
//    tag.timer = setInterval(function () {
//
//        var flag = true;
//        for (var k in datas) {
//            if (k == "opacity") {
//                //透明度处理
//                var target = datas[k] * 1000;
//                //扩大倍数，防止计算精度问题
//                //检测发现，ie中透明度不会获取到auto，所以不需要进行||0处理
//                //opacity是c3属性，ie低版本不支持
//                var current = getStyle(tag, k) * 1000;
//                var step = (target - current) / 10;
//                step = step > 0 ? Math.ceil(step) : Math.floor(step);
//                current = current + step;
//                //设置时缩小对应的倍数
//                tag.style[k] = current / 1000;
//
//                if (current != target) {
//                    flag = false;
//                }
//            } else if (k == "zIndex") {
//                //层级处理:层级不需要进行渐变操作，只需要直接设置即可
//                tag.style.zIndex = datas[k];
//            } else {
//                //k - 属性名 - 相当于attr 要进行运动的样式名
//                //datas[k] - 属性值 - 相当于target，要让某个样式运动到的位置
//                var target = datas[k];
//                var current = parseInt(getStyle(tag, k)) || 0;
//                var step = (target - current) / 10;
//                step = step > 0 ? Math.ceil(step) : Math.floor(step);
//                current = current + step;
//                tag.style[k] = current + "px";
//
//                if (current != target) {
//                    flag = false;
//                }
//            }
//        }
//
//        if (flag) {
//            clearInterval(tag.timer);
//            fn && fn();
//        }
//
//
//    }, 20);
//}
//
//function getStyle(tag, attr) {
//    if (tag.currentStyle) {
//        return tag.currentStyle[attr];
//    } else {
//        return getComputedStyle(tag, null)[attr];
//    }
//}


$(function () {

    $('.public').each(function(i){
        $(this).mouseenter(function(){
            if($(this).hasClass('nome')){
                return false;
            }
            /*2.当鼠标进入页签的时候选中*/
            $(this).addClass('nome').siblings(".public").removeClass('nome');
            /*3.当鼠标进入页签对应的内容显示*/
            var index = $(this).index();
            index = index/2;
            console.log(index);
            $('.Board li img').eq(index).show().parent().siblings().children().hide();
        });

    });
});



/********************************/

$(function () {
    /*1.当鼠标进入页签的时候选中*/
    /*2.当鼠标进入页签对应的内容显示*/
    $('.uls li').mouseenter(function(){
        /*1.如果当前已经选中 停止执行*/
        if($(this).hasClass('.howo')){
            return false;
        }
        /*2.当鼠标进入页签的时候选中*/
        $(this).addClass('howo').siblings().removeClass('howo');
        /*3.当鼠标进入页签对应的内容显示*/
    var index = $(this).index();
        $('.sp li img').eq(index).show().parent().siblings().children().hide()
    });
});


var J_slide = $('#J_slide');
// if (clientW <= 1280) {
//     J_slide.animate({ right: '-146px' }, "slow").removeClass('opened');
//     J_slide.find('.J-slide-trigger span').text('展开');
// };
$(function(){
   $(".log span").click(function(){
       if($(".sdp").css("right")=="131px"){
           $(".sdp").stop().animate({right:"0"},2000).siblings().stop().animate({right:"-131"},2000);
       }else{
           $(".sdp").stop().animate({right:"131"},2000).siblings().stop().animate({right:"0"},2000);
       }


   });
});



