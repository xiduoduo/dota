/**
 * Created by Administrator on 2017/6/18.
 */





/*** dotaPk 页头  ---导航栏----  ******/
$(function () {
    //鼠标进入导航栏中的li时，当前li下的ul显现，其他的隐藏
    $('.dotapknav .clearfloat>li').mouseenter(function () {
        $(this).children('ul').show().parent().siblings().children('ul').hide();
    });
    //鼠标离开导航栏中的ul，所有的子ul隐藏
    $('.dotapknav >ul').mouseleave(function () {
        $(this).find('ul').hide();

    });


});//end function


//==================定位的盒子跳楼效果============
//获取元素
var ol = document.getElementById("dingweihezikongzhi");
var lisOl = ol.children;//一系列控制键
var timer = null;
var ul = document.getElementById("dotapkzhuti");
var lisUl = ul.children;//大的模块

//遍历所有的li控制键
for (var i = 0; i < lisOl.length; i++) {
    lisOl[i].index = i;//设置索引值
    lisOl[i].onclick = function () {
        //this.children[0].style.backgroundPositionX="right";
        clearInterval(timer);//防止加速
        //点击后，页面需要滚到最终的位置，为lisUl中跟当前按钮对应的li的offsetTop
        var target = lisUl[this.index].offsetTop;//本次点击后，页面要滚动到的位置
        timer = setInterval(function () {
            //获取页面当前位置
            var current = myScroll().scrollTop;
            //设置步长
            var step = (target - current) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            //套用公式
            current = current + step;
            //设置window.scrollto()
            window.scrollTo(0, current);
            if (current == target) {
                clearInterval(timer);
            }
        }, 20)


    }
}
;
//=======定位的盒子控制按钮变色
$(function () {
    $('#dingweihezikongzhi>li').click(function () {
        $(this).children('div').css("backgroundPositionX", "right").parent().siblings().children('div').css("backgroundPositionX", "left");
    })
})

//=======页面滚动时-----定位盒子控制的按钮变色


window.onscroll=function(){
    for(var s=0;s<lisOl.length;s++){
        lisOl[s].children[0].style.backgroundPositionX="left"
    }

    if(myScroll().scrollTop>3304-100){
        lisOl[3].children[0].style.backgroundPositionX="right";
    }else if(myScroll().scrollTop>2617-100){
        lisOl[2].children[0].style.backgroundPositionX="right";
    }else if(myScroll().scrollTop>1959-100){
        lisOl[1].children[0].style.backgroundPositionX="right";
    }else if(myScroll().scrollTop>1219-100) {

        lisOl[0].children[0].style.backgroundPositionX = "right";
    }
    };





function myScroll() {
    return {
        scrollTop: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
        scrollLeft: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft
    };
}


//=========回到顶部===
var dingweitop = document.getElementById("dingweitop");
//dingweitop.onclick=function(){
//    window.scrollTo(0,0);
//};


dingweitop.onclick = function () {
    clearInterval(timer)
    timer = setInterval(function () {
        var current = myScroll().scrollTop;
        var target = 0;
        var step = (target - current) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        current = current + step;
        window.scrollTo(0, current);
        if (current == target) {
            clearInterval(timer);
        }
    }, 30)

};
//=================================

//============================= 1 如何创建战队==============

//获取元素

var rhcjzdshang = document.getElementsByClassName("rhcjzdshang")[0];
var ul1 = rhcjzdshang.children[0];//移动的ul
var listUl1 = ul1.children;//所有的大图li集合

var rhcjzdxia = document.getElementsByClassName('rhcjzdxia')[0];
var ol1 = rhcjzdxia.children[0];
var listOl1 = ol1.children;//控制键集合

for (var i = 0; i < listOl1.length; i++) {
    listOl1[i].index = i;
    listOl1[i].onmouseenter = function () {
        rhcjzdxia.style.backgroundPositionY = -this.index * 60 + "px";
        animate(ul1, "left", -this.index * 786);

    };
}
//自动播放
var timerauto = null;
var j = 0;
timerauto = setInterval(function () {

    if (j >= listOl1.length) {
        j = 0;
    }
    animate(ul1, "left", -j * 786);
    rhcjzdxia.style.backgroundPositionY = -j * 60 + "px";
    j++;

}, 1000)


rhcjzdxia.onmouseleave = function () {
    var j = 0;
    timerauto = setInterval(function () {

        if (j >= listOl1.length) {
            j = 0;
        }
        animate(ul1, "left", -j * 786);
        rhcjzdxia.style.backgroundPositionY = -j * 60 + "px";
        j++;

    }, 1000)//end timerauto

}

rhcjzdxia.onmouseenter = function () {
    clearInterval(timerauto);
};


//=================2 -如何加入战队====
//上面展示的大图是图片放在ul中的===下面的是背景图放在div中
//获取元素
var rhjrzdshang = document.getElementsByClassName("rhjrzdshang")[0];

var ul2 = rhjrzdshang.children[0];//运动的ul
var listUl2 = ul2.children;//装有图片的li
var rhjrzdxia = document.getElementsByClassName("rhjrzdxia")[0];
var ol = rhjrzdxia.children[0];
var listOl2 = ol.children;//控制键集合

for (var i = 0; i < listOl2.length; i++) {
    listOl2[i].index = i;
    listOl2[i].onmouseenter = function () {
        if (this.index == 0) {
            rhjrzdxia.style.backgroundPositionY = "top";
            animate(ul2, "left", 0)
        } else {
            rhjrzdxia.style.backgroundPositionY = "bottom";
            animate(ul2, "left", -786)
        }
    }
}

//自动播放
var k = 0;
var timerauto2 = null;
timerauto2 = setInterval(function () {

    if (k >= listOl2.length) {
        k = 0;
    }
    animate(ul2, "left", -k * 786);
    rhjrzdxia.style.backgroundPositionY = -k * 60 + "px";
    k++;

}, 2000)//end timerauto


rhjrzdxia.onmouseleave = function () {
    var k = 0;
    timerauto2 = setInterval(function () {

        if (k >= listOl2.length) {
            k = 0;
        }
        animate(ul2, "left", -k * 786);
        rhjrzdxia.style.backgroundPositionY = -k * 60 + "px";
        k++;

    }, 2000)//end timerauto

}

rhjrzdxia.onmouseenter = function () {
    clearInterval(timerauto2);
};


function animate(tag, attr, target) {
    clearInterval(tag.timer);
    tag.timer = setInterval(function () {
        var current = parseInt(getStyle(tag, attr)) || 0;
        var step = (target - current) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        current = current + step;
        tag.style[attr] = current + "px";
        if (target == current) {
            clearInterval(tag.timer);
        }
    }, 20)


}
function getStyle(tag, attr) {
    //想要先使用getComputedStyle进行检测
    //强行添加window，使getComputedStyle变成方法的访问方式，这时即使不存在，值为undefined而不会报错
    if (window.getComputedStyle) {
        return getComputedStyle(tag, null)[attr];
    } else {
        return tag.currentStyle[attr];
    }
}


//=========================  3 如何报名公开预选赛=======

//获取元素
var rhbmgkyxcshang = document.getElementsByClassName("rhbmgkyxcshang")[0];
var ul3 = rhbmgkyxcshang.children[0];//移动的ul
var listUl3 = ul3.children;//大图集合

var rhbmgkyxcxia = document.getElementsByClassName("rhbmgkyxcxia")[0];
var ol3 = rhbmgkyxcxia.children[0];
var listOl3 = ol3.children;//所有的li集合

for (var i = 0; i < listOl3.length; i++) {
    listOl3[i].index = i;
    listOl3[i].onmouseenter = function () {
        rhbmgkyxcxia.style.backgroundPositionY = -60 * this.index + "px";
        animate(ul3, "left", -786 * this.index);
    };

}


//自动播放
var q = 0;
var timerauto3 = null;
timerauto3 = setInterval(function () {

    if (q >= listOl3.length) {
        q = 0;
    }
    animate(ul3, "left", -q * 786);
    rhbmgkyxcxia.style.backgroundPositionY = -q * 60 + "px";
    q++;

}, 2000)//end timerauto


rhbmgkyxcxia.onmouseleave = function () {
    var q = 0;
    timerauto3 = setInterval(function () {

        if (q >= listOl3.length) {
            q = 0;
        }
        animate(ul3, "left", -q * 786);
        rhbmgkyxcxia.style.backgroundPositionY = -q * 60 + "px";
        q++;

    }, 2000)//end timerauto

}

rhbmgkyxcxia.onmouseenter = function () {
    clearInterval(timerauto3);
};






window.onload=function(){
    scrollDong(0);
};





//页面跳楼
function scrollDong(target,fn) {
    clearInterval(timer);//防止加速
    //点击后，页面需要滚动到的最终位置，为lisUl中跟当前按钮对应的li的offsetTop
    timer = setInterval(function () {
        //1 获取页面当前位置（页面当前卷曲的高度）
        var current = myScroll().scrollTop;
        //2 设置步长
        var step = (target - current) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        //3 套用公式
        current = current + step;
        //4 设置window.scrollTo()
        window.scrollTo(0, current);
        //5 位置到达，清除定时器
        if (current == target) {
            clearInterval(timer);
        }
        if(current>target-1&&current<target+1) {
            current = target;
            window.scrollTo(0, target);
            clearInterval(timer);
        }
        if (fn) {
            clearInterval(timer);
            fn && fn();
        }
    }, 20);
}









