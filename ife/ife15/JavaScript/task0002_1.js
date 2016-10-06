/**
 * Created by Administrator on 2016/10/7.
 */
(function handle(){
    var userInput = $("#user_input");
    var userOutput = $("#user_output");
    $.click("#btn", function(){
        var value = userInput.value.split(/\,|\，/);
        var unvalue = uniqArray(value);
        for (var i = 0,len = unvalue.length;i < len;i++) {
            var trimValue = trim(unvalue[i]);
            console.log(trimValue);
            if (trimValue !== "") {
                userOutput.innerHTML += "<div>" + trimValue + "</div>"
            }
        }

    });
})();
