/**
 * Created by Wythe on 2016/10/10.
 */
var inValue = $(".in")[0].value, //获取正序的值
    outValue = $(".out")[0].value,//获取逆序的值
    loop = $(".loop")[0].value,//获取循环的值
    time = $("input").value || 4000,//获取时间隔间的值，默认值为4000
    play = null;//自动播放定时器
/**
 * 获取当前元素在同级元素的索引
 * @param   {HTMLElement} element html节点
 * @returns {number} 索引
 */
function getIndex(element) {
    var aBrother = element.parentNode.children;
    for (var i = 0, len = aBrother.length; i < len; i++) {
        if (aBrother[i] === element) {
            return i;
        }
    }
}
function slideShow () {
    var slide = $(".slide")[0],
        imgItems = slide.getElementsByTagName("img"), //获取图片数量
        imgLength = imgItems.length,//缓存图片数量
        imgWidth = imgItems[0].width,
        createNav = document.createElement("ol");//创建小圆点
    createNav.className = "slide-nav";
    for (var i = 0; i < imgLength; i++) {
        createNav.innerHTML += "<li>"+ i +"</li>";
    }
    slide.parentNode.appendChild(createNav);//小圆点导航加样式
    createNav.getElementsByTagName("li")[0].className = "active";//默认第一个li为active
    //自动播放
    //play = setInterval(sildeAnimate,time);
    clickCircle();
    function clickCircle() {
        delegateEvent(createNav, "li", "click", function () {
            var iLength = -imgWidth * getIndex(this);
            removeLiClass();
            this.className = "active";
            slide.style.left = iLength + "px";
        });
    }
    //参考guowenfh代码
    function removeLiClass() {
        var oLi = createNav.getElementsByTagName("li");
        for (var i = 0, len = oLi.length; i < len; i++) {
            removeClass(oLi[i], "active");
        }
    }
}
slideShow();


