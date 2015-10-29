$(function(){
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    //var isFirefox = /*@cc_on!@*/false || !!document.documentMode;

    if(isIE)
        $('body').addClass('ie')
    else
        $('body').addClass('no-ie')
    //if(isIE)
    //    $('body').addClass('ie')
    //else
    //    $('body').addClass('no-ie')
})