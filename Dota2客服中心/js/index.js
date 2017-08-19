/**
 * Created by htf19 on 2017/6/21.
 */
//左侧导航栏下拉菜单

$(function(){
    var i = 1;
    //鼠标单击，向下箭头隐藏，向上箭头显示，显示子菜单
    $('.main-left>ul>li').click(function(){
        $(this).find('.down').css('transform','rotate('+180*i+'deg)');//每点击一次，向下箭头旋转180度
        $(this).siblings('li').find('.down').css('display','block');//其他li向下箭头显示
        $(this).find('.hidebox').slideToggle();//点击项子菜单向下滑动
        i++;
    })
})
