$(function(){$("span.expand").on("click",function(i){i.preventDefault(),$($(this).parent().next("ul.nav-drilldown-list")).toggleClass("active").slideToggle(400),$($(this).parent().parent().siblings("li").find("ul.nav-drilldown-list:visible")).removeClass("active").slideUp(400)})});