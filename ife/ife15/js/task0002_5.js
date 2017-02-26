/**
 * Created by WytheHuang on 2016/10/20.
 */
window.onload = function () {
    var iText = $("input"),
        iList = $("ul");

    /**
     * 输入监听事件
     */
    function inputChange () {
        if (iText.addEventListener) {
            iText.addEventListener("input", onInput,false);
        } else if (iText.attachEvent) {
            iText.attachEvent("OnPropChanged",onPropChanged);
        }
        function onInput (event) {
            var inputValue = event.target.value;
            handleValue(inputValue);
        }
        function onPropChanged (event) {
            if (event.propertyName.toLowerCase() === "value") {
                var inputValue = event.srcElement.value;
                handleValue(inputValue);
            }
        }
    }

    /**
     *  处理输入值
    */
    function handleValue (value) {
        var reg = new RegExp("^" + value, "i");
        if (value === "") {
            iList.style.display = "none";
        } else {
            ajax("data.txt",{
                onsuccess: prompt
            });
        }
        /*
         * AJAX 成功后执行函数
         */
        function  prompt (data) {
            var promptArr = eval(data);
            var liElement = "";
            for (var i = 0,len = promptArr.length; i < len; i++) {
                var valueMatch = promptArr[i].match(reg);
                if (valueMatch) {
                    liElement +=  "<li><span>" + valueMatch[0] + "</span>" +promptArr[i].substr(valueMatch[0].length) + "</li>";
                }
            }
            iList.innerHTML = liElement;
            iList.style.display = "block";
        }
    }

    /*
     * 鼠标点击、移入和移开事件
     */
    function clickEvent () {
        delegateEvent(iList, "li", "mouseover", function () {
           removeliClass();
           addClass(this, "active");
        });
        delegateEvent(iList, "li", "mouseout", function () {
           removeClass(this, "active");
        });
        delegateEvent(iList, "li", "click", function() {
           iText.value = deleteSpan(this.innerHTML);
           iList.style.display = "none";
        });
    }

    /*
     * 键盘上下和回车事件
     */
    function keyEvent () {
        addEvent(iText, "keydown", function (ev) {
            var lightLi = $(".active");
            var oEvent = ev || window.event;
            //向上键
            if (oEvent.keyCode === 38) {
                if (lightLi) {
                    var prevElement = lightLi.previousElementSibling;
                    if (prevElement) {
                        removeliClass();
                        addClass(prevElement, "active");
                    }
                } else {
                    addClass($("div li"), "active");
                }
            }
            //向下键
            if (oEvent.keyCode === 40) {
                if (lightLi) {
                    var nextElement = lightLi.nextElementSibling;
                    if (nextElement) {
                        removeliClass();
                        addClass(nextElement, "active");
                    }
                } else {
                    addClass($("div li"), "active");
                }
            }
            //enter
            if (oEvent.keyCode === 13) {
                iText.value = deleteSpan(lightLi.innerHTML);
                iList.style.display = "none";
            }
        });
    }

    /*
     * 筛选span内容
     */
    function deleteSpan (string) {
        var reg = /^<span>(\w+)<\/span>(\w+)/;
        var stringArr = string.match(reg);
        if (stringArr) {
            return stringArr[1] + stringArr[2];
        } else {
            return "";
        }
    }

    /*
     * 删除所有的li样式
     */
    function removeliClass() {
        var liList = iList.getElementsByTagName("li");
        for (var i = 0, len = liList.length; i < len; i++) {
            liList[i].className = "";
        }
    }

    inputChange();

    clickEvent();

    keyEvent();
};