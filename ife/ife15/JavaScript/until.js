// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    // your implement
    return arr instanceof Array;
}
// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    // your implement
    var flag;
    if (typeof(fn) === 'function') {
        flag = true;
    } else {
        flag = false;
    }
    return flag;
}
// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    //返回其结果
    var result;
    if(typeof(src) == 'object'){
        if(Object.prototype.toString.call(src)==="[object Date]"){
            //对于日期，直接复制。
            result = src;
        }else{
            //判断对象的类型是Array还是Object，结果类型更改
            result = Array.isArray(src)? [] : {};
            //遍历对象
            for(var i in src){
                //排除继承属性
                if(src.hasOwnProperty(i)){
                    //判断对象属性是否为对象
                    if(typeof(i) !== 'object'){
                        //不是，直接复制
                        result[i] = src[i];
                    }else{
                        //是，则递归调用closeObject
                        result[i] = cloneObject(src[i]);
                    }
                }
            }
        }
    }else{//对于原始类型直接复制。
        result = src
    }
    return result;
}
// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    // your implement
    var result = [],
        i,length;
    for(i=0,length=arr.length;i<length;i++){
        if(result.indexOf(arr[i]) === -1){
            result.push(arr[i]);
        }
    }
    return result;
}
// 中级班同学跳过此题
// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    // your implement
    var string = "";
    for(var i = 0,len = str.length;i<len;i++){
        if(str[i] !== ' ' && str[i] !== '\t') break;
    }
    for(var j = str.length-1;j>=0;j--){
        if(str[i] !== ' ' && str[i] !== '\t') break;
    }
    string = str.slice(i,j+1);
    return string;
}
// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    // your implement
    var string = "";
    string = str.replace(/^\s+|\s+$/g,'');
    return string;
}
// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    // your implement
    for(var i = 0 ,len = arr.length;i < len; i++){
        fn(arr[i],i);
    }
}
// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var num = 0;
    for(var i in obj){
        if(obj.hasOwnProperty(i)) num++;
    }
    return num;
}
// 判断是否为邮箱地址
function isEmail(emailStr) {
    // your implement
    var emailReg = /^([A-Za-z0-9_-])+@([A-Za-z0-9])+\.([A-Za-z0-9])+$/;
    return emailReg.test(emailStr);
}
// 判断是否为手机号
function isMobilePhone(phone) {
    // your implement
    var phoneReg = /^1\d{10}$/;
    return phoneReg.test(phone);
}


//检测是否有该类名
function hasClassName(element, hClass){
  return element.className.match(new RegExp("(\\s|^)" + hClass + "(\\s|$)"));
}
function addClass(element, newClassName) {
  // your implement
  if(hasClassName(element,newClassName)){
    console.log('已有此类名');
  }else{
    element.className += " " + newClassName;
  }
}
function removeClass(element, oldClassName) {
  // your implement
  var classNames = element.className.split(/\s+/), // 获取类名集合剪切成数组
      pos, // 此变量是获取有类名的下标
      i,
      len;
  for(i = 0,len = classNames.length;i < len;i++){ //循环元素类名
    if(classNames[i] == oldClassName){ //如果数组中的一个className等于oldClassName ,把该元素的下标赋值pos 结束循环
      pos = i;
      break;
    }
  }
  classNames.splice(pos, 1); //剪切已有元素的下标
  element.className = classNames.join(" "); //重新设置类名
}
// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    // your implement
    return element.parentNode === siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    // your implement
    var obj = {};
    obj.x = element.getBoundingClientRect().left + window.scrollX;
    obj.y = element.getBoundingClientRect().top + window.scrollY;
    return obj;
    //当计算边界矩形时，会考虑视口区域（或其他可滚动元素）内的滚动操作，也就是说，当滚动位置发生了改变，top和left属性值就会随之立即发生变化（因此，它们的值是相对于视口的，而不是绝对的）。如果不希望属性值随视口变化，那么只要给top、left属性值加上当前的滚动位置（通过window.scrollX和window.scrollY），这样就可以获取与当前的滚动位置无关的常量值。
}
// 实现一个简单的Query
function querySelector(selector, root){
  var elements = [],
      allChildren = null;
  root = root || document;
  switch (selector.charAt(0)) {
        case "#": //id选择器
          elements.push(root.getElementById(selector.substring(1)));
          break;
        case ".": //类选择器
          if (root.getElementsByClassName) {
            elements.push(root.getElementsByClassName(selector.substring(1)));
          }else{ //兼容低版本浏览器
            var reg = new RegExp("\\b" + selector.substring(1) + "\\b"),
                i,
                len;
            allChildren = root.getElementsByTagName("*");
            for(i = 0, len = allChildren.length; i < len; i++){
              if(reg.test(allChildren[i].className)){
                elements.push(allChildren[i]);
              }
            }
          }
          break;
        case "[":
          if(selector.indexOf("=") === -1) {
            allChildren = root.getElementsByTagName("*");
            for(var i = 0, len = allChildren.length; i<len; i++){
              if(allChildren[i].getAttribute(selector.slice(1, -1)) !== null){
                elements.push(allChildren[i]);
              }else{
                var index = selector.indexOf("=");
                allChildren = root.getElementsByTagName("*");
                for(var i = 0, len = allChildren.length; i<len; i++){
                  if(allChildren[i].getAttribute(1, index) === selector.slice(index + 1, -1)){
                    element.push(allChildren[i]);
                  }
                }
              }
            }
          }
          break;
        default:
          // 标签选择器
          elements = root.getElementsByTagName(selector);
          break;
      }
  return elements;
}
function $(selector) {
  if(selector == document){
    return document;
  }
  selector = selector.trim();
  if(selector.indexOf(" ") !== -1){
    var selectorArr = selector.split(/\s+/);
    return querySelector(selectorArr[1], querySelector(selectorArr[0])[0])[0];
  }else{
    return querySelector(selector,document)[0];
  }
}
// 给一个element绑定一个针对event事件的响应，响应函数为listener
  /**
   * 事件添加函数
   * @param {object}   element  需要绑定事件的对象
   * @param {string}   event    事件类型
   * @param {function} listener 事件触发执行的函数
   */
  function addEvent(element, event, listener) {
    // your implement
    if (element.addEventListener) {
      element.addEventListener(event, listener);
    } else if(element.attachEvent) {
      element.attachEvent("on" + event, listener); //低版本IE浏览器
    }else{
      element["on" + event] = listener;
    }
  }

  // 例如：
  /**
   * 事件添加函数
   * @param {object}   element  需要移除事件的对象
   * @param {string}   event    事件类型
   * @param {function} listener 事件被移除的函数
   */
  // 移除element对象对于event事件发生时执行listener的响应

  function removeEvent(element, event, listener) {
    // your implement
    if (element.removeEventListenr) {
      element.removeEventListenr(event, listener);
    }else if (element.detachEvent) {
      element.detachEvent("on" + event, listener);
    } else {
      element["on" + event] = null;
    }
  }
  // 实现对click事件的绑定
function addClickEvent(element, listener) {
    // your implement
  addEvent(element,"click",listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    // your implement
   addEvent(element,"keydown",function(e){
    var event = e || window.event;
    if(event.keyCode === 13){
      listener();
    }
   });
}
  /**
   *结合DOM.html运用
   *addEvent(element, event, listener) -> $.on(element, event, listener);
   *removeEvent(element, event, listener) -> $.un(element, event, listener);
   *addClickEvent(element, listener) -> $.click(element, listener);
   *addEnterEvent(element, listener) -> $.enter(element, listener);
   */

   $.on = function(element, event, listener) {
       return addEvent($(element), event, listener);
   };

   $.un = function(element, event, listener) {
    return removeEvent($(element), event, listener);
   };
   $.click = function(element, listener) {
    return addClickEvent($(element), listener);
   };
   $.enter = function(element, listener) {
    return addEnterEvent($(element), listener);
   };
   $.delegate = delegateEvent;
  // 先简单一些
  function delegateEvent(element, tag, eventName, listener) {
    // your implement
    return addEvent($(element), eventName, function(ev) {
      var oEvent = ev || window.event,
          target = oEvent.target || oEvent.srcElement;
      if(target.nodeName.toLowercase() === tag){
        listener.call(target, oEvent);
      }
    });
  }
  //BOM
  // 判断是否为IE浏览器，返回-1或者版本号
    function isIE() {
      // your implement
      var browerAgent = navigator.userAgent,
            ieAgent  = browerAgent.match(/(MSIE\s|trident.*rv:)([\w.])+/);
      if (ieAgent) {
            return ieAgent[1];
      } else {
            return -1;
      }
    }
    isIE();
    // 设置cookie
    function setCookie (cookieName, cookieValue, expiredays) {
        // your implement
      var endDate = new Date();
      endDate.setDate(endDate.getDate() + expiredays);
        document.cookie = cookieName + "=" + cookieValue + ";expires=" + endDate;
    }
    setCookie("baidu", "www.baidu.com",2);
    // 获取cookie值
    function getCookie (cookieName) {
        // your implement
        var cookieData = document.cookie.split(";"),
             i,
             len;
        for (i = 0, len = cookieData.length; i < len; i++) {
            var cookieArray = cookieData[i].split("=");
            if (cookieArray[0] == cookieName) {
                return cookieArray[1];
            }
        }
        return "";
    }
    /*
    * 简单封装一个get请求的Ajax函数
    * 请求成功后的执行函数
    * 请求失败后的函数(可选)
    * */
    function ajaxGet (url, fnSuccess, fnFailed) {
        //创建Ajax对象
        var oAjax = null;
        //判断有没有XMLHttpRequest对象,兼容IE6
        if (window.XMLHttpRequest) {
            oAjax = new XMLHttpRequest();
        } else {
            oAjax = new ActiveXObject("Microsoft.XMLHTTP");
        }
        //连接服务器
        oAjax.open("GET",url,true);
        //发送请求
        oAjax.send();
        oAjax.onreadystatechange = function () {
            if (oAjax.readyState === 4) {
                if(oAjax.status === 200) {
                    fnSuccess(oAjax.responseText);
                } else {
                    if (fnFailed) {
                        fnFailed();
                    }
                }
            }
        };
    }
    //封装一个Ajax方法
    function ajax(url, options) {
        // your implement
        var oAjax = null;
        if (window.XMLHttpRequest) {
            oAjax = new XMLHttpRequest();
        } else {
            oAjax = new ActiveXObject("Microsoft.XMLHTTP");
        }
        var param = "";//请求参数
        var data = options.data ? options.date : -1; //如果data,则缓存data
        //判断数据是否是对象
        if (Object.prototype.toString.call(data).slice(8,-1).toLowerCase() === 'object') {
            for (var key in date) {
                if (data.hasOwnProperty(key)) {
                    param += key + "=" + data[key] +"&";
                }
            }
            param.replace(/&$/,"");
        } else {
            param = "timestamp=" + new Date().getTime();
        }
        //判断是不是"POST"，如果没填则默认为"GET"
        var type = options.type ? options.type.toUpperCase() : "GET";
        if (type === "GET") {
            oAjax.open("GET", url + "?" + param, true);
            oAjax.send();
        } else {
            oAjax.open("POST", url + "?" + param, true);
            //使用post请求数据必须添加在open()与send()直接添加头信息。
            oAjax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            oAjax.send();
        }
        oAjax.onreadystatechange = function () {
            if (oAjax.readyState === 4) {
                if (oAjax.status === 200) {
                    options.onsuccess(oAjax.responseText,oAjax);
                } else {
                    if (options.onfail) {
                        options.onfail(oAjax);
                    }
                }
            }
        };
        return oAjax;
    }



