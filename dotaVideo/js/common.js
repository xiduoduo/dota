/**
 * Created by Administrator on 2017/5/29.
 */
function my$(id) {
    return document.getElementById(id);
};
function my$1(TagName) {
    return document.getElementsByTagName(TagName);
};
function my$2(className){
    return document.getElementsByClassName(className);
}


function animate(tag, target) {
    clearInterval(tag.timer);//防止加速
    tag.timer = setInterval(function () {
        //1 获取元素当前位置
        var current = tag.offsetLeft;
        //2 设置运动步长:(target - current)/10
        var step = (target - current) / 10;
        //2.1 由于使用offsetLeft取值会进行四舍五入，所以我们只需要让step不会特别小
        //根据正负进行不同的取整方式
        step = step > 0 ? Math.ceil(step) : Math.floor(step);

        //3 套用运动公式
        current = current + step;
        //4 设置给对应的left值
        tag.style.left = current + "px";

        //5 检测，到达位置设置清除
        if (current == target) {
            clearInterval(tag.timer);
        }
    }, 20);
}



/**轮播图最终版本
tag是标签，datas是对象，fn是自调用函数
 */
//function animate(tag, datas, fn) {
//    clearInterval(tag.timer);//防止加速
//    tag.timer = setInterval(function () {
//        //现将控制运动的所有代码全取出
//        //定时器在执行本次代码前设置假设条件
//        var flag = true;//假设清除
//        for (var k in datas) {
//            //k - 属性名 - 相当于attr 要进行运动的样式名
//            //datas[k] - 属性值 - 相当于target，要让某个样式运动到的位置
//            if (k == "opacity") {
//                //透明度处理
//                var target = datas[k] * 1000;
//                //扩大倍数，防止出现计算精度问题
//                //检测发现ie中透明度不会获取到auto，所以不需要进行||0处理
//                //opacity是C3属性，ie低版本不支持
//                var current = getStyle(tag, k) * 1000;
//                var step = (target - current) / 10;
//                step = step > 0 ? Math.ceil(step) : Math.floor(step);
//                current = current + step;
//                tag.style[k] = current / 1000;//设置时缩小相应的倍数
//                if (current != target) {
//                    flag = false;
//                }
//            } else if (k == "zIndex") {
//                //层级处理不需要进行渐变操作，直接设置项
//                tag.style.zIndex = datas[k];
//            } else {
//                var target = datas[k];
//                var current = parseInt(getStyle(tag, k)) || 0;
//                var step = (target - current) / 10;
//                step = step > 0 ? Math.ceil(step) : Math.floor(step);
//                current = current + step;
//                tag.style[k] = current + "px";
//                if (current != target) {
//                    flag = false;
//                }
//            }
//        }
//        //修改后的代码位置：
//        //我们需要保证每个样式都到达了执行位置，所以在循环结束后进行判断
//        if (flag) {
//            clearInterval(tag.timer);
//            if (typeof fn == "function") {
//                fn();
//            }
//        }
//    }, 20);
//}
//
//function getStyle(tag, attr) {
//    if (window.getComputedStyle) {
//        return getComputedStyle(tag, null)[attr];
//    } else {
//        return tag.currentStyle[attr];
//    }
//}

/**
 *防止任意事件覆盖的函数封装
 * @param tag  标签元素
 * @param eventName  事件名  么有on
 * @param myCode   函数体
 */
function addEvent(tag, eventName, myCode) {
    //当我给一个标签添加事件之前，就要考虑这个标签以前是否添加过某事件

    var oldEvent = tag["on" + eventName];             //取出点击事件内部保存的值
    if (typeof oldEvent == "function") {    //检测btn当前的onclick是否具有函数值
        //说明前面已经添加过了事件，需要保证新的代码和旧的代码都执行
        tag["on" + eventName] = function () {
            oldEvent();         //执行旧代码
            myCode();           //执行新代码
        };
    } else {
        //说明btn以前没有添加过点击事件，直接设置新代码
        tag["on" + eventName] = myCode;
    }
}