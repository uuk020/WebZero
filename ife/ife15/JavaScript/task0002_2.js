/**
 * Created by Wythe on 2016/10/9.
 */
var showTime = $("span");
function clickTime () {
    var userTime = $("input").value.match(/(^\d{4})-(\d{2})-(\d{2}$)/),
        nowTime = new Date();
    if(userTime !== null) {
        var setTime = new Date(userTime[1], userTime[2]-1, userTime[3]),//设置用户输入时间
            diffMillseconds = setTime.getTime() - nowTime.getTime(),//计算相差时间毫秒数
            diffSeconds = parseInt((setTime.getTime() - nowTime.getTime()) / 1000 ),//计算相差时间秒数
            d = parseInt(diffSeconds / (24 * 60 * 60)),//天
            h = parseInt(diffSeconds / (60 * 60) % 24),//时
            m = parseInt(diffSeconds / 60 % 60),//分
            s = parseInt(diffSeconds % 60);//秒
        showTime.innerHTML = "距离:" + setTime.getFullYear() + "年" + (setTime.getMonth() + 1) + "月" + setTime.getDate() + "日" +"还有" + d +"天" + h + "小时" + m + "分"+ s + "秒";
        setTimeout(clickTime,1000);
        if(diffMillseconds <= 0) {
            clearTimeout(clickTime);
            showTime.innerHTML = "倒计时停止";
        }

    } else {
        showTime.innerHTML= "请输入时间(YYYY-MM-DD)";
    }
}
$.click("button", function () {
    clickTime();
});