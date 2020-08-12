/* Append File:/2sc/pc/evnetclicktrack.js */
var tag = ["a", "div", "span", "i", "img", "em", "li"];
$("body").on("click", function (event) {
    var obj = event.target;
    var num = 0;
    do {
        if (typeof (obj.tagName) != "undefined") {
            var tagname = obj.tagName.toLowerCase();
            var i = 0;
            for (i = 0; i < tag.length; i++) {
                if (tag[i] == tagname) {
                    if (obj.getAttribute("name") == "track") {
                        trackClick($(obj).attr("eventkey"), $(obj).attr("infoid"));
                        num = 3;
                        break;
                    }
                    if (obj.getAttribute("trackaction")) {
                        trackActionClick($(obj).attr("trackaction"), $(obj).attr("trackarea"));
                        num = 3;
                        break;
                    }
                }
            }
            num++;
        }
        obj = obj.parentNode;

    }
    while ((num < 3) && obj != null);
})
// 记录点击
function trackClick(eventKey, info) {
    //alert("eventkey=" + eventKey + "|info=" + info);
    if (!info)
        info = 0;
    $.ajax({
        type: "GET",
        url: "//collectionpv.che168.com/collect/page_event.ashx?eventkey=" + eventKey + '&info=' + info + '&ref=' + escape(document.referrer) + '&cur=' + escape(location.href) + '&rm=' + new Date().getTime(),
        dataType: "jsonp"
    });
}

function trackActionClick(action, area) {
    if (typeof trackCustomEvent == 'undefined')
        return;
    trackCustomEvent('che_common_event', { 'biz': 'usc', 'type': 'click', 'action': action, 'ctime': new Date().getTime(), 'area': area, 'element': 'details', 'pmark': '0' });
}

$('body').on('click', '[customeventkey="che_eventkey"]', function () {
    var che_json = $(this).attr('che_json') || '{}';
    che_json = eval('(' + che_json + ')');
    var che_extendsJson = $(this).attr('che_extendsjson') || '{}';
    che_extendsJson = eval('(' + che_extendsJson + ')');
    trackCustomClick(che_json, che_extendsJson);
});


var platForm = 10;
/** 
   *集团埋点统计
   * @param {Object} json  基础信息 必填
   * @param {Object}  extendsJson   扩展信息   非必填
   */
function trackCustomClick(json, extendsJson) {
    if (typeof trackCustomEvent == 'undefined')
        return;
    if (typeof json == 'object') {
        var base = { biz: 'usc', ctime: new Date().getTime() };
        $.extend(base, json);
        extendsJson = extendsJson || {};
        if (typeof extendsJson == 'object') {
            $.extend(extendsJson, { platform: platForm });
            trackCustomEvent('che_common_event', base, JSON.stringify(extendsJson));
        }
        else
            trackCustomEvent('che_common_event', base);
    }
    else {
        return;
    }
}

