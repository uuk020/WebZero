// 事件兼容
function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on"+event, hanlder);
    } else  {
        ele["on" + event] = hanlder;
    }
}

var btn = document.getElementsByTagName('input');
    preBtn = btn[0],
    inBtn = btn[1],
    nextBtn = btn[2],
    treeRoot = document.getElementsByClassName('root')[0],
    divList = [],
    timer = null,
    seed = 1000;

// 前序遍历
function preOrder(node) {
    if(!(node == null)) {
        divList.push(node);
        preOrder(node.firstElementChild);
        preOrder(node.lastElementChild);
    }
}

// 中序遍历
function inOrder(node) {
    if(!(node == null)) {
        inOrder(node.firstElementChild);
        divList.push(node);
        inOrder(node.lastElementChild);
    }
}

// 后序遍历
function nextOrder(node) {
    if (!(node == null)) {
        nextOrder(node.lastElementChild);
        divList.push(node);
        nextOrder(node.firstElementChild);
    }
}

//初始化样式
function reset() {
    divList = [];
    clearInterval(timer);
    var divs = document.getElementsByTagName('div');
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.backgroundColor = '#fff';
    }
}

// 动画改变颜色
function changeColor() {
    var i = 0;
    divList[i].style.backgroundColor = 'blue';
    timer = setInterval(function() {
        i++;
        if (i < divList.length) {
            divList[i-1].style.backgroundColor = '#fff';
            divList[i].style.backgroundColor = 'blue';
        } else {
            clearInterval(timer);
            divList[divList.length-1].style.backgroundColor = '#fff';
        }
    },500);
}

// 事情交互
addEventHandler(btn[0], 'click', function() {
    reset();
    preOrder(treeRoot);
    changeColor();
});
addEventHandler(btn[1], 'click', function() {
    reset();
    inOrder(treeRoot);
    changeColor();
});
addEventHandler(btn[2], 'click', function() {
    reset();
    nextOrder(treeRoot);
    changeColor();
});
