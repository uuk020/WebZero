/**
 * Created by WytheHuang on 2016/10/20.
 */
window.onload = function () {
    var iText = $("input"),
        iList = $("ul");
    inputChange();
    /**
     * 输入监听事件
     */
    function inputChange () {
        if (iText.addEventListener) {
            iText.addEventListener("input",onInput,false);
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
        var isString = "";
        var reg = new RegExp("^" + value, "i");
        if (value === "") {
            iList.style.display = "none";
        } else {
            ajax("data.txt", {
                onsuccess: prompt
            });
        }
        /*
         * AJAX 成功后执行函数
         */
        function prompt (data) {
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

};