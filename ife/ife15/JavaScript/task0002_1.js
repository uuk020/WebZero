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
            i = 0;
        if (len > 10 || unValue == "" ) {
            $("p").style.display = "block";
        } else {
            $("p").style.display = "none";
            userOutput.innerHTML = "";
            for (; i < len; i++) {
                var trimValue = trim(unValue[i]);
                if (trimValue !== "") {
                    userOutput.innerHTML += "<label>" + "<input type='checkbox'>"+ trimValue +"</label>";
                }
            }
        }
    });
})();
