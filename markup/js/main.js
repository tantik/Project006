$(window).resize(function() {
	mobileBanner();
	linkToTop();
});
$(document).ready(function() {
	initPage();
});
function initPage(){
	mobileMenu();
	mobileBanner();
	initGallery();
	initGallery2();
	linkToTop();
	$('.slide-block').slideBlock();
	$(function() {
		jcf.replaceAll();
	});
	
	
}


/* Mobile Menu */
function mobileMenu(){
	$('a.mobile-opener').click(function(e) {
		e.preventDefault();
		$('body').toggleClass('nav-visible');
		$('.top-search').removeClass('active');
	});
}

/* Mobile Banner */
function mobileBanner(){
	
	if ($(window).width() <= 800) {
		
		var bannerHeight = $(window).width();
		$('#wrapper').css("padding-top", bannerHeight + 70 + "px");
		$('.mobile-banner').css("height", bannerHeight + "px");
		
		if ($(window).width() <= 630) {
			var bannerHeight = $(window).width();
			$('#wrapper').css("padding-top", bannerHeight + 35 + "px");
			$('.mobile-banner').css("height", bannerHeight + "px");
		}
		
	} else {
		$('#wrapper').css("padding-top", "0");
	}
}

/* Swiper Gallery */
function initGallery(){
	var swiper = new Swiper('.gallery-list .swiper-container', {
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		loop: true,
		centeredSlides: true,
		autoplay: 4000,
		slidesPerView: 3,
		spaceBetween: 0,
		breakpoints: {
			900: {
				slidesPerView: 1.2,
				spaceBetween: 45
			}
		}
	});
}

function initGallery2(){
	var swiper = new Swiper('.campaign-gallery .swiper-container', {
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		pagination: '.swiper-pagination',
		loop: true,
		slidesPerView: 3,
		centeredSlides: true,
		autoplay: 4000,
		spaceBetween:0,
		breakpoints: {
			900: {
				slidesPerView: 1.2,
				spaceBetween: 45
			}
		}
	});
}

/* Top  */
function linkToTop(){
	
	var footer = document.getElementById('footer');
	
	$(window).scroll(function (e) {
		if ($(this).scrollTop() > 100) {
			$('.btn-to-top').fadeIn();
		} else {
			$('.btn-to-top').fadeOut();
		}
		
		var scrl = window.scrollY + screen.height - footer.clientHeight;
		var bind = getOffsetRect(footer);
		var res  = bind.top - ($('.btn-to-top').height() / 2);
		
		if (screen.width <= 800) {
			var forMobile = 220;
			
			if (screen.width <= 630) {
				forMobile = 150;
			}
			
		} else {
			var forMobile = 0;
		}
		
		//var forMobile = (screen.width <= 800)? 150:0;
		
		if(scrl + forMobile >= res){
			$('.btn-to-top').removeClass('fixed');
			$('.btn-to-top').addClass('static');
		} else {
			$('.btn-to-top').removeClass('static');
			$('.btn-to-top').addClass('fixed');
		}
		
	});
	
	$('.btn-to-top a').click(function(e){
		e.preventDefault();
		$('html,body').animate({scrollTop:0},'slow');
		return false;
	})
}

function getOffsetRect(elem) {
    var box = elem.getBoundingClientRect()
    
    var body = document.body
    var docElem = document.documentElement
    
    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft
    
    var clientTop = docElem.clientTop || body.clientTop || 0
    var clientLeft = docElem.clientLeft || body.clientLeft || 0
    
    var top  = box.top +  scrollTop - clientTop
    var left = box.left + scrollLeft - clientLeft
    
    return { top: Math.round(top), left: Math.round(left) }
}


/* Slide Block */
(function($) {
	$.fn.slideBlock = function(options){
		var options = $.extend({
			linkSlide: 'a.slide-link',
			slideBlock: 'div.slide-box',
			openClass: 'slide-active',
			durationSlide: 500,
			openComplete: false,
			closeComplete: false,
			mode:	false, //'accordion' - accordion mode or false - slide-block
			childSlide:	'accordion-child', //use only if mode: 'accordion'
		}, options);
		this.each(function() {
			if (options.mode === 'accordion') {
				var accordion = jQuery(this);
				var childSlide = accordion.find('> .' + options.childSlide, this);
				childSlide.each(function(){
					var $this = jQuery(this);
					if (!$this.is('.' + options.openClass)) {
						$this.children(options.slideBlock).css('display','none');
					}
				});
				childSlide.each(function(){
					var $this = jQuery(this);
					var link = $(options.linkSlide, this).eq(0);
					link.click(function(){
						var that = $(this);
						if (that.closest(childSlide).is('.'+options.openClass)) {
							that.closest(childSlide).removeClass(options.openClass);
							that.closest(childSlide).find('> ' + options.slideBlock).slideUp(durationSlide, function(){if(typeof( options.closeComplete) == 'function') options.closeComplete()});
						} else {
							that.closest(accordion).find(childSlide).removeClass(options.openClass);
							that.closest(accordion).find(childSlide).find('> ' + options.slideBlock).slideUp(durationSlide, function(){if(typeof( options.closeComplete) == 'function') options.closeComplete()});

							that.parent(childSlide).parent().addClass(options.openClass);
							that.parent(childSlide).parent().find('> ' + options.slideBlock).slideDown(durationSlide, function(){
								$('body,html').animate({scrollTop:that.offset().top},800);
								if(typeof( options.openComplete) == 'function') options.openComplete(this);
							});

						}
						return false;
					});
				});
			} else {
				var $this = jQuery(this);
				var link = $(options.linkSlide, this).eq(0);
				var slideBlock = $(options.slideBlock, this).eq(0);
				var openClass = options.openClass;
				var durationSlide = options.durationSlide;

				if (!$this.is('.'+openClass)) {
					$this.find(slideBlock).css('display','none');
				}
				link.click(function(){
					if ($this.is('.'+ openClass)) {
						$this.removeClass(openClass);
						$this.find(slideBlock).slideUp(durationSlide, function(){if(typeof( options.closeComplete) == 'function') options.closeComplete()});
					} else {
						$this.addClass(openClass);
						$this.find(slideBlock).slideDown(durationSlide, function(){if(typeof( options.openComplete) == 'function') options.openComplete(this)});
					}
					return false;
				});
			}
		});
		return this;
	};
})(jQuery);





















