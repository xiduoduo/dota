/**
 * 格式化时间 例如2017年06月14日18:57:29
 * @param dt
 * @returns {string}
 */
function getDate(dt) {
    //获取年
    var year = dt.getFullYear();
    //获取月==由0开始
    var month = dt.getMonth() + 1;
    //获取日=====getDay()是星期  getDate()是日期
    var day = dt.getDate()
    //获取小时
    var hour = dt.getHours();
    //获取分钟
    var minute = dt.getMinutes();
    //获取秒
    var second = dt.getSeconds();
    //解决显示双位数的09====三元运算符
    //月份
    month = month < 10 ? "0" + month : month;
    //日期
    day = day < 10 ? "0" + day : day;
    //小时
    hour = hour < 10 ? "0" + hour : hour;
    //分钟
    minute = minute < 10 ? "0" + minute : minute;
    //秒
    second = second < 10 ? "0" + second : second;

    return year + "年" + month + "月" + day + "日" + hour + ":" + minute + ":" + second;
}


/**
 * id元素的简写
 * @param id
 * @returns {Element}
 */
function my$(id) {
    return document.getElementById(id);
};

/**
 * 设置   任意一个元素的任意文本内容
 * @param element
 * @param text
 */
function setInnerText(element, text) {
    if (typeof(element.textContent) == 'undefined') {
        //不支持
        element.innerText = text;
    } else {
        //支持
        element.textContent = text;
    }
};

/**
 * 获取  任意一个元素的文本内容
 * @param element
 * @returns {*}
 */
function getInnerText(element) {
    if (typeof(element.textContent) == 'undefined') {
        //不支持
        return element.innerText;
    } else {
        //支持
        return element.textContent;
    }
}


/**
 *获取任意元素中的第一个子元素
 * @param element
 * @returns {*}
 */
function getFirstElement(element) {
    if (element.firstElementChild) {
        return element.firstElementChild;
    } else {
        var node = element.firstChild;
        while (node && node.nodeType != 1) {
            node = node.nextSibling;
        }
        return node;
    }
}


/**
 * 获取任意元素中的最后一个子元素
 * @param element
 * @returns {*}
 */
function getLastElement(element) {
    if (element.lastElementChild) {
        return element.lastElementChild;
    } else {
        var node = element.lastChild;
        while (node && node.nodeType != 1) {
            node = node.previousSibling;
        }
        return node;
    }
}


/**
 * 匀速版本的animate
 * @param tag 运动的标签
 * @param target 要运动到的left 值
 */
function animateYs(tag, target) {
    clearInterval(tag.timer);//防止加速
    tag.timer = setInterval(function () {
        //获取元素当前的位置
        var current = tag.offsetLeft;
        //设置运动的步长
        var step = 9;
        step = current > target ? -step : step;
        if (Math.abs(target - current) > Math.abs(step)) {
            //套用运动公式
            current = current + step;
            //将最后位置设置给left
            tag.style.left = current + "px";
        } else {
            tag.style.left = target + "px";
            clearInterval(tag.timer);
        }


    }, 20)
}


/**
 * 任意样式运动的animate
 * @param tag
 * @param attr
 * @param target
 */
function animate1(tag, attr, target) {
    clearInterval(tag.timer);//防止加速
    tag.timer = setInterval(function () {
        //1 获取元素指定的样式的当前值
        //使用getStyle获取的样式值有单位，所以在计算时需要去除单位再进行操作即可；
        //如果某一个样式没有设置默认值，这时在ie中获取结果是auto，这时转换后结果为NaN
        //可以使用逻辑运算符的操作，保证current不会获取到NaN的值。
        var current = parseInt(getStyle(tag, attr)) || 0;
        //2 设置运动步长:(target - current)/10
        var step = (target - current) / 10;
        //2.1 由于使用offsetLeft取值会进行四舍五入，所以我们只需要让step不会特别小
        //根据正负进行不同的取整方式
        step = step > 0 ? Math.ceil(step) : Math.floor(step);

        //3 套用运动公式
        current = current + step;
        //4 设置给对应的样式值
        tag.style[attr] = current + "px";

        //5 检测，到达位置设置清除定时器
        if (current == target) {
            clearInterval(tag.timer);
        }
    }, 20);
}




/**
 * 用于给某个标签同时设置多个样式
 * @param tag 要进行设置的标签
 * @param datas 对象形式，属性名为需要设置的样式名，对应属性值为需要设置的样式值
 */
function setStyle(tag, datas) {
    //style保存了tag.style这个对象的指针，下次可以直接根据style找到这个对象，而不需要再去tag中进行查找
    var style = tag.style;
    //由于datas是一个对象，想要操作对象内部的数据，先进行遍历
    for (var k in datas) {
        //k - 属性名 - 字符串形式 - 表示需要设置的样式名
        //datas[k] - 属性值 - 表示需要设置的样式k所对应的样式值
        style[k] = datas[k];
    }
}




/**
 * 缓动版本的animate
 * @param tag 要进行运动的标签
 * @param datas 要进行运动的样式，对象形式
 * @param fn 运动结束后要执行的代码，回调函数
 */
function animate(tag, datas, fn) {
    clearInterval(tag.timer);
    tag.timer = setInterval(function () {

        var flag = true;
        for (var k in datas) {
            if (k == "opacity") {
                //透明度处理
                var target = datas[k] * 1000;
                //扩大倍数，防止计算精度问题
                //检测发现，ie中透明度不会获取到auto，所以不需要进行||0处理
                //opacity是c3属性，ie低版本不支持
                var current = getStyle(tag, k) * 1000;
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current = current + step;
                //设置时缩小对应的倍数
                tag.style[k] = current / 1000;

                if (current != target) {
                    flag = false;
                }
            } else if (k == "zIndex") {
                //层级处理:层级不需要进行渐变操作，只需要直接设置即可
                tag.style.zIndex = datas[k];
            } else {
                //k - 属性名 - 相当于attr 要进行运动的样式名
                //datas[k] - 属性值 - 相当于target，要让某个样式运动到的位置
                var target = datas[k];
                var current = parseInt(getStyle(tag, k)) || 0;
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current = current + step;
                tag.style[k] = current + "px";

                if (current != target) {
                    flag = false;
                }
            }
        }
        if (flag) {
            clearInterval(tag.timer);
            fn && fn();
        }
    }, 20);
}





/**
 * 有必要更改
 * @param tag 标签名元素
 * @param attr 样式值
 * @returns {*}
 */
function getStyle(tag, attr) {
    //想要先使用getComputedStyle进行检测
    //强行添加window，使getComputedStyle变成方法的访问方式，这时即使不存在，值为undefined而不会报错
    if (window.getComputedStyle) {
        return getComputedStyle(tag, null)[attr];
    } else {
        return tag.currentStyle[attr];
    }
}


/**
 *
 * @param obj
 * @param attr
 * @returns {*}
 */
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return window.getComputedStyle(obj, null)[attr];
    }
}


/**
 * 用于获取鼠标针对页面的坐标
 * @param e 传入兼容后的事件对象
 * @returns {*}返回鼠标针对页面的横纵坐标
 */
function getPageX(e) {
    if (e.pageX) {
        return e.pageX;
    } else {
        return e.clientX + myScroll().scrollLeft;
    }
}
function getPageY(e) {
    if (e.pageY) {
        return e.pageY;
    } else {
        return e.clientY + myScroll().scrollTop;
    }
}


/**
 * 用于获取页面的卷曲距离（顶部距离和左侧距离）
 * @returns {{scrollTop: (Number|number), scrollLeft: (Number|number)}} 返回值为对象
 */
function myScroll() {
    return {
        scrollTop: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
        scrollLeft: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft
    };
}


/**
 * 防止任意事件覆盖的函数封装
 * @param tag  事件源==标签名
 * @param eventName ===事件名不加on
 * @param myCode===匿名函数
 *  addEvent(btn, "mouseover", function () {
    console.log("这是我得代码3");
  });
 */
function addEvent(tag, eventName, myCode) {
    var oldEvent = tag["on" + eventName];
    if (typeof oldEvent == "function") {

        tag["on" + eventName] = function () {
            oldEvent();         //执行旧代码
            myCode();           //执行新代码
        };
    } else {
        tag["on" + eventName] = myCode;
    }
}


/**
 * 第一个是兼容事件对象
 * 兼容获取方式
 * @type {Event}
 */
var e = e || window.event;
var tar = e.target || e.srcElement;


/**
 * 用于获取页面可视区域的宽高
 * @returns {{width: (Number|number), height: (Number|number)}} 返回值为对象
 */
function myClient() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    };
}








/**
 *
 * @param tag
 * @param text
 */
function setText(tag, text) {
    if (tag.innerText !== undefined) {
        //支持这个属性，使用即可
        tag.innerText = text;
    } else {
        tag.textContent = text;
    }
}


function getText(tag) {
    if (tag.innerText != undefined) {
        return tag.innerText;
    } else {
        return tag.textContent;
    }
}

/**
 *
 * @param tag 要操作的标签
 * @param textVal   参数2 可选，如果传入，表示设置内容，如果没传表示获取内容
 * @returns {*} 获取到的内容（不一定有）
 */
function text(tag, textVal) {
    if (textVal != undefined) {
        tag.innerText != undefined ? tag.innerText = textVal : tag.textContent = textVal;
    } else {
        return tag.innerText != undefined ? tag.innerText : tag.textContent;
    }
}













/**
 *
 * @param clsName
 * @param targetElement 参数2 可选，表示在某个标签内部进行类名的获取
 * @returns {*}
 */
function getByClass(clsName, targetElement) {
    //需要先对第二个参数进行处理
    //两种情况，有值，是一个标签，如果没有值，undefined
//    if(!targetElement){
//      targetElement = document.body;
//    }

    targetElement = targetElement || document.body;


    //ie9以下不支持getElementsByClassName这个方法，并且也没有实现对应的获取方式，需要自己书写功能实现根据类名获取元素的方式

    //先进行能力检测，如果浏览器支持，就使用，如果不支持再自己书写
    //if(typeof document.getElementsByClassName == "function"){
    //getElementsByClassName是一个方法或者说是属性，如果支持，是一个函数值，如果不支持，值为undefined
    if (targetElement.getElementsByClassName) {//可以直接利用隐式转换的结果进行判断
        return targetElement.getElementsByClassName(clsName);
    } else {
        var resultArr = [];//用于保存获取到的标签
        //自己书写根据类名获取元素的功能：
        //1 获取所有的标签(由于我们使用的标签只会在body内部，所以可以缩小检索的范围)
        var tags = targetElement.getElementsByTagName("*");//获取所有的标签
        var tempCls, tempArr, j;
        //2 依次检测每个标签的类名属性className
        for (var i = 0; i < tags.length; i++) {
            tempCls = tags[i].className;//保存了一下className的值(本步骤中这一行可选)

            //有类名才进行执行
            if (tempCls) {
                //3 检测时需要考虑一个标签可能具有多个类名，如果其中有某一个部分满足条件，就符合我的需求了，可以取出。
                //将tempCls按照空格分隔
                tempArr = tempCls.split(" ");

                //4 遍历tempArr检测，如果其中的某一个元素值和box相等， 说明是我需要的标签
                for (j = 0; j < tempArr.length; j++) {
                    if (tempArr[j] == clsName) {
                        //5 放入到resultArr中即可
                        resultArr[resultArr.length] = tags[i];
                        //6 找到一个就可以满足条件了，跳出即可
                        break;
                    }
                }
            }
        }

        return resultArr;

    }
}


function getSib(item) {
    var resultArr = [];

    //通过一段代码，获取到除了我以外的所有同级元素
    //找到含我在内的所有元素，再取出不是我的
    var lis = item.parentNode.children;
    for (var i = 0; i < lis.length; i++) {
        if (lis[i] != item) {
            //获取出除我以外的其他元素
            resultArr[resultArr.length] = lis[i];
        }
    }
    return resultArr;
}



/**
 *
 * @param clsName
 * @param targetElement 参数2 可选，表示在某个标签内部进行类名的获取
 * @returns {*}
 */
function getByClass(clsName, targetElement) {
    //需要先对第二个参数进行处理
    //两种情况，有值，是一个标签，如果没有值，undefined
//    if(!targetElement){
//      targetElement = document.body;
//    }

    targetElement = targetElement || document.body;


    //ie9以下不支持getElementsByClassName这个方法，并且也没有实现对应的获取方式，需要自己书写功能实现根据类名获取元素的方式

    //先进行能力检测，如果浏览器支持，就使用，如果不支持再自己书写
    //if(typeof document.getElementsByClassName == "function"){
    //getElementsByClassName是一个方法或者说是属性，如果支持，是一个函数值，如果不支持，值为undefined
    if (targetElement.getElementsByClassName) {//可以直接利用隐式转换的结果进行判断
        return targetElement.getElementsByClassName(clsName);
    } else {
        var resultArr = [];//用于保存获取到的标签
        //自己书写根据类名获取元素的功能：
        //1 获取所有的标签(由于我们使用的标签只会在body内部，所以可以缩小检索的范围)
        var tags = targetElement.getElementsByTagName("*");//获取所有的标签
        var tempCls, tempArr, j;
        //2 依次检测每个标签的类名属性className
        for (var i = 0; i < tags.length; i++) {
            tempCls = tags[i].className;//保存了一下className的值(本步骤中这一行可选)

            //有类名才进行执行
            if (tempCls) {
                //3 检测时需要考虑一个标签可能具有多个类名，如果其中有某一个部分满足条件，就符合我的需求了，可以取出。
                //将tempCls按照空格分隔
                tempArr = tempCls.split(" ");

                //4 遍历tempArr检测，如果其中的某一个元素值和box相等， 说明是我需要的标签
                for (j = 0; j < tempArr.length; j++) {
                    if (tempArr[j] == clsName) {
                        //5 放入到resultArr中即可
                        resultArr[resultArr.length] = tags[i];
                        //6 找到一个就可以满足条件了，跳出即可
                        break;
                    }
                }
            }
        }

        return resultArr;

    }
}


function getSib(item) {
    var resultArr = [];

    //通过一段代码，获取到除了我以外的所有同级元素
    //找到含我在内的所有元素，再取出不是我的
    var lis = item.parentNode.children;
    for (var i = 0; i < lis.length; i++) {
        if (lis[i] != item) {
            //获取出除我以外的其他元素
            resultArr[resultArr.length] = lis[i];
        }
    }
    return resultArr;
}




/**
 * 创建标签并添加到某个位置
 * @param tagName 需要进行创建的标签的标签名
 * @param targetEle 要添加到的位置
 * @returns {Element} 返回创建的元素
 */
function crt(tagName, targetEle) {
    var tag = document.createElement(tagName);
    targetEle.appendChild(tag);

    //可以将创建的这个标签进行返回，方便操作
    return tag;
}


function nextEle(tag) {
    var next = tag.nextSibling;
    while (next && next.nodeType != 1) {
        //再进行一次取值
        next = next.nextSibling;
    }
    return next;
}
function prevEle(tag) {
    var prev = tag.previousSibling;
    while (prev && prev.nodeType != 1) {
        //再进行一次取值
        prev = prev.previousSibling;
    }
    return prev;
}