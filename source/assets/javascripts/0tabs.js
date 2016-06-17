$.fn.tabs = function() {
    $(this).find(".tabs-header li a").on('click',function(e){
    	e.preventDefault();
    	var loc= $(this).attr("href");
	    $(".tabs-header a").removeClass('active'); 
    	$(this).addClass("active");
	   $(this).closest(".tabs").find(".tabs-content li").hide();
	   $(this).closest(".tabs").find(loc).show();	
    });
};
 
