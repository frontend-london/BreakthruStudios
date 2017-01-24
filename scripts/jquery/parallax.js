

$(document).ready(function() {
	
	redrawDotNav();
	
	/* Scroll event handler */
    $(window).bind('scroll',function(e){
//        alert('fv');


//if(isset(timer2)) clearInterval(timer2);
//if(isset(timer)) clearInterval(timer);
//        if(timer2.value == "") {
//
//        }
        
        if (typeof timer2 != 'undefined') {
            clearInterval(timer2);
        }
        
        if (typeof timer != 'undefined') {
            clearInterval(timer);
        }
        
    	parallaxScroll();
		redrawDotNav();
    });
    

    
});

$(window).resize(function() {
    parallaxScroll();
    var offset_left = 529-$('#slide1-pos').offset().left;
//    alert(offset_left);
    $('div#slide1-pos').css('left', offset_left);
    $('div#slide2-pos').css('left', offset_left);
    $('div#slide3-pos').css('left', offset_left);
    $('div#slide4-pos').css('left', offset_left);
});
  



function move_slide1(scrolled) {
    var window_width = $(document).width()-1871;
//        scrollTop:$('#slide3-pos').offset().left - pos_left_center 
        
        var offset_left = 529-$('#slide1-pos').offset().left;
//        alert(offset_left);
        
        
    $('#parallax-bg6').css('left',(0-offset_left-(scrolled*0.50))+'px');        
    $('#parallax-bg4').css('left',(0-offset_left-(scrolled*0.9))+'px');//+window_width
    $('#parallax-bg3').css('left',(0-offset_left-(scrolled*0.75))+'px');
    $('#parallax-bg2').css('left',(0-offset_left-(scrolled*0.55))+'px');    
    $('#parallax-bg1').css('left',(0-offset_left-(scrolled*0.40))+'px');
}

/* Scroll the background layers */
function parallaxScroll(){
	var scrolled = $(window).scrollTop();
        $('body').css('left',(0-(scrolled*.9))+'px');
//        var window_width = $(document).width()-1871;
        var offset_left = 529-$('#slide1-pos').offset().left;
        move_slide1(scrolled);
        $('#parallax-bg5').css('left',(0-offset_left-(scrolled*0.50))+'px');
}

function parallaxScroll2(scrolled){
    
//    var offset_left = 529-$('#slide1-pos').offset().left;
//    move_slide1(scrolled);
}

/* Set navigation dots to an active state as the user scrolls */
function redrawDotNav(){
	var section1Top =  0;
	var section2Top =  $('#slide1-pos').offset().left + 1500;
	var section3Top =  $('#slide2-pos').offset().left + 1500;
	var section4Top =  $('#slide3-pos').offset().left + 1500;
        var section5Top =  $('#slide4-pos').offset().left + 1500;
        var section6Top =  $('#slide5-pos').offset().left + 1500;
//	$('nav#primary a').removeClass('active');
//        $('#menu-left li a').removeClass('active');
	if($(document).scrollTop() >= section1Top && $(document).scrollTop() < section2Top){
//                $('a.a-strona-glowna').addClass('active');
                location.hash = '#strona-glowna';
	} else if ($(document).scrollTop() >= section2Top && $(document).scrollTop() < section3Top){
//		$('a.a-zespol').addClass('active');
                location.hash = '#zespol';
	} else if ($(document).scrollTop() >= section3Top && $(document).scrollTop() < section4Top){
//		$('a.a-oferta').addClass('active');
                location.hash = '#oferta';
	} else if ($(document).scrollTop() >= section4Top && $(document).scrollTop() < section5Top){
//		$('a.a-realizacje').addClass('active');
                location.hash = '#realizacje';
	} else if ($(document).scrollTop() >= section5Top && $(document).scrollTop() < section6Top){
//		$('a.a-showreel').addClass('active');
                location.hash = '#showreel';
	} else if ($(document).scrollTop() >= section6Top){
//		$('a.a-aktualnosci').addClass('active');
                location.hash = '#aktualnosci';
	}
	
}
