// 事情兼容函数
function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on"+event, hanlder);
    } else  {
        ele["on" + event] = hanlder;
    }
}

var inputContainer = document.getElementById('checkValue'),
    tipText = document.getElementById('tip'),
    checkBtn = document.getElementsByTagName('button')[0];

function check(value) {
    if (value) {
       var strLength = strSum(value);
       if (strLength >= 4 && strLength <= 16) {
           tipText.innerHTML = '格式正确';
           tipText.style.color = 'green';
           inputContainer.style.border = "2px solid green";
       } else {
           tipText.innerHTML = '字符长度应为4~16个字符';
           tipText.style.color = 'red';
           inputContainer.style.border = "2px solid red";
       }

    } else {
       tipText.innerHTML = '姓名不能为空';
       tipText.style.color = 'red';
        inputContainer.style.border = "2px solid red";
    }
}

// 区分中英文的字符
function strSum(str) {
    var countSum = 0;
    for (var i = 0, len = str.length; i < len; i++) {
        var count = str.charCodeAt(i);
        // 英文字符编码的范围
        if (count >= 0 && count <= 128) {
            countSum ++;
        } else {
            countSum += 2;
        }
    }
    return countSum;
}

addEventHandler(checkBtn, 'click', function () {
    var inputValue = inputContainer.value.trim();
    check(inputValue);
})
