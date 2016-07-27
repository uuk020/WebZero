/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {},
		city = document.getElementById("aqi-city-input"),
		num = document.getElementById("aqi-value-input"),
		addBtn = document.getElementById("add-btn"),
		delBtn = document.getElementById(""),
		tabContent = document.getElementById("aqi-table");
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addHandler(elm,event,fn){
	return elm.addEventListener ? elm.addEventListener(event,fn) : event.attachEvent("on"+event,fn.apply(elm));
}

function addAqiData() {
	var cityInput = city.value.trim(),
			numInput =  num.value.trim();
	if(!cityInput.match(/^[A-Za-z\u4e00-\u9fa5]+$/)){
			alert("请输入中英城市名称！");
			return false;
	}
	if(!numInput.match(/^\d+$/)){
			alert("请输入整数");
			return false;
	}
	aqiData[cityInput] = numInput; 		
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var item = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
	for(var cityInput in aqiData){
		item += "<tr><td>" + cityInput + "</td>" + "<td>" + aqiData[cityInput] + "</td>" + "<td><button id='del-btn'>删除</button></td></tr>"
	}
	tabContent.innerHTML = item;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
  // do sth.
  var tr = city.parentElement.parentElement,
  		strCity = tr.children[0].innerHTML;
  delete aqiData[strCity];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  addHandler(addBtn,"click",addBtnHandle);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  addHandler(tabContent,"click",function(event){
  	if(event.target.nodeName.toLowerCase() == 'button'){
  		delBtnHandle(event.target);
  	}
  });
}

init();