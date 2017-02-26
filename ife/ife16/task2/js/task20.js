//事件绑定函数，兼容浏览器差异
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    }
    else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    }
    else {
        element["on" + event] = listener;
    }
}

var userInput = document.getElementById('userInput'),
    addInput = document.getElementById('addInput'),
    box = document.getElementById('box'),
    originArr = [];

// 转换为数组
function toArray(value) {
    var inputArray = [];
    inputArray = value.split(/[,，;；、\s\n]+/);
    return inputArray;
}

function rightPush(arr) {
    for (var cur in arr) {
        console.info(cur);
        originArr.push(arr[cur]);
    }
}

function render() {
    var html = '',
        i, len = originArr.length;
    for (i = 0; i < len; i++) {
        html += "<div>" + originArr[i] + "</div>";
    }
    box.innerHTML = html;
}

// 模糊查询
function searchInput(value) {
    var i = 0,
        len = box.childNodes.length;
    if (!value) {
        alert('请输入查询字符串');
    } else {
        for (; i < len; i++) {
            if (box.childNodes[i].innerHTML.indexOf(value) !== -1) {
                console.log(box.childNodes[i].innerHTML);
                box.childNodes[i].style.backgroundColor = '#ccc';
                box.childNodes[i].style.color = '#000';
            }
        }
    }
}

addEvent(addInput, 'click', function(){
   var input = toArray(userInput.value.trim());
   console.log(input);
   rightPush(input);
   render();
});

var inputList = document.getElementsByTagName('input');
addEvent(inputList[2], 'click', function(){
    var checkStr = inputList[1].value;
    searchInput(checkStr);
});
