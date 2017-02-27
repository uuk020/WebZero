(function() {
    /*
      在注释下方写下代码
      给按钮button绑定一个点击事件
      在事件处理函数中
      获取aqi-input输入的值，并显示在aqi-display中
      */
    /* var btnEvent = document.getElementById("button"),
          inputCon = document.getElementById("aqi-input"),
          conDisplay = document.getElementById("aqi-display");
        btnEvent.onclick = function(event){
        conDisplay.innerHTML = inputCon.value;
      };
      简单的办法
    */ 
    var btnEvent = document.getElementById("button"),
        inputCon = document.getElementById("aqi-input"),
        conDisplay = document.getElementById("aqi-display");

    function handler(){
        var conValue = parseInt(inputCon.value);
        if((!isNaN(conValue)) && (conValue > 1) && (conValue <= 1000)){
        conDisplay.innerHTML = conValue;
        } else {
            alert(conValue + "不是有效的值，请从1-1000之间输入值。");
        }
    }

    btnEvent.onclick = function(){
        handler();
    };

    inputCon.onkeyup = function (event) {
        if(event.keyCode === 13){
            handler();
        }
    }
 })();
