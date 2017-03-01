(function() {
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
  // 点击切换
  function showElement(el) {
    el.style.display = 'block';
  }
  function hideElement(el) {
    el.style.display = 'none';
  }
  var data = [
    {city: "北京", school:["北京大学", "清华大学", "中国人民大学"]},
    {city: "上海", school:["同济大学", "上海交通大学", "复旦大学"]},
    {city: "广东", school:["中山大学", "华南理工大学", "暨南大学"]}
  ];

  // 联动二级表单
  function selectDistrict(city, school) {
    school.innerHTML = "";
    var 
        option = null,
        schoolName = data[city.selectedIndex].school,
        i = 0,
        len = schoolName.length;
    // 根据选项城市生成二级表单 
    for(; i < len; i++) {
      option = document.createElement("option");
      option.innerHTML = schoolName[i];
      school.appendChild(option);
    }    
  }
  var 
      chooseList = $$('input[type="radio"]'),
      college = $('#college'),
      company = $('#company'),
      cityName = $('#city'),
      schoolName = $('#school');
  addEventHandler(chooseList[0], 'click', function(){
    showElement(college);
    hideElement(company);
  });
  addEventHandler(chooseList[1], 'click', function(){
    showElement(company);
    hideElement(college);
  });
  addEventHandler(cityName, 'change', function(){
    selectDistrict(cityName, schoolName);  
  });
})()