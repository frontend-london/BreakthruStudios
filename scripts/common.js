
function validateEmail(email) {
   var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
   return (reg.test(email) != false);
}

function resetForm($form) {
    $form.find('input:text, input:password, input:file, select, textarea').val('');
    $form.find('input:radio, input:checkbox')
         .removeAttr('checked').removeAttr('selected');
}

function load_map() {
    var geocoder;
    var map;
    var myOptions = {
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
            }

            geocoder = new google.maps.Geocoder();
            var address = '0, Łódź, Zachodnia 97';
            geocoder.geocode( {'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
                    map.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                            map: map,
                            position: results[0].geometry.location
                    });
            } else {
                    document.getElementById("map_canvas").style.height = 0;
                    //alert("Geocode was not successful for the following reason: " + status);
            }
    });
}

$.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());		


function animate_slide1() {

//    var scrolled = -1200;
//    var offset_left = 529-$('#slide1-pos').offset().left;
//    move_slide1(scrolled);
//    $('#parallax-bg5').css('left',(0-offset_left+(scrolled*0.50))+'px');
    
    
    
//    timer2 = setInterval(function() {
//        timer = setInterval(function() {
//            scrolled+=50;
//            move_slide1(scrolled);
//            $('#parallax-bg5').css('left',(0-offset_left+(scrolled*0.50))+'px');
//            if(scrolled>=-2) clearInterval(timer);
//        }, 50);
//        clearInterval(timer2);
//    }, 200);
//
//    $(window).scrollTop(0);
    
    
    
//    

    var scrolled = 0;
    
	var offset_left = 529-$('#slide1-pos').offset().left;
	var half = $('#slide1-pos').offset().left+406;
        
        $('#parallax-bg4').css('left', half);
        $('#parallax-bg3').css('left', half);
        $('#parallax-bg2').css('left', half);
        $('#parallax-bg1').css('left', half);
	
		//var offset_left = 529-$('#slide1-pos').offset().left;
		$('#parallax-bg4').stop().delay(300).animate({"left": (0-offset_left-(scrolled*0.9))+'px'}, 4000, "easeInOutCubic");
		$('#parallax-bg3').stop().delay(200).animate({"left": (0-offset_left-(scrolled*0.75))+'px'}, 4000, "easeInOutCubic");
		$('#parallax-bg2').stop().delay(150).animate({"left": (0-offset_left-(scrolled*0.55))+'px'}, 4000, "easeInOutCubic");
		$('#parallax-bg1').stop().delay(100).animate({"left": (0-offset_left-(scrolled*0.40))+'px'}, 4000, "easeInOutCubic");
	//    $('#parallax-bg6').stop().delay(50).animate({"left": (0-offset_left-(scrolled*0.50))+'px'}, 4000, "easeInOutCubic");
		$('#parallax-bg5').stop().animate({"left": (0-offset_left-(scrolled*0.50))+'px'}, 4000, "easeInOutCubic");
	//    $('#parallax-bg7').stop().animate({"left": (0-offset_left-(scrolled*0.50))+'px'}, 4000, "easeInOutCubic");
	
    
    

    
    
    
    
    
    
    
    
    
//    parallaxScroll();
    

//parallaxScroll();


//    $('html, body').animate({
//            scrollLeft: - pos_left_center 
//    }, 1000, function() {
//        parallaxScroll();
//    });

    return false;    
}

var captcha = '';
function load_captcha() {
    var captchas = ['dc1d7b5030e8bb357ee5c13b729046e3', '877d27099e6ea6306d8ca48874c44a78', 'db9f1aea63d7560052043eb200ce8876', 'e390a8e2aa847b0280ef3be4f6e092d7', 'a7a3b7f6112a66bf730b9d886e14ee22', '75648a670f33b431cfb1481f7eaa68ef', 'af5f02758b7665f703a3c8471eb6fbd5'  ];
    var nr = Math.floor(Math.random()*7);
    captcha = captchas[nr];
    var src = 'images/captcha/'+captcha+'.jpg';
    $('#img-captcha').attr('src', src);
}


$(window).load (
	function() {
            
                if($('a[rel*=hover] img')) {
                    $.each	(
                    $('a[rel*=hover] img'),
                    function() {
                        var originalImage = this.src;
                        var hoverImage = this.src.replace('original', 'hover');
                        var image = new Image ();
                        image.src = hoverImage;
                        $(this).mouseover (
                        function() {
                            this.src = hoverImage;
                        }
                    );

                        $(this).mouseout (
                        function() {
                            this.src = originalImage;
                        }
                    );
                    }
                );
                }
                
                
		
                if($('input.inputBlur')) {
                    $.each	(
                    $('input.inputBlur'),
                    function() {
                        var elementValue = $(this).get(0);
                        var originalElementValue = elementValue.value;				
                        $(this).focus 	(
                        function() {
                            if(elementValue.value == originalElementValue)
                            {
                                elementValue.value = '';
                            }
                        }
                    );
                        
                        $(this).blur (
                        function() {
                            if(elementValue.value == '') {
                                elementValue.value = originalElementValue;
                            }
                        }
                    );
                    }
                );
            }
		
            


	}
);
    


$(document).ready
(
	function()
	{
            if(jQuery.browser.mobile) {
		window.location = "http://www.breakthrufilms.pl/mobile/"
            }
            
            load_captcha();
            
            var pos_left_center = Math.floor(($('#top').width()-970)/2)+50; //np. 508
            
            $('#loading-holder').load("_imagelist.php",function(){
                $('#listLoad').imagesLoaded(function(){

                    var scrolled = -1200;
                    var offset_left = 529-$('#slide1-pos').offset().left;
                    $('#parallax-bg5').css('left',(0-offset_left+(scrolled*0.50))+'px');
                    
                    $("#loading").fadeTo(200,0, function(){
                        var timer = setInterval(function() {
                            $("#loading").stop();            
                            $("#loading").hide();
                                        
                            if(location.hash=='#strona-glowna' || location.hash=='') {
                                animate_slide1();                    
                            } else {
                                $(window).scrollTop(0);

                                switch(location.hash) {
                                    case '#zespol':
                                        zespolClick();
                                    break;
                                    case '#strona-glowna':
                                        stronaGlownaClick();
                                    break;
                                    case '#oferta':
                                        ofertaClick();
                                    break;
                                    case '#realizacje':
                                        realizacjeClick();
                                    break;
                                    case '#aktualnosci':
                                        aktualnosciClick();
                                    break;
                                    case '#showreel':
                                        showreelClick();
                                    break;
                                default:
                                }
                            }
                            clearInterval(timer);
                        }, 500);
                    });
                });
            });
            
            
            
//            $('#my-container').imagesLoaded( function( $images, $proper, $broken ) {
//            // callback provides three arguments:
//            // $images: the jQuery object with all images
//            // $proper: the jQuery object with properly loaded images
//            // $broken: the jQuery object with broken images
//            // `this` is a jQuery object of container
//            console.log( $images.length + ' images total have been loaded in ' + this );
//            console.log( $proper.length + ' properly loaded images' );
//            console.log( $broken.length + ' broken images' );
//            });
            
            function animate_end() {
                var scrolled = $(window).scrollTop();
                var position = $('#slide6-pos-after').offset().left - pos_left_center;
                var position_2 = $('#slide6-pos').offset().left - pos_left_center;
                var speed = Math.abs(scrolled-position);
                $('html, body').stop();
                $('html, body').animate({
                        scrollTop:position
                }, 500, function() { //speed                            
                    parallaxScroll();
                });

                $('html, body').animate({
                        scrollTop:position_2
                }, 500, function() { //speed                            
                    parallaxScroll();
                });

                return false;
            }
            
            function animate_start() {
                var scrolled = $(window).scrollTop();
                var position = $('#slide1-pos-before').offset().left - pos_left_center;
                var position_2 = $('#slide1-pos').offset().left - pos_left_center;
                var speed = Math.abs(scrolled-position);
                $('html, body').stop();
                $('html, body').animate({
                        scrollTop:position
                }, 200, function() { //speed                            
                    parallaxScroll();
                });

                $('html, body').animate({
                        scrollTop:position_2
                }, 500, function() { //speed                            
                    parallaxScroll();
                });

                return false;
            }
            
                var mouse_wheel = true; // false on fancybox
            
                //MOUSE WHEEL
                var last = new Date().getTime();
                $("body").mousewheel(function(event, deltaY) {
                    if(mouse_wheel) {
                        var now = new Date().getTime();
                        var elap = now - last;
                        last = now;
                        if(elap > 200){
                        if (deltaY < 0){
                            nextClick();
                        }else{
                            prevClick();
                        }
                        }   
                    }
                    event.preventDefault();
                });
            
		$('a').focus(function() {
		  this.blur();
		});
                
            
                
                load_map();
                
//                alert(location.hash);

function animate(position) {
    $('html, body').stop();
//    $('html, body').animate({
//            scrollTop:position
//    }, 2000, function() { //speed                            
//        parallaxScroll();
//    });
    
    
    
    
    
//    $('html, body').animate({
//            "top":position
//    }, 2000, function() { //speed                            
//        parallaxScroll();
//    });
    
//    var scrolled = $(window).scrollTop();
//    $('body').css('left',(0-(scrolled*.9))+'px');
//    var offset_left = 529-$('#slide1-pos').offset().left;
//    var window_width = $(document).width()-1871;
    
    var scrolled = position;
    var offset_left = 529-$('#slide1-pos').offset().left;
        
    $('#parallax-bg4').stop().delay(400).animate({"left": (0-offset_left-(scrolled*0.9))+'px'}, 2000, "easeInOutCubic");
    $('#parallax-bg3').stop().delay(300).animate({"left": (0-offset_left-(scrolled*0.75))+'px'}, 2000, "easeInOutCubic");
    $('#parallax-bg2').stop().delay(200).animate({"left": (0-offset_left-(scrolled*0.55))+'px'}, 2000, "easeInOutCubic");
    $('#parallax-bg1').stop().delay(150).animate({"left": (0-offset_left-(scrolled*0.40))+'px'}, 2000, "easeInOutCubic");
    $('#parallax-bg6').stop().delay(100).animate({"left": (0-offset_left-(scrolled*0.50))+'px'}, 2000, "easeInOutCubic");
    $('#parallax-bg5').stop().delay(50).animate({"left": (0-offset_left-(scrolled*0.50))+'px'}, 2000, "easeInOutCubic");
    $('#parallax-bg7').stop().delay(50).animate({"left": (0-offset_left-(scrolled*0.50))+'px'}, 2000, "easeInOutCubic");
    
    
}
                
                
                function aktualnosciClick() {
                    location.hash = 'aktualnosci';
                    
                    var scrolled = $(window).scrollTop();
                    var position = $('#slide6-pos').offset().left - pos_left_center;
                    var speed = Math.abs(scrolled-position);

                    $('#menu-left li a').removeClass('active');
                    $('#menu-left-en li a').removeClass('active');
                    $('a.a-aktualnosci').addClass('active');

                    animate(position);
      
                    return false;
                }

                
                function showreelClick() {
                    location.hash = 'showreel';
                    
                    var scrolled = $(window).scrollTop();
                    var position = $('#slide5-pos').offset().left - pos_left_center;
                    var speed = Math.abs(scrolled-position);

                    $('#menu-left li a').removeClass('active');
                    $('#menu-left-en li a').removeClass('active');
                    $('a.a-showreel').addClass('active');

                    animate(position);
      
                    return false;
                }
                
                function realizacjeClick() {
                    location.hash = 'realizacje';

                    $('#menu-left li a').removeClass('active');
                    $('#menu-left-en li a').removeClass('active');
                    $('a.a-realizacje').addClass('active');
                    
                    var scrolled = $(window).scrollTop();
                    var position = $('#slide4-pos').offset().left - pos_left_center;
                    var speed = Math.abs(scrolled-position);

                    animate(position);
      
                    return false;
                }
                
                function ofertaClick() {
                    location.hash = 'oferta';
                    
                    var scrolled = $(window).scrollTop();
                    var position = $('#slide3-pos').offset().left - pos_left_center;
                    var speed = Math.abs(scrolled-position);

                    $('#menu-left li a').removeClass('active');
                    $('#menu-left-en li a').removeClass('active');
                    $('a.a-oferta').addClass('active');

                    animate(position);
      
                    return false;
                }
                
                
                function zespolClick() {
                    location.hash = 'zespol';
                    
                    var scrolled = $(window).scrollTop();
                    var position = $('#slide2-pos').offset().left - pos_left_center;
                    var speed = Math.abs(scrolled-position);

                    $('#menu-left li a').removeClass('active');
                    $('#menu-left-en li a').removeClass('active');
                    $('a.a-zespol').addClass('active');

                    animate(position);

                    return false;
                }

                function stronaGlownaClick() {
                    location.hash = 'strona-glowna';
                    
                    var scrolled = $(window).scrollTop();
                    var position = 0;
                    var speed = Math.abs(scrolled-position);
                    
                    $('#menu-left li a').removeClass('active');
                    $('#menu-left-en li a').removeClass('active');
                    $('a.a-strona-glowna"').addClass('active');

                    animate(position);
                    
                    return false;
                }
                
                function nextClick() {
                    if($('a.a-strona-glowna').hasClass('active')) {
                        zespolClick();
                    } else if($('a.a-zespol').hasClass('active')) {
                        ofertaClick();
                    } else if($('a.a-oferta').hasClass('active')) {
                        realizacjeClick();
                    } else if($('a.a-realizacje').hasClass('active')) {
                        showreelClick();
                    } else if($('a.a-showreel').hasClass('active')) {
                        aktualnosciClick();
                    } else if($('a.a-aktualnosci').hasClass('active')) {
//                        animate_end();
//                        return stronaGlownaClick();
                    }
                }
                
                function prevClick() {
                    if($('a.a-strona-glowna').hasClass('active')) {
//                        animate_start();
//                        return aktualnosciClick();                        
                    } else if($('a.a-zespol').hasClass('active')) {
                        stronaGlownaClick();
                    } else if($('a.a-oferta').hasClass('active')) {
                        zespolClick();
                    } else if($('a.a-realizacje').hasClass('active')) {
                        ofertaClick();
                    } else if($('a.a-showreel').hasClass('active')) {
                        realizacjeClick();
                    } else if($('a.a-aktualnosci').hasClass('active')) {
                        showreelClick();
                    }
                }
//                $('a.fancybox').fancybox();
                $('a.a-zespol').click(function(){
                    return zespolClick();
                });
                $('a.a-strona-glowna"').click(function(){
                    return stronaGlownaClick();
                });
                $('a.a-oferta"').click(function(){
                    return ofertaClick();
                });
                $('a.a-realizacje"').click(function(){
                    return realizacjeClick();
                });
                $('a.a-aktualnosci"').click(function(){
                    return aktualnosciClick();
                });
                $('a.a-showreel"').click(function(){
                    return showreelClick();
                });
                
                
                $('a.a-next').click(function(){
                    nextClick();
                });
                
                $('a.a-prev').click(function(){
                    prevClick();
                });
                
                var hideBottom = false;
                
                $('a.a-skontaktuj-sie"').toggle(function() {
                    $('div#bottom').animate({height:'387px'}, {duration: 600});
                    $('div#bottom-inner').fadeIn('slow');
                    $('div#bottom-inner-en').fadeIn('slow');
                    $('#li-kontakt').attr('id', 'li-kontakt-ejected');
                    load_map();
					hideBottom = true;
                    return false;
                }, function() {
                    $('div#bottom').animate({height:'96px'}, 800, function() {
                        $('#div-bi-formularz').show();
                        $('#div-bi-sent').hide();
                        resetForm($('#form-kontakt'));  
                        load_captcha();
                    });
                    $('div#bottom-inner').fadeOut();
                    $('div#bottom-inner-en').fadeOut();
                    $('#li-kontakt-ejected').attr('id', 'li-kontakt');
                    
                    hideBottom = false;
                    
                    return false;
                });
                
                $('div#middle, div#slide1, div#slide2, div#slide3, div#slide4, div#slide5, div#slide6, div#top').click(function(event) {
                        if(hideBottom) $('a.a-skontaktuj-sie"').trigger('click');
                });
            
                $('#form-kontakt').ajaxForm(function() { 
                    if(calcMD5($('#input-captcha').val())==captcha) {
                        if(validateEmail($('#input-email').val())) {
                            if($('#textarea-content').val()!='') {
                                $('#div-bi-formularz').fadeOut(1000, function() {
                                    $('#div-bi-sent').fadeIn(300);    
                                    $('#dt-error').hide();    
                                    $('#dt-error').text();
                                });     
                            } else {
                                $('#dt-error').text('Wiadomość nie może być pusta');
                                $('#dt-error').fadeIn('slow');    
                                return false;    
                            }
                                
                        } else {
                            $('#dt-error').text('Błędny adres email');
                            $('#dt-error').fadeIn('slow');    
                            return false;    
                        }
                    } else {
                        $('#dt-error').text('Błędny kod z obrazka');
                        $('#dt-error').fadeIn('slow');    
                        return false;
                    }
                    
                    
                    
//                    alert("Thank you for your comment!"); 
                    return true;
                }); 
                                
                $('div.s2-person').mouseenter(function() {
                    $('div.s2-person-inner', this).fadeIn();
                });
                
                $('div.s2-person').mouseleave(function() {
                    $('div.s2-person-inner', this).fadeOut();
                });
                
                $('div.s4-film').mouseenter(function() {
                    $('.s4-film-inner', this).fadeIn();
                });
                
                $('div.s4-film').mouseleave(function() {
                    $('.s4-film-inner', this).fadeOut();
                });
                
                $("a.s4-film-fancybox").fancybox({
                    overlayOpacity: 0.9, 
                    overlayColor: 'black', 
                    onStart: function() {
                        mouse_wheel = false;
                    },
                    onClosed: function() {
                        mouse_wheel = true;
                    }
                });
                
                var realizacje_active = 1;
                var realizacje_counter = $('#realizacje-pages-counter').text();
                
                $('a.s4-arrows').click(function(event) {
                    event.preventDefault();
                    
                    if($(this).attr('id')=='s4-arrow-left') {
                        realizacje_active--;
                        if(realizacje_active<1) realizacje_active=realizacje_counter;
                    } else {
                        realizacje_active++;
                        if(realizacje_active>realizacje_counter) realizacje_active = 1;
                    }
                    
                    $('div.s4-films').hide();
//                        $('div#s4-films-b').fadeIn('slow');    
//alert('s4-films-page'+realizacje_active);
                        $('#s4-films-page'+realizacje_active).fadeIn('slow');
                    
                    
                });
                
                var video_play_counter = 0;
                
//                $('a#s5-a1').click(function(event) {
//                    event.preventDefault();
//
//                    _V_("my_video_1").pause();
//                    $('#my_video_1').hide();
//                    _V_("my_video_2").pause();
//                    $('#my_video_3').hide();
//                    $('#my_video_2').show();
//                    
//                    video_play_counter = 0;
//                });
                
				
            
                $('a#s5-a1').toggle(function(event) {
                            event.preventDefault();
                            var originalImage = $('#s5-img3').attr('src');
                            var toggleImage = originalImage.replace('original', 'toggle');
                            var image = new Image ();
                            image.src = toggleImage;
                            
                            $('#s5-img3').attr('src', toggleImage);
                            
                            _V_("my_video_1").pause();
                            $('#my_video_1').hide();
                            _V_("my_video_3").pause();
                            $('#my_video_3').hide();
                            $('#my_video_2').show();

                            video_play_counter = 0;
//                            this.src = toggleImage;
                        }, function(event) {
                            event.preventDefault();
                            
                            var originalImage = $('#s5-img3').attr('src');
                            var toggleImage = originalImage.replace('toggle', 'original');
                            var image = new Image ();
                            image.src = toggleImage;
                            
                            $('#s5-img3').attr('src', toggleImage);
                            
                            _V_("my_video_3").pause();
                            $('#my_video_3').hide();
                            _V_("my_video_2").pause();
                            $('#my_video_2').hide();
                            $('#my_video_1').show();

                            video_play_counter = 0;
                            
//                            this.src = originalImage;
                        });
                        
//                        click(function(event) {
                    

                    
//                });
                
//                if($('a[rel*=toggle] img')) {
//                    $.each	(
//                    $('a[rel*=toggle] img'),
//                    function() {
//                        var originalImage = this.src;
//                        var toggleImage = this.src.replace('original', 'toggle');
//                        var image = new Image ();
//                        image.src = toggleImage;
//                        
//                        
//                        $(this).toggle(function() {
//                            this.src = toggleImage;
//                        }, function() {
//                            this.src = originalImage;
//                        });
//                        
//
//                        
//                    }
//                );
//                }
                
                $('a#s5-ul1-a1').click(function(event) {
                    event.preventDefault();
                    _V_("my_video_2").pause();
                    $('#my_video_2').hide();
                    _V_("my_video_3").pause();
                    $('#my_video_3').hide();
                    $('#my_video_1').show();
                    
                    video_play_counter = 0;
                });
                
                $('a#s5-ul1-a2').click(function(event) {
                    event.preventDefault();
                    _V_("my_video_1").pause();
                    $('#my_video_1').hide();
                    _V_("my_video_2").pause();
                    $('#my_video_2').hide();
                    $('#my_video_3').show();
                    
                    video_play_counter = 0;
                });
                
                
                $('div.s4-film-inner span').click(function(event) {
                    event.preventDefault();
                });
                
//                $('body').bind('mousewheel', function(event, delta) {
//                    var dir = delta > 0 ? 'Up' : 'Down',
//                    vel = Math.abs(delta);
//                    
////                    $(this).text(dir + ' at a velocity of ' + vel);
//                    return false;
//                });



                 var fullscreenVideo = function(){
                    var myPlayer = this;
                    if(!video_play_counter) 
                        myPlayer.requestFullScreen();
                    video_play_counter = 1;
                    
                    $('#fancybox-overlay').show();
                };
                
//                _V_("my_video_1").addEvent("play", fullscreenVideo);
//                _V_("my_video_2").addEvent("play", fullscreenVideo);
//                _V_("my_video_3").addEvent("play", fullscreenVideo);
                


                
                
	}
)
	
       
