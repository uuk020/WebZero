window.onload=function(){
	//微信滑动事件
	var weChat = $('.vweixin') ,
	      wcTip = $('.vweixinTip');
	weChat.hover(function() {
		wcTip.css('display','inline');
	}, function() {
		wcTip.css('display','none');
	});
	//子导航事件
	var miansub_nav = $('#v_Category'),
	      div_li = $('.vanclNavList ul li'),
	      subnav_list = $('.vanclSubNavList'),
	      subnav_div = $('.vanclSubNavList>div');
	miansub_nav.hover(function() {
		miansub_nav.addClass('mainNavHover');
		subnav_list.addClass('disshow');
	}, function() {
		miansub_nav.removeClass('mainNavHover');
		subnav_list.removeClass('disshow');
	});
	div_li.hover(function() {
			li_index = $(this).index();
			subnav_div.eq(li_index).addClass('disshow').siblings().removeClass('disshow');
		});

	//轮播图
	var len = $('.rslides_tabs>li').length;
	var pic_index = 0;
	var animateImg;
	var pic_img = $('.rslides li');
	$(".rslides_tabs li").mouseover(function() {
		pic_index = $('.rslides_tabs>li').index(this);
		showImg(pic_index);

	}).eq(0).mouseout();

	//自动播放
	$('.vanclFocus').hover(function() {
		clearInterval(animateImg);
	}, function() {
		animateImg = setInterval(function(){
			showImg(pic_index);
			pic_index ++ ;
			if( pic_index === len){
				pic_index = 0;
			}
		},1500);
	});
	//焦点切换
	function showImg(index){
		$('.rslides_tabs li').eq(index).css('background','#a10000').siblings().css('background','#1e1e1e');
		pic_img.eq(index).css({
			'position':'relative',
			'float':'left',
			'opacity':1,
			'z-index':1
		}).siblings().css({
			'position':'absolute',
			'float':'none',
			'opacity':0,
			'z-index':0
		});
	}
	$('.active').hover(function() {
		var active_index = $(this).index();
		$('.active').eq(active_index).addClass('hover').siblings().removeClass('hover');
		$('.mapDropListBox').eq(active_index).addClass('hover').siblings().removeClass('hover');
	}, function() {
		$('.active').removeClass('hover');
		$('.mapDropListBox').removeClass('hover');
	});
}	