(function ($) {
	$(document).ready(function(){
		//page 1界面中广告栏展开与收缩
		var showBtn = $('img.lbtn'),
				closeBtn = $('img.lclose'),
				popShow = $('div.lpop');
		showBtn.click(function(){
			popShow.animate({"left":"0"},400,function(){
				 showBtn.animate({"left": "-45px"},400);
			});
		});
		closeBtn.click(function(){
			popShow.animate({"left":"-100%"},500,function(){
				showBtn.animate({"left": "-7px"},500);
			});
		});
		//点击pulldown下拉到第二屏
		$('img.pull-down').click(function(){
			$.fn.fullpage.moveSectionDown();
		});
		//广播文字滚动
		 var eventHeight = $('.event-list ul').height(),
				newsHeight  = $('.news-list ul').height();	
		setInterval(function(){
			var Emgt = $('.event-list ul').css("margin-top").slice(0,-2),
					Nmgt = $('.news-list ul').css("margin-top").slice(0,-2);
			Nmgt =	parseInt(Nmgt);
			Emgt =	parseInt(Emgt);
			if (eventHeight+Emgt>45) {
				$('.event-list ul').animate({"margin-top":"-=45px"},600);
			}else{
				$('.event-list ul').css({"margin-top":"45px"});
				$('.event-list ul').animate({"margin-top":"-=45px"},600);
			}
			if (newsHeight+Nmgt>45) {
				$('.news-list ul').animate({"margin-top":"-=45px"},600);
			}else{
				$('.news-list ul').css({"margin-top":"45px"});
				$('.news-list ul').animate({"margin-top":"-=45px"},600);
			}
		}, 3000);		
	});
	//page2选择框 
	var selectBtn = $('span.ui-selectmenu-button'),
			selectMenuLi = $('div.ui-selectmenu-menu ul li');

	$(window).on('click',function(e){
		if($(e.target).closest('.ui-selectmenu-button').length){
			$(e.target).closest('.ui-selectmenu-button').siblings('.ui-selectmenu-menu').toggleClass('ui-selectmenu-open');	
		}else{
			selectBtn.siblings('.ui-selectmenu-menu').removeClass('ui-selectmenu-open');
		}
	});
	selectMenuLi.hover(function(){
		$(this).addClass('ui-state-focus').siblings().removeClass('ui-state-focus');
	});
	
	//选项框1测试功能
	var selectDay = $('span#select-day'),
			dayList = $('ul#day-list li');
	dayList.click(function(){
		selectDay.text($(this).text());
	});	
	//选项框2测试功能
	var selectArea = $('span#select-area'),
			areaList = $('ul#area-list li');
	areaList.click(function(){
		selectArea.text($(this).text());
	});
	//选项框3测试功能
	var selectTime = $('span#select-time'),
			timeList = $('ul#time-list li');
	timeList.click(function(){
		selectTime.text($(this).text());
	});
	//第四屏
	var linkList = $('.sec4 .link a');
	linkList.hover(function(){
    if($(this).attr("class") == "buy"){
      $(this).removeClass("buy").addClass("reg").siblings().removeClass("reg").addClass("buy");
    }
    });
	//第六屏

	//wechat click event
	$('.social .wechat').click(function(){
		$('#footer-wrapper>img').fadeToggle();
	});
	//top event
	$('#top').click(function(){
		 $.fn.fullpage.moveTo(1);
	})
	//previous 、next event
	var slides = $('.viewport .slides'),
			slider = $('.slider'),
			directionNav = $('.slider .direction-nav'),
			directionNavButton = $('.slider .direction-nav a');
	slides.css({
		"transition-duration":"0.6s",
		"transform":"translate3d(0px, 0px, 0px)"
	});
	slider.hover(function(){
		directionNav.show();
		directionNavButton.on('click',function(){
			var transformX = slides.css("transform");
			transformX = transformX.substr(19,1);
			if(transformX == 0){
				slides.css("transform","translate3d(-285.5px, 0px, 0px)");
			}else{
				slides.css("transform","translate3d(0px, 0px, 0px)");	
			}
		});
	},function(){
		directionNav.hide();
	});
	console.log('本人正在找Web前端开发工程师工作，薪水4k，有意者请发邮件给我，邮件地址：jie893609357@163.com');
})(jQuery);
