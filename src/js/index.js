import {$} from './common';

var $windowWidth = $(window).width();

$(window).on('resize', function(){
	$windowWidth = $(window).width();
});

// papalax
if($('.js-parallax').length){
	// Add event listener
	const elem = document.querySelector(".js-parallax");
	elem.addEventListener("mousemove", parallax);

	// Magic happens here
	function parallax(e) {
		if($windowWidth > 991){
			let _w = window.innerWidth/2;
			let _h = window.innerHeight/2;
			let _mouseX = e.clientX;
			let _mouseY = e.clientY;
			let _depth1 = `${50 - (_mouseX - _w) * 0.01}% ${50 - (_mouseY - _h) * 0.01}%`;
			let _depth2 = `${50 - (_mouseX - _w) * 0.02}% ${50 - (_mouseY - _h) * 0.02}%`;
			let _depth3 = `${50 - (_mouseX - _w) * 0.06}% ${50 - (_mouseY - _h) * 0.06}%`;
			let x = `${_depth3}, ${_depth2}, ${_depth1}`;
			// console.log(x);
			elem.style.backgroundPosition = x;
		}
	}
}

// Adding animation when scrolling to an element
$(window).on('scroll',function() {
	$('.js-anim').each(function () {
		var elemPos = $(this).offset().top;
		var topOfWindow = $(window).scrollTop();
		var indentTop = $(window).innerHeight()/2;
		
		if ((elemPos < topOfWindow+ indentTop) && (!$(this).hasClass('animated'))) {
			$(this).addClass("animated");
		}
	});
});

// Creating a mobile menu
var arrMobileMenu = [];
$('.js-add-mm').each(function(){
	var indexItem = $(this).attr('data-order');
	arrMobileMenu[indexItem] = $(this);
});

for (var i = 0; i < arrMobileMenu.length; i++) {
	$(arrMobileMenu[i]).clone().appendTo('.js-mobile-menu-content');
}

// Open/Close mobile menu
$('.js-open-menu').on('click', function(){
	$('.js-shadow').addClass('is-visible');
	$('.js-mobile-menu').addClass('open');
	$('.js-body').addClass('no-scroll');
});

$('.js-close-menu').click(function(){
	 closeCatMenu();
});

$('.js-shadow').on('click', function(){
	closeCatMenu();
});

function closeCatMenu() {
	$('.js-shadow').removeClass('is-visible');
	$('.js-mobile-menu').removeClass('open');
	$('.js-body').removeClass('no-scroll');
}

var countMobileMenu = $('.js-mobile-menu .js-top-menu-item').length;

$('.js-mobile-menu .js-top-menu-item').each(function(indx){
	var valDelay = indx * 35 + 100;

	$(this).css('transition-delay', valDelay+'ms');

	if(indx == countMobileMenu - 1){
		valDelay = valDelay + 35;
		$('.js-mobile-menu .js-lang').css('transition-delay', valDelay+'ms');
	}
});

// move filter
if($('.js-filter-item').length){
	moveFilter();

	function moveFilter() {
		var widthFilter = $('.js-filter-content').width();
		var curIndexFilter = 0;
		var limitVal = 0;
		var moveElems = 0;
		var arrFilter = [];
		var sumWidthItem = 0;
		var countElem = $('.js-filter-item').length;
		var diff = 0;

		$('.js-filter-item').each(function(indx, element){
			arrFilter.push($(this).outerWidth());
			sumWidthItem = sumWidthItem + $(this).outerWidth();

			if((limitVal == 0) && (sumWidthItem > widthFilter)){
				limitVal = indx - 1;
				curIndexFilter = indx - 1;
				diff = -$(this).outerWidth() - (widthFilter - sumWidthItem);

				$('.js-filter-next').addClass('active');
			}
		});

		$('.js-filter-next').on('click', function() {
			if(curIndexFilter < countElem-1){
				if(curIndexFilter == limitVal){
					moveElems = diff;
				}

				curIndexFilter++;
				moveElems = moveElems + arrFilter[curIndexFilter];
				
				if($('html').attr('dir') == 'rtl'){
					$('.js-filter-list').css({'right':moveElems*(-1), 'left':'auto'})
				}else{
					$('.js-filter-list').css({'left':moveElems*(-1), 'right':'auto'})
				}
			}
			
			if(curIndexFilter == countElem-1){
				$(this).removeClass('active');
			}

			if(!$('.js-filter-prev').hasClass('active') && (curIndexFilter > limitVal)){
				$('.js-filter-prev').addClass('active');
			}
		});

		$('.js-filter-prev').on('click', function() {
			if(curIndexFilter-1 > limitVal){
				moveElems = moveElems - arrFilter[curIndexFilter];
				curIndexFilter--;
	
				if($('html').attr('dir') == 'rtl'){
					$('.js-filter-list').css({'right':moveElems*(-1), 'left':'auto'})
				}else{
					$('.js-filter-list').css({'left':moveElems*(-1), 'right':'auto'})
				}
			}else{
				moveElems = 0;
				curIndexFilter--;
				if($('html').attr('dir') == 'rtl'){
					$('.js-filter-list').css({'right':moveElems*(-1), 'left':'auto'})
				}else{
					$('.js-filter-list').css({'left':moveElems*(-1), 'right':'auto'})
				}
				$(this).removeClass('active');
			}

			if(!$('.js-filter-next').hasClass('active') && (curIndexFilter < countElem-1)){
				$('.js-filter-next').addClass('active');
			}
		});
	}
}


if($('.js-timer')){
	/* timer */
	var time = $('.js-timer').data('time'),
		left = time,
		countTime = time,
		initialOffset = 2 * 3.14 * $('.js-timer-circle').attr('r'),
		i = 1;


	// $('.js-timer-circle').css('stroke-dashoffset', initialOffset-(1*(initialOffset/time)));
	$('.js-timer-circle').css('stroke-dashoffset', (1*(initialOffset/time)));

	var interval = setInterval(function() {
		var m, s;
		var minutes = 60;
		// days = 24*60*60,
		// hours = 60*60,

		m = Math.floor(countTime / minutes);
		s = countTime - (m*minutes);

		if(m<10){
			m = '0'+ m;
		}
		if(s<10){
			s = '0'+ s;
		}

		$('.js-timer-text').text(m+':'+s);
		if (m == 0 && s == 0) {
			clearInterval(interval);
			return;
		}
		// $('.js-timer-circle').css('stroke-dashoffset', initialOffset-((i+1)*(initialOffset/time)));
		$('.js-timer-circle').css('stroke-dashoffset', ((i+1)*(initialOffset/time)));

		console.log(initialOffset);
		console.log(i);
		i++;
		countTime--;
	}, 1000);


	var minutes = 1, seconds = 59;
  jQuery(function(){
    jQuery("span.countdown").html(minutes + ":" + seconds);
    var count = setInterval(function(){ if(parseInt(minutes) < 0) { clearInterval(count); } else {jQuery("span.countdown").html(minutes + ":" + seconds); if(seconds == 0) { minutes--; if(minutes < 10) minutes = "0"+minutes; seconds = 59;} seconds--; if(seconds < 10) minutes = "0"+seconds;} }, 1000);
  })
}