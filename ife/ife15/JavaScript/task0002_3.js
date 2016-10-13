/**
 * Created by Wythe on 2016/10/10.
 */
var inValue = $(".in").value, //获取正序的值
    outValue = $(".out").value,//获取逆序的值
    loop = $(".loop").value,//获取循环的值
    time = $("input").value || 4000,//获取时间隔间的值，默认值为4000
    play = null;//自动播放定时器

function slideShow () {
    var slide = $(".slide"),
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

    play = setInterval(sildeAnimate,time);

    clickCircle();
    //点击圆点切换图片
    function clickCircle() {
        delegateEvent(createNav, "li", "click", function () {
            var iLength = -imgWidth * getIndex(this);
            removeLiClass();
            this.className = "active";
            moveMargin(slide, iLength);
        });
    }

    $.click(".in", function(){
        inValue = 'true';
        $(".in").value = 'true';
        outValue = '';
        $(".out").value = '';
    });
    $.click(".out", function(){
        inValue = '';
        $(".in").value = '';
        outValue = 'true';
        $(".out").value = 'true';
    });
    $.click(".loop");
    /*
     *  循环轮播，循环时触发（正向与反向循环）
     */
    function sildeAnimate () {
        var lightLi = $(".slide-nav .active"),
            iTargets;
        //循环
        if (loop) {
            //正向循环
            if (inValue === 'true') {
                iTargets = (getIndex(lightLi) + 1) === imgLength ? 0 : (-imgWidth * (getIndex(lightLi) + 1));
                var nextLi = lightLi.nextElementSibling;
                //console.log(nextLi);
                if (nextLi) {
                    removeLiClass();
                    addClass(nextLi, "active");
                } else {
                    removeLiClass();
                    addClass($(".slide-nav li"), "active");
                }
                moveMargin(slide, iTargets);
            }
            //反向循环
            if (outValue === 'true') {
                iTargets = getIndex(lightLi) === 0 ? -imgWidth * (imgLength - 1): -imgWidth * (getIndex(lightLi) - 1);
                var prevLi = lightLi.previousElementSibling;
                if (prevLi) {
                    removeLiClass();
                    addClass(prevLi,"active");
                } else {
                    removeLiClass();
                    addClass(createNav.getElementsByTagName("li")[imgLength - 1], "active");
                }
                moveMargin(slide, iTargets);
            }
        }

    }


    //移除所以li的样式active
    function removeLiClass() {
        var oLi = createNav.getElementsByTagName("li");
        for (var i = 0, len = oLi.length; i < len; i++) {
            removeClass(oLi[i], "active");
        }
    }

}
slideShow();


