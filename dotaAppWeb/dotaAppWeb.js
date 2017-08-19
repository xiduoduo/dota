/**
 * Created by Administrator on 2017/6/20.
 */

//1.1首页top栏中的超链接鼠标进入和离开时设置底边框
var aObj=document.getElementsByTagName("a");
for(var i=0;i<aObj.length;i++){
    aObj[i].onclick=function(){
        for(var j=0;j<aObj.length;j++){
            aObj[j].style.border="0px";
        }
        this.style.borderBottom="3px solid red";
    }
}

 //1.2 首页下载区域鼠标的进入和离开事件
var aaa=document.getElementsByClassName("aaa");
var ppp=document.getElementsByClassName("ppp");
for(var i=0;i<aaa.length;i++){
    aaa[i].index=i;
    aaa[i].onmouseover=function(){
        ppp[this.index].style.display="block";
    }
    aaa[i].onmouseout=function(){
        ppp[this.index].style.display="none";
    }

}

//2.1 飞入效果文字的位置初始化
var imgObj=document.getElementsByClassName("ani");
for(var i=0;i<imgObj.length;i++){
    imgObj[i].style.display="none";
    if(i%2==0){
        imgObj[i].style.top="10%";
        imgObj[i].style.left="0px";
    }else{
        imgObj[i].style.bottom="20%";
        imgObj[i].style.left="1000px";
    }
}
//2.2 文字图片的运动函数
function showZi2() {
    $('#img1').show().stop().animate({left: 538}, 500, function () {
        $('#img2').show().stop().animate({left: 538}, 200);
    });
};
function hideZi2() {
    $('#img1').stop().animate({left: 0}, 300, function () {
        $(this).hide();
    });
    $('#img2').stop().animate({left: 1000}, 200,function(){
        $(this).hide();
    });
};
function showZi3() {
    $('#img3').show().stop().animate({left: 538}, 500, function () {
        $('#img4').show().stop().animate({left: 538}, 200);
    });
};
function hideZi3() {
    $('#img3').stop().animate({left: 0}, 300, function () {
        $(this).hide();
    });
    $('#img4').stop().animate({left: 1000}, 200,function(){
        $(this).hide();
    });
};
function showZi4() {
    $('#img5').show().stop().animate({left: 538}, 500, function () {
        $('#img6').show().stop().animate({left: 538}, 200);
    });
};
function hideZi4() {
    $('#img5').stop().animate({left: 0}, 300, function () {
        $(this).hide();
    });
    $('#img6').stop().animate({left: 1000}, 200,function(){
        $(this).hide();
    });
};
//2.3 底部橙色区域的运动函数
function showZi5(){
    $('#bottom').show().stop().animate({bottom:130},300,"linear");
}
function hideZi5(){
    $('#bottom').hide().stop().animate({bottom:-300},20);
}
//3 点击右侧区域圆形按钮，实现页面跳转，实现文字图片的show和hide
var timer=null;
var circle=document.getElementById("circle");
var lis=circle.children;

for(var i=0;i<lis.length;i++){
    var count=0;
    lis[i].index=i;
    lis[i].onclick=function(){
        lis[count].style.backgroundColor="#4A6279";
        this.style.backgroundColor="red";
        var target=this.index*751;
        scrollDong(target);
        if(this.index==0){
            hideZi2();
            hideZi3();
            hideZi4();
            hideZi5();
        }
        else if(this.index==1){
            hideZi3();
            hideZi4();
            showZi2();
            hideZi5();
        }
        else if(this.index==2){
            hideZi2();
            hideZi4();
            showZi3();
            hideZi5();
        }
        else if(this.index==3){
            hideZi2();
            hideZi3();
            showZi4();
            hideZi5();
        }
        count=this.index;
    };
}
//4 设置每个页面底部箭头的跳转

var tzjtObj=document.getElementsByClassName("tzjt");
for(var i=0;i<tzjtObj.length;i++){
    tzjtObj[i].index=i;
    //设置箭头的位置
    tzjtObj[i].style.left="730px";
    tzjtObj[i].style.top=700+"px";
    //注册点击事件，点击时实现页面跳转
    tzjtObj[i].onclick=function(){
        if(this.index<3){
            for(var j= 0;j<3;j++){
                lis[j].style.backgroundColor="#4A6279";
            }
            lis[this.index+1].style.backgroundColor="red";
            var target=(this.index+1)*751;
            scrollDong(target);
            if(this.index==0){
                hideZi3();
                hideZi4();
                showZi2();
                hideZi5();
            }
            if(this.index==1){
                hideZi2();
                hideZi4();
                showZi3();
                hideZi5();
            }
            if(this.index==2){
                hideZi2();
                hideZi3();
                showZi4();
                hideZi5();
            }
        }
        else {
            myScroll().scrollTop=751*3+"px";
            showZi5();
        }

    }

}
//5 屏幕右侧滚轮的滚动事件
var screen1=document.getElementById("screen1");
var screen2=document.getElementById("screen2");
var screen3=document.getElementById("screen3");
var screen4=document.getElementById("screen4");
var bottom=document.getElementById("bottom");

screen1.onmousewheel=function(e){
    if(event.wheelDelta<0){
        scrollDong(751);
        showZi2();
        hideZi3();
        hideZi4();
        hideZi5();
        for(var i=0;i<=3;i++){
            lis[i].style.backgroundColor="#4A6279";
        }
        lis[1].style.backgroundColor="red";
    }
}

screen2.onmousewheel=function(e){
    if(event.wheelDelta<0){
        scrollDong(751*2);
        showZi3();
        hideZi2();
        hideZi4();
        hideZi5();
        for(var i=0;i<=3;i++){
            lis[i].style.backgroundColor="#4A6279";
        }
        lis[2].style.backgroundColor="red";
    }
    if(event.wheelDelta>0){
        scrollDong(0);
        hideZi2();
        hideZi3();
        hideZi4();
        hideZi5();
        for(var i=0;i<=3;i++){
            lis[i].style.backgroundColor="#4A6279";
        }
        lis[0].style.backgroundColor="red";
    }
}
screen3.onmousewheel=function(e){
    if(event.wheelDelta<0){
        scrollDong(751*3);
        showZi4();
        hideZi2();
        hideZi3();
        hideZi5();
        for(var i=0;i<=3;i++){
            lis[i].style.backgroundColor="#4A6279";
        }
        lis[3].style.backgroundColor="red";
    }
    if(event.wheelDelta>0){
        scrollDong(751);
        showZi2();
        hideZi3();
        hideZi4();
        hideZi5();
        for(var i=0;i<=3;i++){
            lis[i].style.backgroundColor="#4A6279";
        }
        lis[1].style.backgroundColor="red";
    }
}
screen4.onmousewheel=function(e){
    if(event.wheelDelta<0){
        scrollDong(751*3);
        showZi4();
        hideZi2();
        hideZi3();
        showZi5();
        for(var i=0;i<3;i++){
            lis[i].style.backgroundColor="#4A6279";
        }
        lis[3].style.backgroundColor="red";
    }
    if(event.wheelDelta>0){
        scrollDong(751*2);
        showZi3();
        hideZi2();
        hideZi4();
        hideZi5();
        for(var i=0;i<=3;i++){
            lis[i].style.backgroundColor="#4A6279";
        }
        lis[2].style.backgroundColor="red";
    }
}

bottom.onmousewheel=function(e){
    if(event.wheelDelta<0){
        if(myScroll().scrollTop==751*3){
            scrollDong(751*3+130)
        }
        scrollDong(751*3+130);
        showZi4();
        hideZi2();
        hideZi3();
        showZi5();
        for(var i=0;i<3;i++){
            lis[i].style.backgroundColor="#4A6279";
        }
        lis[3].style.backgroundColor="red";
    }
    if(event.wheelDelta>0){
        scrollDong(751*2);
        showZi3();
        hideZi2();
        hideZi4();
        hideZi5();
        for(var i=0;i<=3;i++){
            lis[i].style.backgroundColor="#4A6279";
        }
        lis[2].style.backgroundColor="red";
    }
}
window.onload=function(){
    scrollDong(0);
}