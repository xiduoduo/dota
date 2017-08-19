/**
 * Created by htf19 on 2017/6/20.
 */
//导航栏按钮鼠标移入移出事件
$(function(){
    $('.navbtns li ').mouseenter(function(){
        $('.current').css({
            'border':"1px solid #3A3A3D",
            'borderBottom':'2px solid #B1402A',
        })
        $(this).css({
            'border':"1px solid #3A3A3D",
            'borderBottom':'2px solid #B1402A',
        })
    })
    $('.navbtns li').mouseleave(function(){
        $(this).css('border','none');
    })
})

//点击按钮·跳转顶部
$(function(){
    $('#btns').find(".aaa").click(function(){
        window.scrollTo(1349,0)
    })
})
//瀑布流
var datas=[
    {"src":"images/p_001.jpg", "height":130},
    {"src":"images/p_002.jpg", "height":327},
    {"src":"images/p_003.jpg", "height":414},
    {"src":"images/p_004.jpg", "height":231},
    {"src":"images/p_005.jpg", "height":326},
    {"src":"images/p_006.jpg", "height":231},
    {"src":"images/p_007.jpg", "height":231},
    {"src":"images/p_008.jpg", "height":231},
    {"src":"images/p_009.jpg", "height":231},
    {"src":"images/p_010.jpg", "height":231},
    {"src":"images/p_011.jpg", "height":323},
    {"src":"images/p_012.jpg", "height":231},
    {"src":"images/p_013.jpg", "height":231},
    {"src":"images/p_014.jpg", "height":231},
    {"src":"images/p_015.jpg", "height":231},
    {"src":"images/p_016.jpg", "height":231},
    {"src":"images/p_017.jpg", "height":231},
    {"src":"images/p_018.jpg", "height":231}
];
//1 ulCount是ul的个数，也就是每一行可以放多少图片
var ulCount=Math.floor(1024/231);

//2 根据ulcount的值创建li
var imglist=document.getElementById("imglist");
var ul;
var heightArr=[];//数组用于存放那几个ul的高度
for(var i=0;i<ulCount;i++) {
    ul = document.createElement("ul");
    imglist.appendChild(ul);
    //初始化每个ul的高度值，保存在一个数组中
    heightArr.push(0);
}
    //所有的ul，方便使用
    var allUl = imglist.children;
    //3 根据datas中的数组动态创建li，并且找到某个ul进行放入即可
    //使用封装函数
    createPic(datas);
    //4 触底加载：当页面滚动时，检测当前页面的滚动位置
    //如果最低的ul显示完全后，还在继续滚动，必须加载图片
    //触发加载机制：可视区域的高度+页面卷曲的高度>最低ul高度
    window.onscroll=function(){
        if(myScroll().scrollTop<5000){
            var minHeight=getMin(heightArr).value;
            if(myClient().height+myScroll().scrollTop>minHeight){
                createPic(datas);
            }
        }
    };

    //封装函数
    function createPic(datas){
        var li,pic;//申明两个变量
        for(var i=0;i<datas.length;i++){
            li=document.createElement("li");//创建li
            pic=document.createElement("img");//创建img
            pic.src=datas[i].src;//设置img的src
            li.appendChild(pic);//将img放入li中
            //3.1找到当前最低的ul，将li进行放入
            var index=getMin(heightArr).index;//获取到高度数组中最小值的索引
            //由于高度数组中的值和ul是对应的，所以使用索引取到最小值对应的最低的ul，将li放入其中
            allUl[index].appendChild(li);
            //3.2由于ul的高度改变，heightArr不会自动更新，所以手动设置当前插入li的ul所对应的heightArr中的高度进行更新
            heightArr[index]+=datas[i].height;
        }
    }

    //计算数组最小值
    function getMin(arr){
        var minValue=arr[0];
        var minIndex=0;//最小值的索引
        for(var i=0;i<arr.length;i++){
            if(minValue>arr[i]){
                minValue=arr[i];
                minIndex=i;
            }
        }
        return {
            index:minIndex,//最小值的索引
            value:minValue//最小值
        };
    }

    //页面可见区域宽度及高度
    function myClient() {
        return {
            width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
            height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
        }
    }

    //卷曲宽度及高度
    function myScroll() {
        return {
            scrollTop: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
            scrollLeft: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
        };
}

