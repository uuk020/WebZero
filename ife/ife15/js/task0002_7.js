/**
 * Created by Wythe on 2016/12/4.
 */
(function() {
    var startBtn = document.getElementById("start"),
        statTime = document.getElementsByClassName("start-time")[0],
        changeTime = document.getElementsByClassName("remain-time")[0],
        tipContent = document.getElementsByClassName("start-time")[0];
    //返回分钟时间
    function parseClock (sec) {
        var m = Math.floor(sec % 3600 / 60);
        var s = Math.floor(sec % 3600 % 60);
        return (m < 10 ? '0' + m : m) + ' : ' +
            (s < 10 ? '0' + s : s);
    }

    //按钮执行函数
    function actionToma () {
        //获取事项内容和select选项次数
        var tomaContent = document.getElementsByClassName("add-text")[0].value,
            taskTitle = document.getElementsByClassName("task-title")[0],
            tomaIcon = document.getElementsByClassName("task-icon")[0],
            amount = document.getElementById("amount"),
            tomaCount = amount.value,//选择次数
            firstCount = 0;//初始次数
        //默认时间
        var workClock = 25 * 60,
            restClock = 5 * 60;
        var isWorking = true,//工作标志
            firstCount = 0;//初始次数
        //倒计时
        function countDown (totalCount) {
            count = totalCount;
            //是否处于工作中
            if (isWorking) {
                workClock--;
                changeTime.innerHTML = parseClock(workClock);
                if (workClock == 0) {
                    isWorking = false;
                    firstCount++;
                    tipContent.innerHTML = "休息一下吧,出去外面看看";
                }
            } else { //进入休息时间
                tomaIcon.innerHTML = "已经完成番茄钟: " + firstCount + " / " + totalCount;
                restClock--;
                changeTime.innerHTML = parseClock(restClock);
                //完成任务
                if(restClock == 0) {
                    if (firstCount == count) {
                        clearInterval(timekeeper);
                        changeTime.innerHTML = parseClock(workClock);
                        tipContent.innerHTML = "今天的任务完成了"
                    } else {
                        workClock = 25 * 60; //重置工作时间
                        restClock = 5 * 60; //重置休息时间
                        isWorking = true;
                        tipContent.innerHTML = "休息时间到了，回来继续工作吧"
                    }
                }
            }
        }

        //输入内容
        if (tomaContent) {
            taskTitle.innerHTML = tomaContent;
            startBtn.style.display = "none";
            statTime.style.display = "block";
            var timekeeper = setInterval(function () {
                countDown(tomaCount);
            },1000);
        } else {
            alert("请输入今天待办事项");
        }
    }
    startBtn.addEventListener("click",actionToma);
})();
