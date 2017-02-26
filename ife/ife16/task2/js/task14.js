var aqiData = [
  ["北京", 90],
  ["上海", 50],
  ["福州", 10],
  ["广州", 50],
  ["成都", 90],
  ["西安", 100]
];

(function () {

  /*
  在注释下方编写代码
  遍历读取aqiData中各个城市的数据
  将空气质量指数大于60的城市显示到aqi-list的列表中
  */
  var ul = document.getElementById("aqi-list"),
      num = ["一","二","三"],
  	  i,len;
  var sortCount = aqiData.filter(function(count){
  	return (count[1] > 60);
  });
  sortCount.sort(function(a,b){
  	return b[1] - a[1];
  });
  console.log(sortCount);
  for(i = 0,len = sortCount.length;i<len;i++){
  	ul.innerHTML += '<li>第' + num[i] + '名：' + sortCount[i] + '</li>';
  }
})();
