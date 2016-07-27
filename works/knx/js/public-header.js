$(document).ready(function(){
	var menu = $(".dropdown>li");
	menu.hover(function(){
		$(this).children("ul").show().siblings().children("ul").hide();
	},function(){
		$(this).children("ul").hide();
	});	
	var searchIcon = $('.form-action .search-icon'),
			header = $('.public-header');
  searchIcon.on('click',function(){
  	header.toggleClass('active');  	
  });
  $(function() {
  	$("#fullpage").fullpage({
    	'navigation': true,
      afterLoad:function(anchorLink, index){
      	if(index == 6){
      		$('#footer-wrapper').animate({bottom:'0px'},'fast');
  				$(".chart").each(function(index,el){
            $(el).data('easyPieChart').update(0);
            var percent = $(el).attr("data-percent");
            $(el).data('easyPieChart').update(-percent);
          });
  			}
      },	
      onLeave:function(index, nextIndex, direction){
        if(index == 6 && direction == 'up'){
          $("#footer-wrapper").animate({bottom:'-140px'},'fast');
        }
      }
    });
  });
  $(function(){
    $('.chart').easyPieChart({
    	barColor: '#49bce5',
      trackColor: 'transparent',
      scaleColor: false,
      lineCap: 'butt',
      lineWidth: 10,
      size: 150,
      animate: 1000
    });
  });
  alert('本网页由wythe仿照制作，仅供前端交流学习，禁止用于商业用途！一切不良后果，恕本人不负责！')
});


