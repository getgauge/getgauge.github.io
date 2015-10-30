$(function(){
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    var isFirefox = typeof InstallTrigger !== 'undefined';

    if(isIE || isFirefox)
        $('body').addClass('ie')
    else
        $('body').addClass('no-ie')
})