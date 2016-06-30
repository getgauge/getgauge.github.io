$(document).ready(function ($) {


  $(".features-filter-selector-wrap").on('click','.features-selector',function(e){
    e.preventDefault();
    event.stopPropagation();
    $(this).closest(".features-filter-selector-wrap").addClass('active');
    // $(".features-filter-selector-wrap").toggleClass('active');
    console.log('foo');
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

  $(".sha-link").on("click",function(){
    $(this).parent().find(".sha-tooltip").toggle();
  });

  $('body').on('click', function () {
   
    if($(this).hasClass('opened')){
      if($('.features-filter-selector-wrap').hasClass('active')){
        $('.features-filter-selector-wrap').removeClass('active');
        $('body').removeClass('opened')
      }
    }

  })
});
