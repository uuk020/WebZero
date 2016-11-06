/**
 * Created by wythe on 2016/11/6.
 */
var startX,
    startY,
    startTop,
    startLeft,
    wrap = document.getElementsByClassName('drag-wrap');;
// 获取下一个滑块
function nextDrag (element) {
    var next = element.nextElementSibling;
    while (next && next.nodeName === "#text") {
        next = nextDrag(next);
    }
    return next;
}

// 将某滑块及其下面的滑块移动move个像素
function moveDrag (element, move) {
    while (element) {
        element.style.top = parseInt(element.style.top) + move + "px";
        element = nextDrag(element);
    }
}

function getLocation(event) {                    // 计算滑块降落的位置
    var location = [];                           // location的第一个元素代表容器的序号，第二个元素代表滑块在容器中的序号
    var moveX = event.clientX - startX;          // 计算滑块中心的位置
    var moveY = event.clientY - startY;
    var y = startTop + moveY;
    var x = startLeft + moveX;

    if (x < 230) {                               // 容器的序号
        location[0] = 0;
    }
    else {
        location[0] = 1;
    }

    location[1] = Math.floor((y + 20) / 40);      // 滑块在容器中的序号
    var dragNum = wrap[location[0]].getElementsByClassName("drag").length;  // 容器中滑块的数量
    location[1] = Math.max(location[1], 0);
    location[1] = Math.min(location[1], dragNum);

    return location;
}

function dragStart(event) {                                  // 开始拖动，整理原容器的其他滑块及记录一些数据
    var wrapLeft = $('.drag-container').offsetLeft;          // 计算滑块中心相对drag-container的位置之用
    event = event || window.event;
    var parent = this.parentNode;
    startX = event.clientX;                                      // 记录鼠标位置
    startY = event.clientY;
    startTop = parseInt(this.style.top) + 20;                // 滑块中心相对容器的位置
    startLeft = parent.offsetLeft - wrapLeft + 75;
    this.style.zIndex = 1;
    moveDrag(nextDrag(this), -41);                           // 下面的滑块上移41个像素
}

// 拖动中，使滑块在原容器中消失
function draging () {
    if (this.className != "dragging") {
        this.className = "dragging";
    }
}

// 拖动中，避免浏览器对容器的默认处理（默认无法将数据/元素放置到其他元素中）
function dragOver (event) {
    event.preventDefault();
}

// 拖动结束，将滑块加到新容器
function dragEvent (e) {
    e = e || window.event;
    e.preventDefault();                                          // 避免浏览器对容器的默认处理（默认以链接形式打开）
    var location = getLocation(e);                               // 滑块降落的位置
    var myWrap = wrap[location[0]];
    var myDrag = myWrap.getElementsByClassName('drag')[location[1]];
    if (myDrag) {
        var myTop = myDrag.style.top;
    }
    else {                                                       // 兼容降落位置没有滑块的情况
        var beforeDrag = myWrap.getElementsByClassName('drag')[location[1] - 1];
        if (beforeDrag) {
            var beforeTop = parseInt(beforeDrag.style.top);
        }
        else {                                                   // 兼容容器中没有其他滑块的情况
            beforeTop = -41;
        }
        var myTop = beforeTop + 41 + 'px';
    }
    moveDrag(myDrag, 41);

    var block = document.getElementsByClassName('dragging')[0];  // 将被拖拽滑块加到新容器
    block.style.top = myTop;
    block.style.zIndex = 0;
    block.className = 'drag';
    myWrap.insertBefore(block, myDrag);
}

var drag = document.getElementsByClassName("drag");
for (var i = 0, len = drag.length; i < len; i++) {
    drag[i].draggable = true;
    drag[i].style.top = (i % 4 * 41) + "px";

    drag[i].addEventListener("dragstart", dragStart,false);
    drag[i].addEventListener("drag", draging,false);
}
document.body.addEventListener("dragover", dragOver,false);
document.body.addEventListener("drop", dragEvent,false);
