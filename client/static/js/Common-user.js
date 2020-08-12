var Cmd = {};

Cmd = {
    $: function (id, doc) {
        var doc = doc || document;
        return doc.getElementById(id);
    },
    $$: function (tagName, doc) {
        var doc = doc || document;
        return doc.getElementsByTagName(tagName);
    },
    $$$: function (tagName, doc) {
        var doc = doc || document;
        return doc.createElement(tagName);
    },
    each: function (obj, func) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) func(key, obj[key]);
        }
    },
    trim: function (str) {
        return str.replace(/^\s+/, '').replace(/\s+$/, '');
    },
    clearHTML: function (str) {
        return str.replace(/<\/?.+?>/g, "");
    },
    getOs: function () {
        if (navigator.userAgent.indexOf("MSIE 8.0") > 0) {
            return "MSIE8";
        }
        else if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
            return "MSIE6";
        }
        else if (navigator.userAgent.indexOf("MSIE 7.0") > 0) {
            return "MSIE7";
        }
        else if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) {
            return "Firefox";
        }
        if (navigator.userAgent.indexOf("Chrome") > 0) {
            return "Chrome";
        }
        else {
            return "Other";
        }
    },
    getCharactersLen: function (str) {
        var Browser = this.getOs();
        var strVal = str;
        if (Browser == 'Firefox' || Browser == 'Chrome' || Browser == 'Other') {
            strVal = strVal.replace(/[\n]/g, '\n\r');
        }
        var totalCount = 0;
        for (var i = 0; i < strVal.length; i++) {
            var c = strVal.charCodeAt(i);
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                totalCount++;
            } else {
                totalCount += 2;
            }
        }
        return totalCount;
    },
    GetUrlParmes: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    },
    CreateA: function (url) {
        var vra = document.createElement('a');
        vra.target = '_blank';
        vra.href = url;
        document.body.appendChild(vra);
        if (document.all) {
            vra.click();
        }
        else {
            window.open(vra, '');
        }
    },
    getCookie: function (sName) {
        var aCookie = document.cookie.split("; ");
        for (var i = 0; i < aCookie.length; i++) {
            var aCrumb = aCookie[i].split("=");
            if (sName == aCrumb[0])
                return unescape(aCrumb[1]);
        }
        return null;
    },
    GetCookie: function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) {
                return decodeURIComponent(c.substring(nameEQ.length, c.length))
            }
        } return null
    },
    setCookie: function (name, value, expires, path, domain) {
        if (!expires) expires = -1;
        if (!path) path = "/";
        var d = "" + name + "=" + value;
        var e;
        if (expires < 0) {
            e = "";
        }
        else if (expires == 0) {
            var f = new Date(1970, 1, 1);
            e = ";expires=" + f.toUTCString();
        }
        else {
            var now = new Date();
            var f = new Date(now.getTime() + expires * 1000);
            e = ";expires=" + f.toUTCString();
        }
        var dm;
        if (!domain) {
            dm = "";
        }
        else {
            dm = ";domain=" + domain;
        }
        document.cookie = name + "=" + value + ";path=" + path + e + dm;
    },
    getPostXY: function () {
        var de = document.documentElement;
        var winWidth = 0;
        var winHeight = 0;
        // 获取窗口宽度
        if (window.innerWidth)
            winWidth = window.innerWidth;
        else if ((document.body) && (document.body.clientWidth))
            winWidth = document.body.clientWidth;
        // 获取窗口高度
        if (window.innerHeight)
            winHeight = window.innerHeight;
        else if ((document.body) && (document.body.clientHeight))
            winHeight = document.body.clientHeight;
        // 通过深入 Document 内部对 body 进行检测，获取窗口大小
        if (de && de.clientHeight && de.clientWidth) {
            winHeight = de.clientHeight;
            winWidth = de.clientWidth;
        }
        var scrollTop = document.body.scrollTop || (de && de.scrollTop);
        var scrollLeft = document.body.scrollLeft || (de && de.scrollLeft);

        return { 'W': winWidth, 'H': winHeight, 'scrollTop': scrollTop, 'scrollLeft': scrollLeft };
    },
    loadJS: function (url, fn) {

        var ss = this.$$('script'),
            loaded = false;
        for (var i = 0, len = ss.length; i < len; i++) {
            if (ss[i].src && ss[i].getAttribute('src') == url) {
                loaded = true;
                break;
            }
        }

        if (loaded) {
            if (fn) fn();
            return false;
        }

        var s = document.createElement('script'),
            b = false;
        s.setAttribute('type', 'text/javascript');
        s.setAttribute('src', url);
        s.onload = s.onreadystatechange = function () {
            if (!b && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
                b = true;
                if (fn) fn();
            }
        };
        document.getElementsByTagName('head')[0].appendChild(s);

    },
    bind: function (objId, eventType, callBack) {
        var obj = this.$(objId);
        if (obj == null || typeof obj == 'undefined')
            return;
        if (obj.addEventListener) {
            obj.addEventListener(eventType, callBack, false);
        }
        else if (window.attachEvent) {
            obj.attachEvent('on' + eventType, callBack);
        }
        else {
            obj['on' + eventType] = callBack;
        }
    },
    unbind: function (objId, eventType, callBack) {
        var obj = this.$(objId);
        if (obj == null || typeof obj == 'undefined')
            return;
        if (window.removeEventListener) {
            obj.removeEventListener(eventType, callBack, false);
        }
        else if (window.detachEvent) {
            obj.detachEvent('on' + eventType, callBack);
        }
        else {
            obj['on' + eventType] = null;
        }
    },
    getEventTarget: function (e) {
        e = e || window.event;
        return e.target || e.srcElement;
    },
    stopDefault: function (e) {
        if (e && e.preventDefault)
            e.preventDefault();
        else
            window.event.returnValue = false;
        return false;
    }
};

Cmd.Dialog = function (DivId, Color, isMask) {

    var de = document.documentElement;
    var Color = Color || '#000';
    var isMask = isMask || '1';
    var DivObj = this.$(DivId);
    var MaskDivId = 'CmdMaskDiv';
    var MaskIframeId = 'CmdMaskIframe';

    var init = function () {
        var SP = Cmd.getPostXY();
        DivObj.style.display = 'block';
        DivObj.style.zIndex = '9999';
        DivObj.style.margin = '0';
        DivObj.style.padding = '0';
        DivObj.style.position = 'absolute';
        DivObj.style.top = (SP.scrollTop + de.clientHeight / 2 - DivObj.offsetHeight / 2) + "px";
        DivObj.style.left = (SP.scrollLeft + de.clientWidth / 2 - DivObj.offsetWidth / 2) + "px";
        if (isMask == '1') { create(SP); }
    };
    var create = function (fun) {
        var MaskObj = Cmd.$(MaskDivId);
        var documentHeight = document.documentElement.clientHeight;
        var scrollHeight = document.body.scrollHeight;
        var height = documentHeight > scrollHeight ? documentHeight : scrollHeight;
        if (MaskObj) {
            MaskObj.style.top = (fun.scrollTop + de.clientHeight / 2 - fun.H / 2) + "px";
            MaskObj.style.left = (fun.scrollLeft + de.clientWidth / 2 - fun.W / 2) + "px";
            MaskObj.style.width = fun.W + 'px';
            //MaskObj.style.height = fun.H + 'px';
            MaskObj.style.height = height + 'px';
        }
        else {
            var MaskDiv = Cmd.$$$('div'),
                MaskIframe = Cmd.$$$('iframe');
            MaskDiv.id = MaskDivId;
            MaskIframe.id = MaskIframeId;
            document.body.appendChild(MaskIframe);
            document.body.appendChild(MaskDiv);
            MaskDiv.style.display = MaskIframe.style.display = 'block';
            MaskDiv.style.background = MaskIframe.style.background = Color;
            MaskDiv.style.position = MaskIframe.style.position = 'absolute';
            MaskDiv.style.width = MaskIframe.style.width = fun.W + 'px';
            //MaskDiv.style.height = MaskIframe.style.height = fun.H + 'px';
            //MaskDiv.style.top = MaskIframe.style.top = (fun.scrollTop + de.clientHeight / 2 - fun.H / 2) + "px";
            MaskDiv.style.top = MaskIframe.style.top = "0px";

            MaskDiv.style.height = MaskIframe.style.height = height + 'px';
            MaskDiv.style.left = MaskIframe.style.left = (fun.scrollLeft + de.clientWidth / 2 - fun.W / 2) + "px";
            MaskDiv.style.filter = MaskIframe.style.filter = 'alpha(opacity=50)';
            MaskDiv.style.opacity = MaskIframe.style.opacity = '.50';
            MaskIframe.style.border = '0';
            MaskIframe.style.filter = 'alpha(opacity=0)';
            MaskIframe.style.opacity = '.0';
            MaskDiv.style.zIndex = '9998';
            MaskIframe.style.zIndex = '9997';
        }
    };
    init();
    //window.onresize = init;
    //window.onscroll = init;
};

Cmd.Dialog.Hide = function (DivId) {
    var MaskDivId = 'CmdMaskDiv',
        MaskIframeId = 'CmdMaskIframe';
    if (Cmd.$(MaskDivId)) {
        document.body.removeChild(Cmd.$(MaskDivId));
    }
    if (Cmd.$(MaskIframeId)) {
        document.body.removeChild(Cmd.$(MaskIframeId));
    }
    window.onresize = null;
    window.onscroll = null;
    Cmd.$(DivId).style.display = 'none';
};

