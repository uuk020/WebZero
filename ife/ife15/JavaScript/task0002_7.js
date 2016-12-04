/**
 * Created by Wythe on 2016/12/4.
 */
(function() {
    var startBtn = document.getElementById("start");
    var statTime = document.getElementsByClassName("start-time")[0];
    var changeTime = document.getElementsByClassName("remain-time")[0];
    //计算时间
    function parseClock (sec) {
        var m = Math.floor(sec % 3600 / 60);
        var s = Math.floor(sec % 3600 % 60);
        return (m < 10 ? '0' + m : m) + ' : ' +
            (s < 10 ? '0' + s : s);
    }
    function actionToma () {
        //获取事项内容
        var tomaContent = document.getElementsByClassName("add-text")[0].value;
        var taskTitle = document.getElementsByClassName("task-title")[0];
        //获取select选项次数
        var amount = document.getElementById("amount"),
            index =  amount.selectedIndex,
            len = amount.options[index].value,
            i = 0;
        var tomaIcon = document.getElementsByClassName("task-icon")[0];
        //输入内容
        if (tomaContent && len >= 1 ) {
            taskTitle.innerHTML = tomaContent;
            tomaIcon.innerHTML = "";
            for (;i < len; i++) {
                if (len >= 1) {
                    tomaIcon.innerHTML += "<img src='img/unclick.png' />";
                }
            }
            startBtn.style.display = "none";
            statTime.style.display = "block";
            var sec = 0.1 * 60;
            function startTime () {
                sec--;
                changeTime.innerHTML = parseClock(sec);
                if (sec <= 0) {
                    sec = 0.1 * 60;
                    alert("休息五分钟吧~");
                    changeTime.innerHTML = parseClock(sec);
                }
            }
            function endTime () {
                clearInterval(timer);
            }
            function tomaDemo () {
                var total = (0.1 * 60 ) * 2 ;
                var demo = setInterval(function() {
                    if (len <=0) {
                        clearInterval(demo);
                    } else {
                        len--;
                    }
                },total * 1000);
            }
            tomaDemo();
            var timer = setInterval(function() {
                if (len <=0) {
                    endTime();
                    alert("今天任务完成了~");
                } else {
                    startTime();
                }
            },1000);

        } else {
            alert("请输入今天待办事项");
        }
    }
    //我真的适合编程吗？
    startBtn.addEventListener("click",actionToma);
})();
