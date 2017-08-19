/**
 * Created by yoyo on 2017-05-26.
 */

/**
 * 用于获取鼠标针对页面的横坐标
 * @param e 传入兼容后的事件对象
 * @returns {*} 返回鼠标针对页面的横坐标
 */
function getPageX(e) {
  if(e.pageX){
    return e.pageX;
  }else{
    return e.clientX + myScroll().scrollLeft;
  }
}

/**
 * 用于获取鼠标针对页面的纵坐标
 * @param e 传入兼容后的事件对象
 * @returns {*} 返回鼠标针对页面的纵坐标
 */
function getPageY(e) {
  if(e.pageY){
    return e.pageY;
  }else{
    return e.clientY + myScroll().scrollTop;
  }
}



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
 * 用于获取页面的卷曲距离(顶部距离和左侧距离)
 * @returns {{scrollTop: (Number|number), scrollLeft: (Number|number)}}  返回值为对象
 */
function myScroll() {
  return {
    scrollTop: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
    scrollLeft: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft
  };
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
 * 匀速版本的animate
 * @param tag 运动的标签
 * @param target 要运动到的left值
 */
function animateYs(tag, target) {
  // ---- 将每个盒子运动的定时器设置给这个标签的一个自定义属性
  clearInterval(tag.timer);//防止加速
  tag.timer = setInterval(function () {
    //1 标签当前位置的获取
    var leader = tag.offsetLeft;
    //2 设置运动的步长
    var step = 15;
    step = leader > target ? -step : step;
    
    if (Math.abs(leader - target) > Math.abs(step)) {//设置运动的目标位置
      //3 套用运动公式： 当前位置(新) = 当前位置(旧) + 步长
      leader = leader + step;
      //4 设置给标签的left
      tag.style.left = leader + "px";
    } else {
      tag.style.left = target + "px";
      clearInterval(tag.timer);//运动结束，清除定时器
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
 * 根据id名获取元素
 * @param idName 要获取的元素的id名，字符串类型
 * @returns {Element} 返回根据id名获取到的元素(标签形式)
 */
function id(idName) {
  return document.getElementById(idName);
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
 * @param tag
 * @param attrName
 * @returns {*}
 */
function getStyle(tag, attrName) {
  if (tag.currentStyle) {
    //说明支持
    return tag.currentStyle[attrName];
  } else {
    return getComputedStyle(tag, null)[attrName];
  }
  
  //return tag.currentStyle ? tag.currentStyle[attrName] : getComputedStyle(tag, null)[attrName];
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



/**
 * Created by yoyo on 2016-11-07.
 */


function getPageX(e) {
  //先检测是否存在pageX
  if (e.pageX) {
    return e.pageX;
  } else {
    //pageX的值是可视区域横坐标+页面左侧的卷曲距离
    return e.clientX + myScroll().left;
  }
}

function getPageY(e) {
  //先检测是否存在pageX
  if (e.pageY) {
    return e.pageY;
  } else {
    //pageX的值是可视区域横坐标+页面左侧的卷曲距离
    return e.clientY + myScroll().top;
  }
}


/**
 * 兼容事件对象
 * @param e 获取事件对象
 * @returns {*|Event} 返回兼容后的事件对象
 */
function getEvent(e) {
  return e || window.event;
}


/**
 * 对不同浏览器的移出事件方式进行兼容
 * @param tag 要移除事件的标签
 * @param eventName 事件类型名 - 不能加 on
 * @param fn 指定需要移除的事件处理程序
 */
function removeEvent(tag, eventName, fn) {
  if (typeof tag.removeEventListener == "function") {
    tag.removeEventListener(eventName, fn);
  } else {
    tag.detachEvent("on" + eventName, fn);
  }
}

/**
 * 对不同浏览器的添加事件方式进行兼容
 * @param tag 要添加事件的标签
 * @param eventName 事件类型名 - 不能加 on
 * @param fn 事件处理程序
 */
function addEvent(tag, eventName, fn) {
  if (typeof tag.addEventListener == "function") {
    tag.addEventListener(eventName, fn);
  } else {
    tag.attachEvent("on" + eventName, fn);
  }
}

/**
 * 自己实现多次给同一标签添加事件不覆盖的函数
 * @param tag 要添加事件的标签
 * @param eventName 事件类型名 - 不需要加 on
 * @param fn 事件处理程序
 */
function myAddEvent(tag, eventName, fn) {
  //问题出现在，每次添加事件的时候，查看以前有没有添加过这个事件
  //说白了，就是事件内部保存的值是否是函数
  //1 取出onclick内的值，查看是否是函数
  var oldEvent = tag["on" + eventName];
  if (typeof oldEvent == "function") {
    //说明有一个旧的点击事件处理程序存在
    //我们想让新的和旧的都在点击的时候执行
    tag["on" + eventName] = function () {
      oldEvent();
      fn();
    };
  } else {
    //没有添加过事件，就直接使用fn作为事件处理程序即可
    tag["on" + eventName] = fn;
  }
}


/**
 *
 * @param tag
 * @param attr
 * @returns {*}
 */
function getStyle(tag, attr) {
  if (tag.currentStyle) {
    return tag.currentStyle[attr];
  } else {
    return getComputedStyle(tag, null)[attr];
  }
//        return tag.currentStyle?tag.currentStyle[attr]:getComputedStyle(tag,null)[attr];
}

/**
 * 获取元素的内部文本
 * @param tag
 * @returns {*}
 */
function getText(tag) {
  if (typeof tag.innerText != "undefined") {
    return tag.innerText;
  } else {
    return tag.textContent;
  }
}

/**
 * 设置元素内部的文本
 * @param tag
 * @param text
 */
function setText(tag, text) {
  if (typeof tag.innerText != "undefined") {
    //设置文本内容
    tag.innerText = text;
  } else {
    tag.textContent = text;
  }
}

/**
 * 根据类名获取元素
 * @param clsName
 * @returns {Array}
 */
function getByClass(clsName) {
  //1 能力检测 检测当前执行的浏览器使用具有相应的功能
  //如果浏览器具有这个功能，说明内部是一个函数，类型为function
  //如果浏览器不支持，那么对象的属性不存在，值为undefined，转换bool值为false，进入else代码执行
//        if (typeof document.getElementsByClassName == "function") {
//            return document.getElementsByClassName(clsName);
//        } else {
  //自己写
  //找到页面中满足条件的标签
  //1 标签有多少？声明一个数组保存结果
  var resultArr = [];
  //2 获取body中的所有标签
  var tags = document.body.getElementsByTagName("*");
  //3 遍历所有标签
  for (var i = 0; i < tags.length; i++) {
    //4 取得tags[i]的类名，为了防止具有多个类名，需要将类名按照空格分开
    var str = tags[i].className;
    //5 分割后的数组
    var arr = str.split(" ");
    //6 遍历arr，查看每一个数组元素是否有和clsName相等的
    for (var j = 0; j < arr.length; j++) {
      if (arr[j] == clsName) {
        //tags[i]是我所需要，放入数组中
        resultArr.push(tags[i]);
        break;
      }
    }
  }
  return resultArr;

//        }

}

/**
 * 获取当前节点的所有兄弟
 * @param me
 * @returns {Array}
 */
function getSb(me) {
  //获取所有元素兄弟节点
  //获取方式：先找爹，在找儿子们，再去除自己
//        var me = document.getElementById("me");
  //有可能要获取所有兄弟的节点不具有id，造成了局限性
  //所以我们让用户直接传入节点进行操作
  //var me = document.getElementById(id);
  var meDie = me.parentNode;
  var resultArr = [];
  //获取所有元素子节点
  var xiongdis = meDie.children;
  //去掉自己
  for (var i = 0; i < xiongdis.length; i++) {
    //me跟xiongdis中的其中一个元素节点是完全相同的
    if (xiongdis[i] != me) {
      //要了他
      resultArr.push(xiongdis[i]);
    }
  }

//        console.log(resultArr);
  return resultArr;

}

/**
 * 获取后一个兄弟节点
 * @param node  元素节点
 * @returns {*|Node}  返回获取到的元素节点 或者null
 */
function getNextEleSib(node) {
  var ns = node.nextSibling;
  //如果获取到null  ns.nodeType
  while (null != ns && 1 != ns.nodeType) {
    //从新获取的元素找下一个
    ns = ns.nextSibling;
  }
  return ns;
}

/**
 * 获取前一个兄弟节点
 * @param node  元素节点
 * @returns {*|Node}  返回获取到的元素节点 或者null
 */
function getPreEleSib(node) {
  //获取node的前一个兄弟节点
  var ps = node.previousSibling;
  //检测这个节点。如果不是null也不是元素节点。继续查找
  while (null != ps && 1 != ps.nodeType) {
    //再找ps的上一个兄弟节点
    ps = ps.previousSibling;
  }

  return ps;
}

function myScroll() {
  return {
    top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
    left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
  };
}

function myClient() {
  return {
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0,
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0
  };
}

/**
 * 跳楼特效
 * @param target
 */
function scrollDong(target) {
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
  }, 20);
}