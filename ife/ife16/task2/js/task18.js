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

var newNum = document.getElementById('newNum'),
    buttonList = document.getElementsByTagName('input'),
    arrNum = document.getElementById('arrNum'),
    originArr = [];

function leftPush(value) {
    if (value && (/^[0-9]+$/).test(value)) {
        originArr.unshift(value);
    } else {
        alert('请输入数字');
    }
}

function rightPush(value) {
    if (value && (/^[0-9]+$/).test(value)) {
        originArr.push(value);
    } else {
        alert('请输入数字');
    }
}

function leftPop() {
    if (originArr.length === 0) {
        alert('请输入数字');
    } else {
        originArr.shift();
    }
}

function rightPop() {
    if (originArr.length === 0) {
        alert('请输入数字');
    } else {
        originArr.pop();
    }
}

function addDiv() {
    var html = '';
    for (var i = 0, len = originArr.length; i < len; i++) {
        html += "<div>" + parseInt(originArr[i]) + "</div>";
    }
    arrNum.innerHTML = html;
    addDivDelEvent();
}

function deleteID(id) {
    originArr.splice(id, 1);
    addDiv();
}

function addDivDelEvent() {
    for (var cur = 0; cur < arrNum.childNodes.length; cur++) {
        addEvent(arrNum.childNodes[cur], 'click', function(cur) {
            return function() {
                alert(cur);
                return deleteID(cur)
            };
        }(cur));
    }
}

addEvent(buttonList[1], 'click', function() {
    var input = newNum.value;
    leftPush(input);
    addDiv();
});

addEvent(buttonList[2], 'click', function() {
    var input = newNum.value;
    rightPush(input);
    addDiv();
});

addEvent(buttonList[3], 'click', function() {
    leftPop();
    addDiv();
});

addEvent(buttonList[4], 'click', function() {
    rightPop();
    addDiv();
});
