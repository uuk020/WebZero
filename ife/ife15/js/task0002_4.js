/**
 * Created by WytheHuang on 2016/10/19.
 */
window.onload = function () {
    (function () {
        var accordion = $("#accordion"),
            pItem = accordion.getElementsByTagName("p"),
            i,
            move = null;
        for (i = 0; i < pItem.length; i++) {
            pItem[i].index = i;
            pItem[i].onmouseover = function () {
                var index = this.index;
                if (move) {
                    clearInterval(move);
                }
                move = setInterval(function() {
                    var iWidth = 500;
                    for (i = 0; i < pItem.length; i++) {
                        if (index !== pItem[i].index) {
                            var iSpeed = (20 - pItem[i].offsetWidth) / 5;
                            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed): Math.floor(iSpeed);
                            pItem[i].style.width = pItem[i].offsetWidth + iSpeed + 'px';
                            iWidth -= pItem[i].offsetWidth;
                        }
                        pItem[index].style.width = iWidth + "px";
                    }
                },30);
            };
        }
    })();
};
