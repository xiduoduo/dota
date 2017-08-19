//顶部导航
$(".head-nav li").mouseenter(function(){
   $(this).find(".nav-span1,.nav-span2").css("color","gold");
});
$(".head-nav li").mouseleave(function(){
   $(this).find(".nav-span1,.nav-span2").css("color","");
});
//middle-nav
$(".middle-nav li").mouseenter(function(){
   $(this).find("a").css("color","#63b8c6");
});
$(".middle-nav li").mouseleave(function(){
   $(this).find("a").css("color","");
});
//了解更多
$(".knowMore").mouseenter(function(){
   $(this).css("backgroundPosition","-5px -27px");
});
$(".knowMore").mouseleave(function(){
   $(this).css("backgroundPosition","-5px -1px");
});
//match
$(".match li a").each(function(i){
    $(this).mouseenter(function(){
        $(this).children("h4").css("color","#63b8c6").siblings("img").attr("src","images/match-0"+(i+1)+"hover.jpg").parent("a").parent("li").stop().animate({marginTop:"-20"},400);
   });
    $(this).mouseleave(function(){
        $(this).children("h4").css("color","").siblings("img").attr("src","images/match-0"+(i+1)+".jpg").parent("a").parent("li").stop().animate({marginTop:"0"},400);
   });
});
//main



//share
$(".left").each(function(i){
    $(this).mouseenter(function(){
        $(this).children("a").css({
            color:"#C20813",
            backgroundPosition:" 0 -"+(i*100+50)+"px"
        });
    });
    $(this).mouseleave(function(){
        $(this).children("a").css({
            color:"",
            backgroundPosition:" 0 -"+i*100+"px"
        });
    });
});
$(".middle:eq(0)").mouseenter(function(){
   $(this).children("a").css({
      color:"#C20813" ,
       backgroundPosition:"0 -350px"
   });
});
$(".middle:eq(1)").mouseenter(function(){
   $(this).children("a").css({
      color:"#4e9f2f" ,
       backgroundPosition:"0 -450px",
   }).children("i").show();
});
$(".middle:eq(2)").mouseenter(function(){
   $(this).children("a").css({
      color:"#0e89ac" ,
       backgroundPosition:"0 -550px"
   });
});
$(".middle").each(function(i){
    $(this).mouseleave(function(){
        $(this).children("a").css({
            color:"",
            backgroundPosition:" 0 -"+(i+3)*100+"px"
        }).children("i").hide();
    });
});
//$(".download").mouseenter(function(){
//   $(this).children("a").css({
//       backgroundImage:"url(../images/download.png)",
//       backgroundPosition:"0px -5px"
//   });
//});



//main
$(".newGamer").mouseenter(function(){
   $(this).stop().animate({top:"200"},400).children("a").stop().animate({opacity:"1"},400).parent().siblings(".iceGirl").stop().animate({opacity:"1",left:"120"},400).siblings(".commander").stop().animate({opacity:"0",right:"0"},400);
});
$(".newGamer").mouseleave(function(){
   $(this).stop().animate({top:"220"},400).children("a").stop().animate({opacity:"0.5"},400);
});
$(".oldGamer").mouseenter(function(){
   $(this).stop().animate({top:"200"},400).children("a").stop().animate({opacity:"1"},400).parent().siblings(".commander").stop().animate({opacity:"1",right:"80"},400).siblings(".iceGirl").stop().animate({opacity:"0",left:"0"},400);
});
$(".oldGamer").mouseleave(function(){
    $(this).stop().animate({top:"220"},400).children("a").stop().animate({opacity:"0.5"},400);
});