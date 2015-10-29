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
  new WOW().init();
  var menu = $('.header-nav');
  var menuToggle = $('.navigation-menu-button');

  $(menuToggle).on('click', function(e) {
    menu.slideToggle();
  });

  $(".features-filter-selector-wrap").on('click','.features-selector',function(e){
    e.preventDefault();
    $(this).closest(".features-filter-selector-wrap")
    .toggleClass( "active" );
    $('body').toggleClass("opened");
  });

  $(".features-filter-selector-wrap").on('click','.features-filter-value',function(e){
    var value= $(this).attr("data-value");
    var textvalue= $(this).text();
    $(this).closest(".features").removeClass().addClass('features '+value ); 
    $(this).closest(".features-filter-selector-wrap")
    .removeClass("active")
    .find('.features-selected-value').text(textvalue);
  });
  $( ".tabs" ).tabs();

  $(".sha-link").on("click",function(){
    $(this).parent().find(".sha-tooltip").toggle();
  });

 /* $('body').on('click', function () {
    if($(this).hasClass('opened')){
      if($('.features-filter-selector-wrap').hasClass('active')){
        $('.features-filter-selector-wrap').removeClass('active');
        $('body').removeClass('opened')
      }
    }
  })*/
});
