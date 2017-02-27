
/**
 * getData方法
 * 读取id为source的列表，获取其中城市名字及城市对应的空气质量
 * 返回一个数组，格式见函数中示例
 */
var li = document.querySelectorAll("#source li"),
    resort = document.querySelector("#resort"),
    sortBtn = document.querySelector("#sort-btn"),
    num = ["一","二","三","四","五","六","七"],
    i,len;
function getData() {
  /*
  coding here
  */

  /*
  data = [
    ["北京", 90],
    ["北京", 90]
    ……
  ]
  */
    var data = [];      
    for(i = 0 ,len = li.length;i<len;i++){
        data.push(li[i].innerText.split("空气质量："));
    }
    return data;
}
/**
 * sortAqiData
 * 按空气质量对data进行从小到大的排序
 * 返回一个排序后的数组
 */
function sortAqiData(data) {
    data.sort(function(a,b){
        return b[1] - a[1];
    });
    return data;
}

/**
 * render
 * 将排好序的城市及空气质量指数，输出显示到id位resort的列表中
 * 格式见ul中的注释的部分
 */
function render(data) {
    for(i=0;i<data.length;i++){
        resort.innerHTML += "<li>第"+ num[i] +"名："+data[i][0]+"空气质量："+"<b>"+data[i][1]+"</b></li>";
    }
}

function btnHandle() {
    var aqiData = getData();
    aqiData = sortAqiData(aqiData);
    render(aqiData);
}

function init() {

  // 在这下面给sort-btn绑定一个点击事件，点击时触发btnHandle函数
  sortBtn.onclick = function(event){
      btnHandle();
  };

}

init();
