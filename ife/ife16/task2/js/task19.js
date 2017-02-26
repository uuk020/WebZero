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
    maxLength = 15; // 最大数组长度
    originArr = []; // 原数组

function leftPush(value) {
    if (value && (/^[0-9]+$/).test(value)) {
        if (value > 10 && value < 100) {
            if (originArr.length < maxLength) {
                originArr.unshift(value);
            } else {
                alert('不能超过'+ maxLength + '个');
            }

        } else {
            alert('请输入10到100之间数字');
        }
    } else {
        alert('请输入数字');
    }
}

function rightPush(value) {
    if (value && (/^[0-9]+$/).test(value)) {
        if (value > 10 && value < 100) {
            if (originArr.length < maxLength) {
                originArr.push(value);
            } else {
                alert('不能超过'+ maxLength + '个');
            }
        } else {
            alert('请输入10到100之间数字');
        }
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

// 生成div
function addDiv() {
    var html = '',
        height = 0;
    for (var i = 0, len = originArr.length; i < len; i++) {
        height = parseInt(originArr[i]);
        html += "<div style ='height:" + height + "px;'> "+ height + " </div>";
    }
    arrNum.innerHTML = html;
    addDivDelEvent();
}

function deleteID(id) {
    originArr.splice(id, 1);
    addDiv();
}

function addDivDelEvent() {
    // 利用闭包绑定生成每个div点击事件
    for (var cur = 0; cur < arrNum.childNodes.length; cur++) {
        addEvent(arrNum.childNodes[cur], 'click', function(cur) {
            return function() {
                return deleteID(cur)
            };
        }(cur));
    }
}

// 随机生成数据
function randNum() {
    // 清空数组 避免再点击生成多一个长度为15的随机数组
    originArr = [];
    for (var i = 0; i < maxLength; i++) {
        originArr.push(Math.floor(Math.random() * 91 + 10));
    }
}

function bubbleSort1() {
    var i,
        j,
        temp,
        checkNum = null,
        count = 0,
        len = originArr.length;
    checkNum = setInterval(run, 1000);
    function run() {
        if (count < len - 1) {
            for (i = 0; i < len - 1; i++) {
                count ++;
                for (j = 0; j < len - i; j++) {
                    if (originArr[j] > originArr[j + 1]) {
                        temp = originArr[j];
                        originArr[j] = originArr[j + 1];
                        originArr[j + 1] = temp;
                        addDiv();
                        //debugger;
                    }
                }
            }

        } else {
            clearInterval(checkNum);
        }
    }
}

function bubbleSort() {
    var Clock;
    var temp,
        count = 0,
        i = 0;
    Clock = setInterval(function() {
        if (count >= originArr.length) {
            clearInterval(Clock);
        }
        if (i == originArr.length - 1) {
            i = 0;
            count++;
        }
        if (originArr[i] > originArr[i + 1]) {
            temp = originArr[i];
            originArr[i] = originArr[i + 1];
            originArr[i + 1] = temp;
            addDiv();
        }
        i++;
    }, 100);
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

addEvent(buttonList[5], 'click', function() {
   randNum();
   addDiv();
});

addEvent(buttonList[6], 'click', function(){
    bubbleSort();
});
