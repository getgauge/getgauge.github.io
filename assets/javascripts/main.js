$(function(){var n=$(".navbtn"),o=$(".mainnav");$(window).on("resize",function(){$(this).width()<570&&o.hasClass("keep-nav-closed")&&$(".mainnav").hide().removeAttr("class"),n.is(":hidden")&&o.is(":hidden")&&$(window).width()>569&&$(".mainnav").show().addClass("keep-nav-closed")}),$(".navbtn").on("click",function(n){n.preventDefault(),$(".mainnav").toggleClass("open")}),$(".menu").click(function(){$(this).toggleClass("open"),$(".slidenav").toggleClass("open"),$("body").toggleClass("nav-open")}),$(window).scroll(function(){$(window).scrollTop()>1?$(".top").addClass("scroll-on"):$(".top").removeClass("scroll-on")})}),jQuery(document).ready(function(n){n(".help_cta").click(function(){n(".signup").slideDown("fast")}),n(".signup .close").click(function(){n(".signup").slideUp("fast")})}),jQuery(document).ready(function(n){n(".rslides").responsiveSlides({auto:!0,speed:500,timeout:4e3,pager:!1,nav:!1,random:!1,pause:!1,pauseControls:!0,prevText:"Previous",nextText:"Next",maxwidth:"",navContainer:"",manualControls:"",namespace:"rslides",before:function(){},after:function(){}})}),$(document).ready(function(){$(".back-top").hide(),$(function(){$(window).scroll(function(){$(this).scrollTop()>100?$(".back-top").fadeIn():$(".back-top").fadeOut()}),$(".back-top").click(function(){return $("body,html").animate({scrollTop:0},800),!1})})});