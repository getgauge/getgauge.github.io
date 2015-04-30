// Do not write any JS here!

//= require 'frameworks/jquery-1.11.2'
//= require 'custom/underscore'
//= require 'custom/jquery.stellar'
//= require 'frameworks/ScrollMagic-2.0.3.min.js'

$(document).ready(function ($) {
  $(window).stellar({
    responsive: true,
    horizontalScrolling: false
  });

  $('a.scroll-animate').click(function(){
      $('html, body').animate({
          scrollTop: $('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().top
      }, 500);
      return false;
  });
});

$(document).ready(function() {
  var menu = $('.header-nav');
  var menuToggle = $('.navigation-menu-button');

  $(menuToggle).on('click', function(e) {
    menu.slideToggle();
  });
});