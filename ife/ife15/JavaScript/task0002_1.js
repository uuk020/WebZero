/**
 * Created by Administrator on 2016/10/7.
 */
(function handle() {
    var userInput = $("#user_input");
    var userOutput = $("#user_output");
    $.click("#btn", function () {
        var value = userInput.value.split(/\n|\,|\，|\、|\s+|\u3000|\;/),
            unValue = uniqArray(value),
            len =  unValue.length,
            i = 0,
            warn = $("#warn");
        if (unValue == "") {
            warn.innerHTML = "提醒：至少输入一个兴趣爱好";
        } else if (len > 10) {
            warn.innerHTML = "警告：输入爱好不能超过十个";
        } else {
            warn.innerHTML = "";
            userOutput.innerHTML = "";
            for (; i < len; i++) {
                var trimValue = trim(unValue[i]);
                if (trimValue !== "") {
                    userOutput.innerHTML += "爱好"+ (i + 1) +":<label>" + "<input type='checkbox'>"+ trimValue +"</label>";
                }
            }
        }
    });
})();
