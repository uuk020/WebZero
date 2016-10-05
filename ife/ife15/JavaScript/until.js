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
       return addEvent(element, event, listener);
   };

   $.un = function(element, event, listener) {
    return removeEvent(element, event, listener);
   };
   $.click = function(element, listener) {
    return addClickEvent(element, listener);
   };
   $.enter = function(element, listener) {
    return addEnterEvent(element, listener);
   };
   $.delegate = delegateEvent;
  // 先简单一些
  function delegateEvent(element, tag, eventName, listener) {
    // your implement
    return addEvent(element, eventName, function(ev) {
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



