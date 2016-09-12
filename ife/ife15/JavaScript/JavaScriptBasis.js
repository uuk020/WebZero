// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
  // your implement
  return arr instanceof Array;
}
// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
  // your implement
  return typeof(fn) === 'function'?true:false;
}
// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
  //返回其结果 
  var result;
  if(typeof(src) == 'object'){
  	if(Object.prototype.toString.call(src)==="[object Date]"){
  		//对于日期，直接复制。
      result = src;
    }else{
    	//判断对象的类型是Array还是Object，结果类型更改
    	result = Array.isArray(src)? [] : {};
    	//遍历对象
    	for(var i in src){
    		//排除继承属性
    		if(src.hasOwnProperty(i)){
    			//判断对象属性是否为对象
    			if(typeof(i) !== 'object'){
    				//不是，直接复制
    				result[i] = src[i];
    			}else{
    				//是，则递归调用closeObject
    				result[i] = cloneObject(src[i]);
    			}
    		}
    	}
    }
  }else{//对于原始类型直接复制。
  	result = src
  }
  return result;  
}
// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
  // your implement
  var result = [],
  	 	i,length;
  for(i=0,length=arr.length;i<length;i++){
  	if(result.indexOf(arr[i]) === -1){
  		result.push(arr[i]);
  	}
  }
  return result; 	 	 
}
// 中级班同学跳过此题
// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    // your implement
  var string = "";
  for(var i = 0,len = str.length;i<len;i++){
  	if(str[i] !== ' ' && str[i] !== '\t') break;
  }
  for(var j = str.length-1;j>=0;j--){
  	if(str[i] !== ' ' && str[i] !== '\t') break;
  }
  string = str.slice(i,j+1);
  return string;  
}
// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    // your implement
    var string = "";
    string = str.replace(/^\s+|\s+$/g,'');
    return string;
}
// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    // your implement
    for(var i = 0 ,len = arr.length;i < len; i++){
    	fn(arr[i],i);
    }
}
// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
	var num = 0;
	for(var i in obj){
		if(obj.hasOwnProperty(i)) num++;
	}
	return num;
}
// 判断是否为邮箱地址
function isEmail(emailStr) {
  // your implement
  var emailReg = /^([A-Za-z0-9_-])+@([A-Za-z0-9])+\.([A-Za-z0-9])+$/;
  return emailReg.test(emailStr);
}
// 判断是否为手机号
function isMobilePhone(phone) {
    // your implement
  var phoneReg = /^1\d{10}$/;
  return phoneReg.test(phone);
}
