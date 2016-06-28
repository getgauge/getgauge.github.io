$(function(){
  var nb = $('.navbtn');
  var n = $('.mainnav');

  $(window).on('resize', function(){

    if($(this).width() < 570 && n.hasClass('keep-nav-closed')) {
      // if the nav menu and nav button are both visible,
      // then the responsive nav transitioned from open to non-responsive, then back again.
      // re-hide the nav menu and remove the hidden class
      $('.mainnav').hide().removeAttr('class');
    }
    if(nb.is(':hidden') && n.is(':hidden') && $(window).width() > 569) {
      // if the navigation menu and nav button are both hidden,
      // then the responsive nav is closed and the window resized larger than 560px.
      // just display the nav menu which will auto-hide at <560px width.
      $('.mainnav').show().addClass('keep-nav-closed');
    }
  });

  // $('.mainnav a,.top a,#btmnav nav a').on('click', function(e){
  //   e.preventDefault(); // stop all hash(#) anchor links from loading
  // });

  $('.navbtn').on('click', function(e){
    e.preventDefault();
    $(".mainnav").toggleClass('open');
  });


  $('.menu').click(function(){
    $(this).toggleClass('open');
    $('.slidenav').toggleClass('open')
    $('body').toggleClass('nav-open')
  })

  // fixed header

  $(window).scroll(function () {
    var sc = $(window).scrollTop()
    if (sc > 1) {
      $(".top").addClass("scroll-on")
    } else {
      $(".top").removeClass("scroll-on")
    }
  });
});

// Help signup

jQuery(document).ready(function($) {

  $('.help_cta').click(function(event) {
    $('.signup').slideDown('fast');
  });
  $('.signup .close').click(function(event) {
    $('.signup').slideUp('fast');
  });

});
jQuery(document).ready(function($) {
  
    // $(".rslides").responsiveSlides();
    $(".rslides").responsiveSlides({
  auto: true,             // Boolean: Animate automatically, true or false
  speed: 500,            // Integer: Speed of the transition, in milliseconds
  timeout: 4000,          // Integer: Time between slide transitions, in milliseconds
  pager: false,           // Boolean: Show pager, true or false
  nav: false,             // Boolean: Show navigation, true or false
  random: false,          // Boolean: Randomize the order of the slides, true or false
  pause: false,           // Boolean: Pause on hover, true or false
  pauseControls: true,    // Boolean: Pause when hovering controls, true or false
  prevText: "Previous",   // String: Text for the "previous" button
  nextText: "Next",       // String: Text for the "next" button
  maxwidth: "",           // Integer: Max-width of the slideshow, in pixels
  navContainer: "",       // Selector: Where controls should be appended to, default is after the 'ul'
  manualControls: "",     // Selector: Declare custom pager navigation
  namespace: "rslides",   // String: Change the default namespace used
  before: function(){},   // Function: Before callback
  after: function(){}     // Function: After callback
});
});
 

// back to top

$(document).ready(function(){

  // hide #back-top first
  $(".back-top").hide();
  // fade in #back-top
  $(function () {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        $('.back-top').fadeIn();
      } else {
        $('.back-top').fadeOut();
      }
    });
    // scroll body to 0px on click
    $('.back-top').click(function () {
      $('body,html').animate({
        scrollTop: 0
      }, 800);
      return false;
    });
  });

});


