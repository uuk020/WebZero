//选择器
function $(value) {
  return document.querySelector(value);
}
function $$(value) {
  return document.querySelectorAll(value);
}
// 事情兼容
function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on"+event, hanlder);
    } else  {
        ele["on" + event] = hanlder;
    }
}
var 
    inputList = $$('input'),
    inputName = inputList[0],
    inputPassword = inputList[1],
    inputAgain = inputList[2],
    inputEmail = inputList[3],
    inputPhone = inputList[4],
    checkBtn = inputList[5],
    tipText = $('.form-container').getElementsByTagName('p'),
    flag = false;   

/* 
 *表单验证
*/
// 姓名验证
function checkName(value) {
  if (value) {
    var strLength = strSum(value);
    if (strLength >= 4 && strLength <= 16) {
      tipText[0].innerHTML = '格式正确';
      tipText[0].style.color = 'green';
      inputName.style.border = "2px solid green";
      return true;
       } else {
        tipText[0].innerHTML = '字符长度应为4~16个字符';
        tipText[0].style.color = 'red';
        inputName.style.border = "2px solid red";
        return false;
       }
  } else {
    tipText[0].innerHTML = '姓名不能为空';
    tipText[0].style.color = 'red';
    inputName.style.border = "2px solid red";
    return false;
  }
}
// 区分中英文的字符
function strSum(str) {
    var countSum = 0;
    for (var i = 0, len = str.length; i < len; i++) {
        var count = str.charCodeAt(i);
        // 英文字符编码的范围
        if (count >= 0 && count <= 128) {
            countSum ++;
        } else {
            countSum += 2;
        }
    }
    return countSum;
}
// 密码验证
function checkPassword(value) {
  if (value) {
    flag = /^[a-zA-Z0-9_]{6,18}$/.test(value);
    if (flag) {
      tipText[1].innerHTML = '格式正确';
      tipText[1].style.color = 'green';
      inputPassword.style.border = "2px solid green";
      return true;
    } else {
      tipText[1].innerHTML = '密码长度为6-18个数字和字母';
      tipText[1].style.color = 'red';
      inputPassword.style.border = "2px solid red";
      return false;
    }
  } else {
    tipText[1].innerHTML = '密码不能为空';
    tipText[1].style.color = 'red';
    inputPassword.style.border = "2px solid red";
    return false;
  } 
}
// 密码重复
function checkAgain(value) {
  if (value) {
    flag = inputPassword.value == inputAgain.value;
    if (flag) {
      tipText[2].innerHTML = '密码输入一致';
      tipText[2].style.color = 'green';
      inputAgain.style.border = "2px solid green";  
      return true;
    } else {
      tipText[2].innerHTML = '密码输入不一致，请重新输入';
      tipText[2].style.color = 'red';
      inputAgain.style.border = "2px solid red";
      return false;
    }
  } else {
    tipText[2].innerHTML = '请输入重复密码';
    tipText[2].style.color = 'red';
    inputAgain.style.border = "2px solid red";
    return false;
  }
}
// 邮箱验证
function checkEmail(value) {
  if (value) {
    flag = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}/.test(value);
    if (flag) {
      tipText[3].innerHTML = '邮箱格式正确';
      tipText[3].style.color = 'green';
      inputEmail.style.border = "2px solid green";
      return true;
    } else {
      tipText[3].innerHTML = '邮箱格式错误';
      tipText[3].style.color = 'red';
      inputEmail.style.border = "2px solid red";
      return false;
    }
  } else {
    tipText[3].innerHTML = '邮箱不能为空';
    tipText[3].style.color = 'red';
    inputEmail.style.border = "2px solid red";
    return false;
  }
}
// 邮箱验证
function checkPhone(value) {
  if (value) {
    flag = /^[1][0-9]{10}$/.test(value);
    if (flag) {
      tipText[4].innerHTML = '手机号格式正确';
      tipText[4].style.color = 'green';
      inputPhone.style.border = "2px solid green";
      return true;
    } else {
      tipText[4].innerHTML = '手机号格式错误';
      tipText[4].style.color = 'red';
      inputPhone.style.border = "2px solid red";
      return false;
    }
  } else {
    tipText[4].innerHTML = '手机号不能为空';
    tipText[4].style.color = 'red';
    inputPhone.style.border = "2px solid red";
    return false;
  }
}
// 事情交互
addEventHandler(inputName, 'focusin', function() {
  tipText[0].style.display = 'block';  
});
addEventHandler(inputName, 'focusout', function() {
  var inputValue = inputName.value.trim();
  checkName(inputValue); 
});
addEventHandler(inputPassword, 'focusin', function() {
  tipText[1].style.display = 'block';  
});
addEventHandler(inputPassword, 'focusout', function() {
  var inputValue = inputPassword.value.trim();
  checkPassword(inputValue); 
});
addEventHandler(inputAgain, 'focusin', function() {
  tipText[2].style.display = 'block';  
});
addEventHandler(inputAgain, 'focusout', function() {
  var inputValue = inputAgain.value.trim();
  checkAgain(inputValue); 
});
addEventHandler(inputEmail, 'focusin', function() {
  tipText[3].style.display = 'block';  
});
addEventHandler(inputEmail, 'focusout', function() {
  var inputValue = inputEmail.value.trim();
  checkEmail(inputValue); 
});
addEventHandler(inputPhone, 'focusin', function() {
  tipText[4].style.display = 'block';  
});
addEventHandler(inputPhone, 'focusout', function() {
  var inputValue = inputPhone.value.trim();
  checkPhone(inputValue); 
});
addEventHandler(checkBtn, 'click', function() {
  var nameValue = checkName(inputName.value.trim()),
      passwordValue = checkPassword(inputPassword.value.trim()),
      agaignValue = checkAgain(inputAgain.value.trim()),
      emailValue = checkEmail(inputEmail.value.trim()),
      phoneValue = checkPhone(inputPhone.value.trim()),
      allFlag = nameValue && passwordValue && agaignValue && emailValue && phoneValue;
      if (allFlag) {
        alert("提交成功");
      } else {
        alert("提交失败");
      }
});