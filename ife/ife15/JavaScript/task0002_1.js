/**
 * Created by Administrator on 2016/10/7.
 */
(function handle(){
    var userInput = $("#user_input");
    var userOutput = $("#user_output");
    $.click("#btn", function(){
        var value = userInput.value.split(/\n|\,|\，|\、|\s+|\u3000|\;/),
            unvalue = uniqArray(value),
            len = unvalue.length,
            i = 0;
        if (unvalue == "" || len > 10) {
            $("#warn").style.display = "block";
        } else {
            for ( ;i < len;i++) {
                $("#warn").style.display = "none";
                var trimValue = trim(unvalue[i]);
                console.log(trimValue);
                if (trimValue !== "") {
                    userOutput.innerHTML += "<label>" + "<input type='checkbox'>"+ trimValue +"</label>";
                }
            }
        }


    });
})();
