//事件绑定兼容
function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on"+event, hanlder);
    } else  {
        ele["on" + event] = hanlder;
    }
}

var tagInput = document.getElementById('tagInput'),
    tagContainer = document.getElementById('tagContainer'),
    hobbyInput = document.getElementById('hobbyInput'),
    hobbyBtn = document.getElementsByTagName('button')[0],
    hobbyContainer = document.getElementById('hobbyContainer');

//console.dir(hobbyBtn);

// 事件交互
addEventHandler(tagInput, 'keyup', showTag);
addEventHandler(hobbyBtn, 'click', showHobby);

addEventHandler(tagContainer, 'mouseover',function (e) {
    if (e.target.nodeName.toLowerCase() === 'span') {
        e.target.innerHTML = '点击删除：' + e.target.innerHTML;
        e.target.style.background = 'red';
    }
});

addEventHandler(tagContainer, 'mouseout',function (e) {
    if (e.target.nodeName.toLowerCase() === 'span') {
        event.target.innerHTML = event.target.innerHTML.replace(/点击删除：/,'');
        e.target.style.background = '#84C7FE';
    }
});

addEventHandler(tagContainer, 'click',function (e) {
    if (e.target.nodeName.toLowerCase() === 'span') {
        // 删除数组的值
        tagObj.list.splice(tagObj.list.indexOf(e.target.innerHTML), 1);
        console.log(tagObj);
        tagContainer.removeChild(e.target);
    }
});


//组合构造函数和原型模式
function Queue(divList) {
    this.list = [];
    this.maxLength = 3;
    this.render = function () {
        var html = '';
        this.list.forEach(function (e) {
            html += '<span>' + e + '</span>';
        });
        divList.innerHTML = html;
    };
}

Queue.prototype = {
    constructor: Queue,
    rightPush: function(value) {
        if (value && this.list.indexOf(value) === -1) {
            this.list.push(value);
            this.render();
        }
    },
    leftShift: function() {
        if (this.list.length > this.maxLength) {
            this.list.shift();
            this.render();
        }
    }
};

// 实例
var tagObj = new Queue(tagContainer),
    hobbyObj = new Queue(hobbyContainer);

function spiltInput(text) {
    var inputArray = [];
    inputArray = (text).split(/[,，;；、\s\n]+/);
    return inputArray;
}

function showTag() {
    if (/[,，;；、\s\n]+/.test(tagInput.value) || event.keyCode == 13) {
        var data = spiltInput(tagInput.value.trim()),
            newTag = data[0];
        //console.log(tagObj.length);
        tagObj.rightPush(newTag);
        tagObj.leftShift();
    }
}

function showHobby() {
    var data = spiltInput(hobbyInput.value.trim());
    data.forEach(function (e) {
        hobbyObj.rightPush(e);
        hobbyObj.leftShift();
    });
}
