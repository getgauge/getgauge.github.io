function bindings_create(e,n,t){var i=this;if(void 0===e||null===e)return $.extend({},i.data("model"));var a=i.data("model");if(i.data("isChange",!1),void 0!==a)return"function"==typeof e?(a=e(a))&&i.data("model",a):i.data("model",e),bindings_refresh.call(i,t),i.trigger("model-update",[e,t]),i;if(void 0!==n){if("/"===n.substring(0,1))return i.trigger("template-download-begin",[n]),void $.get(n,{},function(e){i.trigger("template-download-end",[n,e]),bindings_create.call(i,i.data("model"),e)});n.indexOf(">")!==-1&&n.indexOf("<")!==-1?i.html(n):n=$(n).html()}return i.data("default",$.extend(!0,{},e)),i.data("model",e),i.on("change","input[data-model]",function(e){bindings_internal_change.call(this,e,i,i.data("model"),t)}),i.on("change","textarea[data-model],select[data-model]",function(e){bindings_internal_change.call(this,e,i,i.data("model"),t)}),bindings_refresh.call(i,t),bindings_delay(function(){i.trigger("model-create",[e,t])}),bindings_rebind.call(i)}function bindings_internal_change(e,n,t,i){var a=$(this),r=a.attr("data-model"),d=a.attr("type"),o=a.val();/(MSIE\ [0-8]\.\d+)/.test(navigator.userAgent)||e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation(),"checkbox"===d&&(o=this.checked);var l=a.attr("data-prepare"),s=$.bindings.prepare.call(a,r,o,l,t,i);void 0===s&&(s=$.bindings._prepare.call(a,r,o,l,t,i));var c=$.bindings._validation.call(a,r,s,t,i);if($.bindings.watch.call(a,c,r,s,t,i),c){if(bindings_setvalue.call(a,t,r,s,i),"checkbox"!==d&&"radio"!==d)switch(this.tagName.toLowerCase()){case"input":case"textarea":this.value=$.bindings.format.call(a,r,s,a.attr("data-format"),n.data("model"),i)}else this.checked=o;bindings_rebind.call(n,i),n.data("isChange",!0),bindings_delay(function(){n.trigger("model-change",[r,s,t,i,a]),n.trigger("model-update",[t,r,i])})}}function bindings_json(e,n,t){var i=this,a=$(e);switch(a.get(0).tagName.toLowerCase()){case"input":case"select":case"textarea":return void bindings_create.call(i,$.parseJSON(a.val().replace(/\n/g,"\\n")),n,t)}return bindings_create.call(i,$.parseJSON(a.html().replace(/\n/g,"\\n")),n,t),i}function bindings_download(e,n,t,i){var a=this;if("object"==typeof n){t=n,n=t}t||(t={}),t.type||(t.type="GET"),t.dataType||(t.dataType="json");var r=e+JSON.stringify(t);if(!jquerybindings_cache[r])return a.trigger("model-download-begin",[e]),t.success=function(t){a.trigger("model-download-end",[e,t,i]),delete jquerybindings_cache[r],bindings_create.call(a,t,n,i)},t.error=function(n,t){a.trigger("model-download-end",[e,i]),delete jquerybindings_cache[r],a.trigger("model-download-error",[t,e,i])},$.ajax(e,t),a}function bindings_destroy(){var e=this,n=e.attr("data-name");return e.removeData("model"),e.removeData("default"),e.removeData("isChange"),e.find("input[data-model],textarea[data-model],select[data-model]").unbind("change"),e.trigger("model-destroy",[n]),e}function bindings_default(){var e=this,n=e.data("default"),t=e.attr("data-name");return e.data("model",$.extend({},n)),e.data("isChange",!1),bindings_refresh.call(e,t),bindings_delay(function(){e.trigger("model-default",[n,t])}),e}function bindings_validate(e){var n=this,t=n.data("model"),i=[];return bindings_reflection(t,function(t,a){var r=$.bindings._validation(t,a,e);void 0===r||null===r||r||i.push({path:t,value:a,element:n.find('input[data-model="'+t+'"],textarea[data-model="'+t+'"],select[data-model="'+t+'"]')})}),n.trigger("validate",[i,e]),n.trigger("validation",[i,e]),n.trigger("model-validate",[i,e]),n.trigger("model-validation",[i,e]),n}function bindings_set(e,n,t){var i=this,a=i.data("model");if(void 0===a)return i;"function"==typeof n&&(n=n(bindings_getvalue(a,e,t)));var r=$.bindings._validation(e,n,a,t);return $.bindings.watch.call($('input[data-model="'+e+'"],textarea[data-model="'+e+'"],select[data-model="'+e+'"]'),r,e,n,a,t),r?(bindings_setvalue(a,e,n,t)&&bindings_refresh.call(i,t),i.data("isChange",!0),i.trigger("model-update",[a,e,t]),i):i}function bindings_get(e,n){var t=this,i=t.data("model");if(void 0!==i)return bindings_getvalue(i,e,n)}function bindings_rebind_force(e){var n=this,t=n.data("model");return void 0===t?n:(n.find("[data-model]").each(function(){var n=this.tagName.toLowerCase();if("input"!==n&&"select"!==n&&"textarea"!==n){var i=$(this),a=i.attr("data-model"),r=i.attr("data-custom"),d=bindings_getvalue(t,a);if(void 0!==r)return void $.bindings.custom.call(i,a,d,r||"",t,e);var o=(i.attr("data-encode"),$.bindings.format.call(i,a,d,i.attr("data-format"),t,e));void 0===o&&(o=""),"string"!=typeof o&&(o=o instanceof Array?o.join(", "):null===o?"":o.toString()),i.html(o)}}),n)}function bindings_rebind(e){var n=this;if(void 0===n.data("model"))return n;var t=n.data("timeout_rebind")||null;null!==t&&clearTimeout(t);var t=setTimeout(function(){bindings_rebind_force.call(n,e)},100);return n.data("timeout_rebind",t),n}function bindings_refresh(e){var n=this;if(void 0===n.data("model"))return n;var t=n.data("timeout_refresh")||null;null!==t&&clearTimeout(t);var t=setTimeout(function(){bindings_refresh_force.call(n,e)},100);return n.data("timeout_refresh",t),n}function bindings_refresh_force(e){var n=this,t=n.data("model");return void 0===t&&(t={},n.data("model",t)),n.find("[data-model]").each(function(){var i=$(this),a=i.attr("data-model")||"",r=!1;switch(this.tagName.toLowerCase()){case"input":case"textarea":case"select":r=!0}var d=bindings_getvalue(t,a,e),o=i.attr("data-format"),l=i.attr("data-custom");if(void 0===d&&(d=i.attr("data-default")),void 0!==l)return void $.bindings.custom.call(i,a,d,l||"",t,e);var s=$.bindings.format.call(n,a,d,o,t,e);if(r){var c=i.attr("type");if("checkbox"===c)this.checked=d===!0||1===d||"true"===d;else if("radio"===c){if(this.value!=d)return;this.checked=!0}else i.val(s)}else{var g=i.attr("data-encode"),u=void 0!==g&&"false"===g;void 0===s&&(s=""),"string"!=typeof s&&(s=s instanceof Array?s.join(", "):null===s?"":s.toString()),i.html(u?s:s.encode())}}),n}function bindings_send(e,n,t,i){var a=this,r=a.data("model");if(!r)return a;var a=this;if($.isPlainObject(e)){var d=n;n=e,e=d}e=e||window.location.pathname,n||(n={}),n.type||(n.type="POST"),n.dataType||(n.dataType="json");var o=e+JSON.stringify(n);return jquerybindings_cache[o]?void 0:(a.trigger("model-send-begin",[e,r,t]),n.contentType="application/json",n.data=JSON.stringify(r),n.success=function(n){a.trigger("model-send-end",[e,r,t]),delete jquerybindings_cache[o],a.trigger("send",[n,r,t]),a.trigger("model-send",[n,r,t]),i&&i(null,n)},n.error=function(n,d){a.trigger("model-send-end",[e,r,t]),delete jquerybindings_cache[o],a.trigger("model-send-error",[d,e,r,t]),i&&i(d,null)},$.ajax(e,n),a)}function bindings_setvalue(e,n,t){n=n.split(".");for(var i=n.length,a=e,r=0;r<i-1;r++)if(void 0===(a=bindings_findpipe(a,n[r])))return!1;return a=bindings_findpipe(a,n[i-1],t),!0}function bindings_findpipe(e,n,t){var i,a=n.lastIndexOf("["),r=-1;if(a!==-1){if(r=parseInt(n.substring(a+1).replace(/\]\[/g,"")),isNaN(r))return;n=n.substring(0,a),i=e[n][r]}else i=e[n];if(void 0!==i)return void 0===t?i:(r!==-1?(e[n][r]=t,i=e[n][r]):(e[n]=t,i=e[n]),i)}function bindings_getvalue(e,n){n=n.split(".");for(var t=(n.length,e),i=0;i<n.length;i++)if(void 0===(t=bindings_findpipe(t,n[i])))return;return t}function bindings_reflection(e,n,t){t=t||"";for(var i in e)if("string"==typeof i){var a=t+(""!==t?".":"")+i,r=typeof e[i];"function"!==r&&(n(a,e[i],i),"object"===r&&bindings_reflection(e[i],n,a))}}function bindings_delay(e){setTimeout(function(){e()},120)}var jquerybindings_cache={};$.bindings={},$.fn.bindings=function(e){var n=this;void 0===e&&(e="model");var t=n.attr("data-name");switch(e){case"create":return function(e,i){return bindings_create.call(n,e,i,t)};case"json":return function(e,i){return bindings_json.call(n,e,i,t)};case"download":return function(e,i,a){return bindings_download.call(n,e,i,a,t)};case"change":return function(e){return"boolean"!=typeof e?n.data("isChange")||!1:n.data("isChange",e)};case"refresh":return void bindings_refresh.call(n,t);case"destroy":return void bindings_destroy.call(n,t);case"default":return void bindings_default.call(n,t);case"validate":case"validation":return bindings_validate.call(n,t);case"set":return function(e,i){return bindings_set.call(n,e,i,t)};case"get":return function(e){return bindings_get.call(n,e,t)};case"update":return function(e){return bindings_create.call(n,e,t)};case"model":return bindings_create.call(n,null,null,t);case"send":return function(e,i,a){if("function"==typeof i){a=i,i=a}return bindings_send.call(n,e,i,t,a)}}return n},$.bindings.prepare=function(){},$.bindings._prepare=function(e,n,t,i){if("string"!=typeof n)return n;if(bindings_getvalue(i,e)instanceof Array){for(var a=n.split(","),r=a.length,d=[],o=0;o<r;o++){var l=$.trim(a[o]);l.length>0&&d.push(l)}return d}return n.isNumber()?"0"===n[0]&&n.length>1?n:(n=n.replace(",","."),n.indexOf(".")===-1?parseInt(n):parseFloat(n)):n},$.bindings.format=function(e,n){return n instanceof Array?n.join(", "):n},$.bindings.custom=function(){},$.bindings.watch=function(){},$.bindings.validation=function(){return!0},$.bindings._validation=function(e,n,t,i){var a=$.bindings.validation(e,n,t,i);return void 0!==a&&null!==a||(a=!0),a===!0},String.prototype.isNumber||(String.prototype.isNumber=function(e){var n=this,t=n.length;if(0===t)return!1;e=e||!0;for(var i=0;i<t;i++){var a=n.charCodeAt(i);if(!e||44!==a&&46!==a){if(a<48||a>57)return!1}else e=!1}return!0}),String.prototype.encode||(String.prototype.encode=function(){return this.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")});