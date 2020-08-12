<script type="text/javascript">
    (function(win,jsvar){
        jsvar.search_q = '';
        jsvar.carlist_count = '25052';
        jsvar.currpage = 'buy';
        jsvar.search_word = '';
        jsvar.page = '1';
        jsvar.last_page = '';
        jsvar.searchstr = '';
        jsvar.viewtype = '';
        jsvar.cityid = "3001";
        jsvar.cityname = "杭州";
        jsvar.column = "" || '';
        jsvar.perimeter = "" || '';
        jsvar.total = '';
        jsvar.PAGE_SIZE = '40' || 40;
        jsvar.brandid = "";
        jsvar.seriesid_xin = "";
        jsvar.con_filters = 0;
              jsvar.follow_see_car= 1;
    })(window,(window.jsvar = window.jsvar ||{} ));
</script>
<script>
    $(function(){
            // 打点
            var q = jsvar.search_q;
            var search = window.location.search.match(/(\?|&)clk=([^#&]*)(&|$)/);
            if (q  && search && (search = search[2]) ) {
                var step=window.location.search.match(/(\?|&)step=([^#&]*)(&|$)/);
                var logrank = window.location.search.match(/(\?|&)logrank=([^#&]*)(&|$)/);
                if(search !== '') {
                    var result_num = jsvar.carlist_count,
                                search_type = 0,
                                curentpage = '',
                                ranknum = 0;
                    var result_num = result_num == '' ? 0 : result_num ;
                    if (search == 'suggest') {
                        search_type = 2;
                    }else if (search == 'click') {
                        search_type = 1;
                    }
                    if(step && step[2]) {
                        curentpage = 1;//首页
                    }else{
                        var type = jsvar.currpage;
                        if (type == 'halfprice') {
                            curentpage = 3;
                        }else if (type == 'buy') {
                            curentpage = 2;
                        }
                    }
                    if (logrank && logrank[2]){
                        ranknum = logrank[2];
                    }
                    var search_result = '';
                    if($('.js-select-condition-result dd a') && $('.js-select-condition-result dd a').length > 0){
                        $.each($('.js-select-condition-result dd a'), function (k, v) {
                            search_result += v.text;
                        });
                    }

                   var  expro_url_only=location.pathname+location.search;
                    if($.cookie("expro_url_only") !=expro_url_only ){
                         uxl_track('w/search_car/type/'+search_type+'/page/' + curentpage + '/rank/' + ranknum + '/result/'+result_num+'/retri_word/'+search_result+'/word/'+q+'/input_word/'+jsvar.search_word);
                             $.cookie("expro_url_only",expro_url_only,{  path:'/',domain: '.xin.com' });
                               
                    }
       
                }
            }
        if(jsvar.follow_see_car){
        <!--开通带看车功能对应城市--车辆列表页添加免费电话功能 start-->
        $('.call-pop').find('.ipt-box').bind('keyup', function(){
            checkNun();
            is_valid_phone($(this).attr('class'));
            if ($(this).val().length>11) {
                return false;
            }
        }).bind('click', function(){
            cfc_clear_msg();
        }).bind('keypress', function(e){
            checkNun();
            if ($(this).val().length>11) {
                return false;
            }
        });

        //闭包,不影响代码
        $('.call-fixed').on('click',function(){
            $(this).hide();
            $('.call-pop img').css('display','block');
            $('.fail').css('display','none');
            $('.succeed').css('display','none');
            $('.ipt-box').val('');
            $('.call-pop').show();
            uxl_track('w_carlist/tel_free');
        });
        $('.call-pop .call').on('click', function(){
            if (is_valid_phone($(this).attr('class'))===true) {
                var vcode = $.trim($('.img-code').val());
                if (vcode.length==0) {
                    cfc_show_msg('请输入图片验证码');
                    $('#vcodeimg_freecall').show();
                    $('.box1').show();
                    return false;
                }
                var tmp_m = $.trim($('.ipt-box').val());
                if (tmp_m.length>0) {
                    uxl_track('w_carlist/tel_free/tel_free_confirm/'+tmp_m);
                    $.post('/search/carlist_free_call/',{ 'client_phone' : tmp_m , 'vcode':vcode, 'client_type' : 10 , type:'ajax', ab:'1' },function(data){
                        var data = JSON.parse(data);
                        if (data.code == 1 || data.code == 2){
                            $('.call-pop img').css('display','none');
                            $('.fail').css('display','none');
                            $('.succeed').css('display','block');
                        } else {
                            $('.call-pop img').css('display','none');
                            $('.succeed').css('display','none');
                            $('.fail').css('display','block');
                            $('.fail').html(data.message);
                        }
                        cfc_flush_vcode();
                        $('.img-code').val('');
                        $('#vcodeimg_freecall').show();
                    });
                }
            }
        });

        $('.call-pop .hide').on('click', function(){
            $('.call-pop').hide();
            $('.call-fixed').show();
        });

        $('.img-code').on('click', function(){
            cfc_clear_msg();
        });

        $('.call-pop .box1').on('click', '#vcodeimg_freecall', function(){
            cfc_flush_vcode();
        });

        function is_valid_phone(el_class) {
            
            var reg = /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/g;
            
            var tmp_m = $.trim($('.ipt-box').val());
            if(tmp_m == '' || !reg.test(tmp_m)){
                if (el_class=='call') {
                    cfc_show_msg('请输入正确的手机号');
                }
                $('.box1').hide();
                return false;
            }
            cfc_clear_msg();
            $('.box1').show();
            $('#vcodeimg_freecall').show().attr('src','/car/get_vcode/?t='+(new Date).getTime());
            return true;
        }

        function cfc_show_msg(msg) {
            msg = $.trim(msg);
            if (msg.length>0) {
                $('.call-pop img').css('display','none');
                $('.succeed').css('display','none');
                $('.fail').css('display','block');
                $('.fail').html(msg);
                $('.box1').hide();
                $('#vcodeimg_freecall').hide();
            }
        }

        function cfc_clear_msg() {
            $('.fail').html('').hide();
            $('.succeed').hide();
        }

        function cfc_flush_vcode() {
            $('.box1').find('.code').find('#vcodeimg_freecall').attr('src', "/car/get_vcode/" + (new Date()).getTime());
        }

        function checkNun(){
            var reg = /^0?1[3|5|7|8][0-9]\d8$/;
            if(($(".ipt-box").val().length)>11){
                var val = $(".ipt-box").val().substr(0,11);
                $(".ipt-box").val(val);
            }
            if(reg.test($(".ipt-box").val())){
                $(".call-pop .box1").show();
                return true;
            }else{
                $(".call-pop .box1").hide();
                $(".box1 .img-code").val("");
                return false;
            };
        }
        <!--开通带看车功能对应城市--车辆列表页添加免费电话功能 ends-->
        }
        $('.list-con,.new_list').on('mouseout','.con',function(){
            $(this).children(".collect-star").hide();
            $(this).children(".compare-box").hide();
        });
        $('.list-con,.new_list').on('mouseover','.con',function(){
            $(this).children(".collect-star").show();
            $(this).children(".compare-box").show();
        });
        /*$('.list-con,.new_list').on('click', '.across', function(ev){
            ev.preventDefault();
		    ev.stopPropagation();
            // var conlink = $(this).parent().children('.aimg').attr('href');
            var conlink = $(this).find('.aimg').attr('href');            
            if (typeof(conlink) != 'undefined') {
                // if(ev.target.className != 'tit'){
                    window.open(window.UrlTool.fixHref(conlink),'_blank');
                // }
            }
        });*/
        $('.vtc-cs,.vtc-a').on('click',function(ev){
            ev.preventDefault();
		    ev.stopPropagation();
            var conlink = $(this).attr('href');
            if (typeof(conlink) != 'undefined') {
                window.open(window.UrlTool.fixHref(conlink),'_blank');
            }
        });

        $("#cDload").click(function(){
            $(".pop_ext").hide();
        });

        $("img.lazy").lazyload();
        var sTitle = '';
        try{
           sTitle =  decodeURIComponent(jsvar.search_q);
        }catch(e){
           sTitle = jsvar.search_q;
        }
        $("#none-txt-q").attr("title",sTitle).html(sTitle.substring(0,40));
        var currpage = jsvar.currpage;
        if(jsvar.con_filters == 1){
            $(".clear-condition").click(function(){
                if (currpage == 'buy'){
                    window.location.href=UrlTool.fixHref('/'+TOP_INFO.location.ename +'/s/');
                }else{
                    window.location.href=UrlTool.fixHref('/'+TOP_INFO.location.ename +'/h/');
                }
            });
            if(jsvar.currpage == 'halfprice'){
                $('.car-source').show();
            }
            $(".clear-condition").show();
        }else{
            if(jsvar.currpage == 'halfprice'){
                $('.car-source').hide();
            }
            $(".clear-condition").hide();
        }

        $('#php_lookup_now').on('click',function(e){
            $('.closeJs').click();
        });
        var page = jsvar.page;
        var last_page = jsvar.last_page;
        var searchstr = jsvar.searchstr;
        var q = jsvar.search_q;
        var viewtype = jsvar.viewtype;
        var cityid = jsvar.cityid;
        var cityname = jsvar.cityname;
        var column = jsvar.column;
        var perimeter = jsvar.perimeter;
        var total = jsvar.total;
        var PAGE_SIZE = jsvar.PAGE_SIZE;

        //增加车系搜索量
        var brandid = jsvar.brandid;
        var seriesid_xin = jsvar.seriesid_xin;
        $.post("/apis/apis_ajax/add_search_series",{ brandid:brandid,seriesid_xin:seriesid_xin });

        // 列表页[全价，付一半] 优信认证，商家质保，本地车源筛选打点。
        var ab_filter_conf =[]; 
        // 定义打点值：0--全部车源,1--分期购,2--优信认证,3--商家质保,4--本地车源，5--一成购,6超值，7视频
            ab_filter_conf[1]=0,ab_filter_conf[5]=1;
            ab_filter_conf[9]=ab_filter_conf[17]=2;
            ab_filter_conf[4]=ab_filter_conf[16]=3;
            //ab_filter_conf[1000]=4;
            ab_filter_conf[20]=5;
            ab_filter_conf[21]=6;
            ab_filter_conf[22]=7;
        $('.opt .opt-tab a').bind('click', function(){
            var filter_k = $(this).attr('data-for').substr(7,1);
            var filter_val = $(this).attr('data-'+filter_k);
            if ((filter_k == 'v' || filter_k == 't') && filter_val && jsvar.currpage) {
                var page = jsvar.currpage == 'buy' ? 2 : 3; // 全价车列表页2 ,付一半3；
                uxl_track('carcat_filter#' + 'page=' + page + '/carcat=' + ab_filter_conf[filter_val]);
            }
        });
        //zg-code-end
        //猜你感兴趣切换效果
        $(".u-alike a").hover(function(){
            var index = $(this).index(".u-alike a");
            $(this).addClass("c1").siblings("a").removeClass("c1");
        });
        //车辆列表页收藏及对比按钮效果
        $("div.vtc-img").mouseout(function(){
            $(this).children(".collect-star").hide();
            $(this).children(".compare-box").hide();
        });

        $("div.vtc-img").mouseover(function(){
            $(this).children(".collect-star").show();
            $(this).children(".compare-box").show();
        });

        // 170515 直购打点
        /*var url_type = location.pathname.match(/\/h(\/|\?|$)/) ? -1 : -2;
        if (location.pathname.indexOf('v5')!==-1){
            url_type = -1;
        }*/
         var url_type = jsvar.is_hf;
         /*曝光打点  ，点击打点 公用变量*/
        var expro_page = jsvar.page || 1 ,
            expro_result=$(".ab_carlist").length>0?1:0 ,
            expro_class="",
            is_search_page='',
            expro_reg=/^i[0-9]+$/;
        if( (!jsvar.search_q || jsvar.search_q == '搜索您想要的车') && (!jsvar.searchstr || expro_reg.test(jsvar.searchstr)) ){
             expro_class=1;
        } else  if( jsvar.search_q && jsvar.search_q != '搜索您想要的车'){
             expro_class=2;
             is_search_page=jsvar.search_q;
        }else{
              expro_class=3;
        }
        /*if( (!jsvar.search_q || jsvar.search_q == '请输入品牌、车系搜索') && jsvar.searchstr ){
             expro_class=3;
        } */
        //点击打点      
        $('#search_container').on('click','.caritem', function(){
                var index = parseInt($(this).index()) + 1;
                index = ($('.page-current').text() ? $('.page-current').text() : 1) + '-' + index;
                var carid = $(this).attr('data-carid');
                var zg= $(this).attr('data-zg') ==1 ? 1 : 0;
                var tar = $(this).parents('.list-con');
                if (tar.hasClass('ab_carlist')){
                    var mold = '/mold=0';
                } else if(tar.hasClass('ab_carlist_y2')){
                    var mold = '/mold=1';
                } else if(tar.hasClass('ab_carlist_y1')){
                    var mold = '/mold=4';
                } else if(tar.hasClass('ab_carlist_sold')){
                    var mold = '/mold=3';
                }else if(tar.hasClass('ab_carlist_hot')){
                    var mold = '/mold=2';
                }

                var taglabel = $(this).attr('data-taglabel');

                //判断是否有一成购的图标

                var  isHasIcon = $(this).find('.change-ycgicon');
                var  icon = isHasIcon.length ? 1 : 0;
                var  isVideo = $(this).find('.video');
                var  isVideoVal = isVideo.length ? 1 : 0;
                if (url_type) {             
                    uxl_track('carlist_click#rank='+index+'/carid='+carid+'/type='+ zg + mold + '/word='+is_search_page+'/page=3/class='+expro_class+'/result='+expro_result+'/label='+ taglabel + '/icon=' + icon + '/video=' + isVideoVal);
                } else {
                  uxl_track('carlist_click#rank='+index+'/carid='+carid+'/type='+ zg + mold + '/word='+is_search_page+'/page=2/class='+expro_class+'/result='+expro_result+'/label='+ taglabel + '/icon=' + icon + '/video=' + isVideoVal);
                }
        });
        //日志打点（曝光） 列表页曝光打点
        if (url_type) {
            /*付一半*/
            var uxl_pl ='carlist_expo#page=3/class='+expro_class+'/result='+expro_result+'/page_num='+expro_page;
        }else{
            var uxl_pl = 'carlist_expo#page=2/class='+expro_class+'/result='+expro_result+'/page_num='+expro_page;
        }
     

        if ( $('.ab_carlist').find('.caritem').length) { 
            // 列表页 车源曝光打点
            var uxl_ds = get_page_car_ids('ab_carlist',0);
            if(typeof uxl_exposure_track === "function"){
                if (uxl_ds.length > 20){
                    // 大于20 就分两次发送曝光打点
                    var uxl_ds_head = uxl_ds.splice(0, 20); // 前20个车打点
                    uxl_exposure_track(uxl_pl+'-a', uxl_ds_head.join(';')); // 前20个
                    uxl_exposure_track(uxl_pl +'-b', uxl_ds.join(';')); // 后面剩余数量
                } else {
                    // 小于20 一次曝光打点
                    uxl_exposure_track(uxl_pl+'-a', uxl_ds.join(';'));  
                }
            }
        }

        if($('.ab_carlist_sold').find('.caritem').length){ //列表页 已售车源曝光打点
            var uxl_ds = get_page_car_ids('ab_carlist_sold',3);
            if(typeof uxl_exposure_track === "function"){
                if (uxl_ds.length > 20){
                    // 大于20 就分两次发送曝光打点
                    var uxl_ds_head = uxl_ds.splice(0, 20); // 前20个车打点
                    uxl_exposure_track(uxl_pl+'-a', uxl_ds_head.join(';')); // 前20个
                    uxl_exposure_track(uxl_pl +'-b', uxl_ds.join(';')); // 后面剩余数量
                } else {
                    // 小于20 一次曝光打点
                    uxl_exposure_track(uxl_pl+'-a', uxl_ds.join(';'));  
                }
            }
        }

        if($('.ab_carlist_hot').find('.caritem').length){ //列表页 热门车源曝光打点
            var uxl_ds = get_page_car_ids('ab_carlist_hot',2);
            if(typeof uxl_exposure_track === "function"){
                if (uxl_ds.length > 20){
                    // 大于20 就分两次发送曝光打点
                    var uxl_ds_head = uxl_ds.splice(0, 20); // 前20个车打点
                    uxl_exposure_track(uxl_pl+'-a', uxl_ds_head.join(';')); // 前20个
                    uxl_exposure_track(uxl_pl +'-b', uxl_ds.join(';')); // 后面剩余数量
                } else {
                    // 小于20 一次曝光打点
                uxl_exposure_track(uxl_pl+'-a', uxl_ds.join(';'));  
                }
            }
        }
         if($('.ab_carlist_y2').find('.caritem').length){ // 列表页 周边车源曝光打点
            var uxl_ds = get_page_car_ids('ab_carlist_y2',1);
            if(typeof uxl_exposure_track === "function"){
                if (uxl_ds.length > 20){
                    // 大于20 就分两次发送曝光打点
                    var uxl_ds_head = uxl_ds.splice(0, 20); // 前20个车打点
                     uxl_exposure_track(uxl_pl+'-a', uxl_ds_head.join(';')); // 前20个
                    uxl_exposure_track(uxl_pl +'-b', uxl_ds.join(';')); // 后面剩余数量
                } else {
                    // 小于20 一次曝光打点
                    uxl_exposure_track(uxl_pl+'-a', uxl_ds.join(';')); 
                }
            }
        }

        if($('.ab_carlist_y1').find('.caritem').length){ //列表页 全国其他车源曝光打点
            var uxl_ds = get_page_car_ids('ab_carlist_y1',4);
            if(typeof uxl_exposure_track === "function"){
                if (uxl_ds.length > 20){
                    // 大于20 就分两次发送曝光打点
                    var uxl_ds_head = uxl_ds.splice(0, 20); // 前20个车打点
                    uxl_exposure_track(uxl_pl+'-a', uxl_ds_head.join(';')); // 前20个
                    uxl_exposure_track(uxl_pl +'-b', uxl_ds.join(';')); // 后面剩余数量
                } else {
                    // 小于20 一次曝光打点
                    uxl_exposure_track(uxl_pl+'-a', uxl_ds.join(';'));  
                }
            }
        }
        /**
         *曝光打点，收集某class下车辆信息
         * @param  classname class名字
         * @returns array
         */
        function get_page_car_ids(classname,cartype){
            // 一辆车的信息拼接如下：p#(position_id),c#(car_id),type#(value),label#(value);
            var car_expro = [];
            if ($('.'+classname).find('.caritem').length) {
                $('.'+classname).find('.caritem').each(function(d){
                    var index = parseInt($(this).index()) + 1;
                    var carid = $(this).attr('data-carid');
                    var zg= $(this).attr('data-zg') ==1 ? 1 : 0;
                    var label = $(this).attr('data-taglabel');
                    /*car_expro.push('p#' + index + ',c#' + carid + ',type#' + zg + ',label#'+ label);*/
                    var  isHasIcon = $(this).find('.change-ycgicon');
                    var  icon = isHasIcon.length ? 1 : 0;
                    var  isVideo = $(this).find('.video');
                    var  isVideoVal = isVideo.length ? 1 : 0;
                    car_expro.push('p#' + index + ',c#' + carid + ',type#' + zg + ',mold#'+cartype +',label#'+ label +',icon#'+ icon + ',video#' + isVideoVal);
                });
            }
            return car_expro;
        }
        function placeholder(obj,defaultValue) {
            if (!('placeholder' in document.createElement('input'))) {
                var focusStyle = { color : '#333' },
                    blurStyle = { color : '#ccc' };
                $(obj).css(blurStyle).each(function (i, ele) {
                    this.defaultValue = defaultValue || $(this).attr('placeholder');
                    this.value = this.defaultValue;
                    $(this).focus(function () {
                        if ($(this).val() == this.defaultValue) {
                            $(this).val('');
                        }
                        //$(this).css(focusStyle);   
                    }).blur(function () {
                        if ($(this).val() == '') {
                            $(this).val(this.defaultValue);
                            $(this).css(blurStyle)
                        }
                    });
                });
            }
        }
        placeholder('.js-search-from-page',"搜索您想要的车");

    });
</script>
	</div>
	
</div>



<!--对比车辆开始-->
<div class="popup-wrap" id="compareC">
    <div class="inner">
        <div class="popup-con3 con-height4">
            <p class="pop-tit">对比车辆</p>
            <a class="ico_pop xBtn2 closeJs">关闭</a>
            <div class="pop_item clearfix" id="clear_all_compare"></div>
            <div class="joinCom">
                <a onclick="start_compare()" class="conCom">开始对比</a>
                <a onclick="clear_all_comp(event)" class="conClear">清空所有对比</a>
            </div>
        </div>
    </div>
</div>
<!--对比车辆结束-->
<!--收藏车辆开始-->
<div class="popup-wrap" id="stroeUp">
    <div class="inner">
        <div class="popup-con3 con-height4">
            <span id="js-cogradient" class="cogradient" rel="nofollow">同步到云端</span> 
            <p class="pop-tit">收藏车辆</p>
            <a class="ico_pop xBtn2 closeJs">关闭</a>
            <div class="slidePic" id="storeCarWrap">
                <!--a id="service_fav_btn" href="/i/favorite/" class="ico_pop ratioBtn" rel="nofollow">我的收藏</a-->
            </div>
        </div>
    </div>
</div>
<!--收藏车辆结束-->
<!--浏览记录开始-->
<div class="popup-wrap" id="lookFor">
    <div class="inner">
        <div class="popup-con3 con-height4">
            <p class="pop-tit">浏览记录</p>
            <a class="ico_pop xBtn2 closeJs">关闭</a>
            <div class="slidePic" id="focusPageWrap"></div>
        </div>
    </div>
</div>
<!--浏览记录结束-->
<script>
    (function (window , jsvar) {
        jsvar.page_now = 'buy',
        jsvar.is_init = '',
        jsvar.follow_see_car = '1';
		jsvar.seo_right_btn_show = ""; //seo设置不显示对比  设置此值则不显示
    })(window,  (window.jsvar = window.jsvar || {}));
</script>
<script type="text/javascript">  
    $(function(){
        //列表页 返回 2 或者 3 详情页 4
        var page_type =  (jsvar.page_now == "") ? 4 : (jsvar.page_now == 'buy') ? 2 : 3;
        //调用侧边栏(是否带看车，显示免费咨询电话 1 显示 其他不显示)
        new UXSide(jsvar.follow_see_car, page_type);
        $(".srv_app .app_pop").click(function(e) {
            e.stopPropagation();
        });
		if (jsvar.seo_right_btn_show) //seo设置不显示对比  设置此值则不显示
		{
			$(".mask-slide .side-li").eq(0).hide();
			$(".mask-slide .side-li").eq(1).hide();
			$(".mask-slide .side-li").eq(2).hide();
		}
		
        var current_carid = jsvar.carid || ''
        _init_carcheck();
        
        //浏览记录弹出js
        //$("#browse").click(function(){
        $('body').find('.side-li').eq(2).click(function(){
            browser_history(0);uxl_track('w_border/browse/page/' + page_type);
            _hmt.push(['_trackEvent', 'RightInterest', 'RI_browse'] );
        });

        //收藏车辆弹出js
        //$("#store").click(function(){
        $('body').find('.side-li').eq(1).click(function(){
            compare_favorite(0);

            uxl_track('w_border/collect/page/' + page_type);
            _hmt.push(['_trackEvent', 'RightInterest', 'RI_follow'] );
        });

        //添加-取消收藏-事件绑定
        $("body,.popup-wrap,.collect-wrap,.main").on("click","a[name='carFavorite']", function(event) {
            /*if(!TOP_INFO.user.mobile){
                $(".closeJs").click();
                $('#popupLogin .PageNum').eq(0).html('<img src="/register/get_vcode/" id="vcodeimg_l"/>');
                $('#vcodeimg_l').bind('click', function () {
                    flush_vcode('#vcodeimg_l');
                });
                show_popup("#popupLogin","#popupLogin .closeJs");
            } else{
                var that = $(this);
                var css = $(this).data('css') || 'active' ;
                if(css == 'active-new'){
                    css = 'active';
                }
                var reload = $(this).data('reload') || 0 ;
                if(!$(this).hasClass(css) && !reload ){
                    add_favorite($(this));
                } else {
                    del_favorite($(this));
                }
            }*/
            var that = $(this);
            var css = $(this).data('css') || 'active' ;
            if(css == 'active-new'){
                css = 'active';
            }
            var reload = $(this).data('reload') || 0 ;
            if(!$(this).hasClass(css) && !reload ){
                add_favorite($(this),'',event);
            } else {
                del_favorite($(this))
            }
            event.stopPropagation();
        });
        /**
         * 对比车辆弹出js
         */
        // $("#comparecar").click(function(){
        $('body').find('.side-li').eq(0).click(function(){
            $('#compareC').hide();
            uxl_track('w_border/compare/page/' + page_type);
            $.post("/compare_detail/get_pop/",function(data){
                // $('#compareC').hide();
                data = $.parseJSON(data);
                if(data.code==1 && data.data){
                    $("#clear_all_compare").html(data.data);
                    get_ahref("#compareC");
                    //重新计算对比个数
                    $("#service i").text($("#clear_all_compare div[data-carid]").length);
                    if(data.filter){
                        $.cookie('XIN_CARCHECK_IDS', data.filter , { path: '/', domain: 'xin.com', expires: 24*60*60 });
                    }
                    var ids = $.cookie('XIN_CARCHECK_IDS');
                    var cid = ids.split(',');
                    var idnum = cid.length;
                    var cartype='';
                    if(idnum==1){
                        cartype = cid[0];
                    }else if(idnum==2){
                        if(cid[0]>cid[1]){
                            cartype = cid[1]+'_'+cid[0];
                        }
                    }else{
                        for(var i=0;i<3;i++){
                            for(var g=2;g>0;g--){
                                var tmp = cid[g-1];
                                if(cid[g]<cid[g-1]){
                                    cid[g-1] = cid[g];
                                    cid[g] = tmp;
                                }
                            }
                        }
                        cartype = cid.join('_');
                    }
                    _hmt.push(['_trackEvent', 'CarInterest', 'CI_DoCompare', 'DC_'+cartype]);
                    _hmt.push(['_trackEvent', 'RightInterest', 'RI_compare']);
                    show_popup("#compareC","#compareC .closeJs");
                }else{
                    $.cookie('XIN_CARCHECK_IDS', null , { path: '/', domain: 'xin.com'});
                    $("#service i").text(0);
                    $(":checkbox[name='carCheck']").next().removeClass("ui-state-active");
                    show_tip('主人，您暂时还没有对比过的车呢');
                }
            });
        });

        //判断 返回顶部是否展示
        $(window).scroll(function(){
            if ($(window).scrollTop() > 0) {
                $('body').find('.mask-slide').find('.side-top').show();
                $('body').find('.mask-slide').find('.side-popup').hide();
            } else {
                $('body').find('.side-top').hide();
            }
        });

        <!--开通带看车功能对应城市--车辆列表页添加免费电话功能 start-->
        if(jsvar.follow_see_car) {
            $('body').on('focus','.side-ipt', function(){
                    var val = $(this).val();
                    if (val == '请输入电话号码'){
                        $(this).val('');
                    }
            });

            $('body').on('blur','.side-ipt', function(){
                var val = $.trim($(this).val());
                if (val == ''){
                    $(this).val('请输入电话号码');
                }
            });

            $('body').on('focus','.code-ipt', function(){
                var val = $(this).val();
                if (val == '请输入图片码'){
                    $(this).val('');
                }
            });

            $('body').on('blur','.code-ipt', function(){
                var val = $.trim($(this).val());
                if (val == ''){
                    $(this).val('请输入图片码');
                }
            });

            $('body').find('.mask-slide').find('.code-pic').on('click',function(){
                $(this).attr('src', '/car/get_vcode/?v='+Math.random());
            });
            cfc_flush_vcode();
            $('body').find('.side-ipt').bind('keyup', function () {
                checkNun();
                //is_valid_phone('call');
                if ($(this).val().length > 11) {
                    return false;
                }
                }).bind('click', function () {
                    cfc_clear_msg();                  
                }).bind('keypress', function (e) {
                //checkNun();
                if ($(this).val().length > 11) {
                    return false;
                }
            });


            $('body').on('click', '.phone-btn', function () {
                if (is_valid_phone('call') === true) {
                    var vcode = $.trim($('body').find('.mask-slide').find('.code-ipt').val());
                    if (vcode.length == 0) {
                        cfc_show_msg('请输入图片验证码');
                       // $('#vcodeimg_freecall').show();
                        //$('.box1').show();
                        return false;
                    }
                    var tmp_m = $.trim($('body').find('.mask-slide').find('.side-ipt').val());
                    if (tmp_m.length > 0) {
                        uxl_track('w_carlist/tel_free/tel_free_confirm/' + tmp_m);
                        $.post('/search/carlist_free_call/', {
                            'client_phone': tmp_m,
                            'vcode': vcode,
                            'client_type': 10,
                            type: 'ajax',
                            ab: '1'
                        }, function (data) {
                            var data = JSON.parse(data);
                            if (data.code == 1) {
                                $('body').find('.mask-slide').find('code').hide();
                                $('body').find('.mask-slide').find('.fail').hide();
                                $('body').find('.mask-slide').find('.success').show();
                            } else {
                                $('body').find('.mask-slide').find('.fail').html(data.message).show();
                                $('body').find('.mask-slide').find('.success').hide();
                            }
                            cfc_flush_vcode();
                            $('body').find('.mask-slide').find('.code-ipt').val('请输入图片码');
                        });
                    }
                }
            });

            $('.call-pop .hide').on('click', function () {
                $('.call-pop').hide();
                $('.call-fixed').show();
            });

            $('.img-code').on('click', function () {
                cfc_clear_msg();
            });

            $('.call-pop .box1').on('click', '#vcodeimg_freecall', function () {
                cfc_flush_vcode();
            });

            function is_valid_phone(el_class) {
                
                var reg = /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/g;
                
                var tmp_m = $.trim($('body').find('.side-ipt').val());
                if (tmp_m == '' || !reg.test(tmp_m)) {
                    if (el_class == 'call') {
                        cfc_show_msg('请输入正确的手机号');
                    }
                    // $('.box1').hide();
                    return false;
                }
                cfc_clear_msg();
               //$('body').find('.fail').show();
                $('body').find('.mask-slide').find('code').show();

                //$('.box1').find('.code').html('<img src="/car/get_vcode/" id="vcodeimg_freecall" />');
                return true;
            }

            function cfc_show_msg(msg) {
                msg = $.trim(msg);
                if (msg.length > 0) {
                    $('.call-pop img').css('display', 'none');
                    $('.success').css('display', 'none');
                    $('.fail').css('display', 'block');
                    $('.fail').html(msg);
                   // $('.box1').hide();
                    $('#vcodeimg_freecall').hide();
                }
            }

            function cfc_clear_msg() {
                $('.fail').html('').hide();
                $('.succeed').hide();
            }

            function cfc_flush_vcode() {
                 $('body').find('.mask-slide').find('.code-pic').attr('src', '/car/get_vcode/?v='+Math.random());
            }

            function checkNun() {
                
                var reg = /^0?1[3|5|7|8][0-9]\d{8}$/;
                
                var tar_ipt = $('body').find(".side-ipt");
                if ((tar_ipt.val().length) > 11) {
                    var val =tar_ipt.val().substr(0, 11);
                    tar_ipt.val(val);
                }
                if (reg.test(tar_ipt.val())) {
                    //$(".call-pop .box1").show();
                    $('body').find('.mask-slide').find('.code').show();
                    //$('body').find('.mask-slide').find('.code').find('img').attr('src', '/car/get_vcode/');
                    return true;
                } else {
                   // $(".call-pop .box1").hide();
                    $('body').find('.mask-slide').find('.code').hide();
                    $('body').find('.mask-slide').find('.code').find('.code-ipt').val('请输入图片码');
                    return false;
                };
            }
        }
        <!--开通带看车功能对应城市--车辆列表页添加免费电话功能 ends-->

        /**
         * 加入对比-事件绑定
         */
        $("body,.popup-wrap").on("click","label[for='carCheck']", function(event) {
            var prev = $(this).prev();
            var cid = prev.val();
            if(!$(this).hasClass('ui-state-active')){
                if (add_comp_item(event,cid)){
                    $(this).addClass("ui-state-active");
                }
                if($(".cd_m_info_db").length){
                    var $ele=$(".cd_m_info_db").prev();
                    var  $cur_cid=$ele.val();
                    if($cur_cid == cid ){
                      $(".cd_m_info_db").addClass("active").html("<i></i>取消对比")  
                    }                   
                }
            } else{
                cancel_comp_item(event,cid);
                $(this).removeClass("ui-state-active");
            }
        });

        // 新详情页对比按钮
        $("body,.popup-wrap").on("click",".cd_m_info_db,.cd_m_pop_pzcs_addcompare", function(event) {
            var prev = $(this).prev();
            var cid = prev.val();
            var ids = $.cookie('XIN_CARCHECK_IDS');
            if(ids){
              ids = ids.split(',');  
            }

            if($.inArray(cid,ids) !=-1 ){
                cancel_comp_item(event,cid);
                if(current_carid==cid){
                    $('.cd_m_info_db').removeClass("active");
                    $('.cd_m_info_db').html('<i></i>加入对比');
                    $('.cd_m_pop_pzcs_addcompare').html('加入对比');
                    $("body label[for='carCheck']").removeClass("ui-state-active");

                }
            }else{
               add_comp_item(event,cid);
               if(ids.length>=3){
                    return false;
               }
               if(current_carid==cid){
                    $('.cd_m_info_db').addClass("active");
                    $('.cd_m_info_db').html('<i></i>取消对比');
                    $('.cd_m_pop_pzcs_addcompare').html('取消对比');
                    $("body label[for='carCheck']").addClass("ui-state-active");
                } 
            }
        });

        // 页面滚动到顶部
        $('body').on('click', '.side-top', function() {
            $("html, body").animate({ scrollTop: 0 }, 200);
            uxl_track('w_border/totop/page/'+page_type);
        });

        // C-车辆详情页-在线聊天
        if ($('#onlinechat').length > 0) {
            $('#onlinechat').attr('uxevent', 'w_vehicle_details/IM/' + jsvar.carid);
        }
        // C-车辆详情页-QQ聊天
        if ($('#php_conslut_dealer').length > 0) {
            $('#php_conslut_dealer').attr('uxevent', 'w_vehicle_details/QQ/' + jsvar.carid);
        }

        // 举报开始：
        $('.cd_m_cyyw>a').click(function()
        {
            var up = new UXPopup({
                contentId:'.cd_m_pop_cyyw',
                closeId:'.cd_m_pop_cyyw .cd_m_pop_close',
                beforeShow:function()
                {
                    var resizeTimer;
                    $(window).bind('resize',function(){
                        if (resizeTimer) clearTimeout(resizeTimer);
                        resizeTimer = setTimeout(function(){ up._showContent(); }, 500);
                    });
                    window.UX.scroll.pause();
                    $('.cd_m_pop_cyyw input[type=text],.cd_m_pop_cyyw textarea').val('').trigger('blur');
                    $('.cd_m_pop_cyyw input[type=radio][value=1]').attr('checked','checked');
                    //TODO:在此更换验证码
                    flush_vcode('.flush_vcode',TOP_INFO.domain_url);
                },
                beforeHide:function()
                {
                    $(window).unbind('resize');
                    window.UX.scroll.run();
                }
            });
            var $codeImg = $(up.content).find('img.flush_vcode'),
                sImgSrc = $codeImg.attr('data-src');
            if(sImgSrc){
                $codeImg.attr('src',sImgSrc+'?_='+(new Date().getTime())).removeAttr('data-src');
            }
            up.show();
            $('.cd_m_pop_cyyw_content .flush_vcode').unbind('click').click(function(){
                flush_vcode('.flush_vcode',TOP_INFO.domain_url);
            });
        });
        //输入框获取焦点
        $('.cd_m_pop_cyyw_input>span,.cd_m_pop_cyyw_textarea>span').click(function()
        {
            $(this).hide();
            $(this).prev().show().focus();
        });
        //提示框显示
        $('.cd_m_pop_cyyw_input input').focus(function()
        {
            $(this).parent().next().removeAttr('style');
        }).blur(function(){
            var val = $.trim($(this).val());
            if(val.length <= 0)
            {
                $(this).hide();
                $(this).next().show();
            }
        });

        //确定按钮事件
        $('.cd_m_pop_cyyw_ok').click(function()
        {
            var reson = $('input:checked').val();
            if(reson == undefined){
                $('#txtCyywReason').next().css({ 'visibility':'visible'});
                return ;
            } else {
                $('#txtCyywReason').next().css({ 'visibility':'hidden'});
            }

            var phone = $.trim($('#txtCyywPhone').val());
            if(!phone)
            {
                $('#txtCyywPhone').parent().next().text('请输入手机号').css( { 'visibility':'visible' } );
                return;
            }
            
            var reg = /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/g;
            
            if(!reg.test(phone))
            {
                $('#txtCyywPhone').parent().next().text('手机号格式不正确').css( { 'visibility':'visible' });
                return;
            }

            var vcode = $.trim($('#txtCyywValid').val());
            if(!vcode) {
                $('#txtCyywValid').parent().next().css( { 'visibility':'visible' } );
                return;
            } else {
                $('#txtCyywValid').parent().next().css( { 'visibility':'hidden' } );
            }

            var carid = $("#carid").val();
            var sn = $("#sn").val();
            var message = $("#suptare").val();

            $.post('/car_report/report_car/',{ carid: carid, sn: sn, phone: phone, reson: reson, pcode: vcode, message: message},function(data){
                if (data == -1){
                    $("#suptare").attr('readonly',false);
                    $('.cd_m_pop_cyyw .cd_m_pop_close').trigger('click');
                    $('.cd_m_cyyw>a').unbind('click').click(function(){
                        show_tip("您已经举报过此车，我们会尽快处理，请稍候");
                    });
                    show_tip("您已经举报过此车，我们会尽快处理，请稍候");
                }else if (data == 1){
                    $("#suptare").attr('readonly',false);
                    $('.cd_m_pop_cyyw .cd_m_pop_close').trigger('click');
                    $('.cd_m_cyyw>a').unbind('click').click(function(){
                        show_tip("您已经举报过此车，我们会尽快处理，请稍候");
                    });

                    show_tip("主人，已经提交成功啦");
                }else if (data == -2){
                    $("#suptare").attr('readonly',false);
                    flush_vcode('.flush_vcode', jsvar.dict_domain_xin);
                    $('#txtCyywValid').parent().next().css( { 'visibility':'visible' } );
                    return;
                }
            });
        });
        $('.cd_m_pop_cyyw_textarea>textarea').blur(function()
        {
            var val = $.trim($(this).val());
            if(val.length <= 0)
            {
                $(this).val('').hide().next().show();
            }
        });
        // 举报 结束

    });

    // 添加数组对象的方法。
    if (typeof Array.prototype.indexOf == 'undefined'){
        Array.prototype.indexOf = function(e){
            for (var i = 0; i < this.length; i ++){
                if (this[i] == e){
                    return i;
                }
            }
            return -1;
        }
    }

    // 开始对比(页面中调用)
    function start_compare() {
        uxl_track('w_compare_start');
        var ids = $.cookie('XIN_CARCHECK_IDS') || '';
        if(ids == '' || ids.split(',').length < 2){
            $(".closeJs").click();
            var msg = '请您至少选择两辆车，最多选择三辆车进行对比';
            show_tip(msg);
            return false;
        }
        var ids = $.cookie('XIN_CARCHECK_IDS');
        $.post("/i/compare/add_compare/", { ids : ids });
        $(".closeJs").click();
        ids = ids.replace(/,/g,'_');
        window.open(UrlTool.fixHref('/c/compare_' + ids + '.html'));
        return false;
    }
    /*Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };*/
    function  remove_item(arr,val){
       var index = arr.indexOf(val);
        if (index > -1) {
            arr.splice(index, 1);
        } 
    }
    /**
     * 添加收藏操作
     * @param Array obj [description]
     * @param Array f   [description]
     */
    
    function add_favorite(obj,f,event){
        var obj = $(obj);
        var carid = obj.data('carid') || 0;
        var f = f || function(data){
                    if (data && data != 1){ return false; }
                     var page_type =  (jsvar.page_now == "") ? 4 : (jsvar.page_now == 'buy') ? 2 : 3; // 2,3 列表页  4 详情页
                    $("a[name='carFavorite'][data-carid='"+carid+"']").each(function(i,item){
                      
                        var css = $(item).data('css') || 'active' ;
                         if (page_type == 4 && $('.five-button').length <= 0){
                             // 新详情页
                             var text = css == 'click' ? '<i class="icon xin"></i>已收藏' : '<i class="icon xin"></i>取消收藏';
                             $(item).addClass(css).html(text).addClass('cd_m_select');
                         } else {
                             // 列表页，老板详情页
                             var text = css == 'click' ? '已收藏' :(css == 'active-new' ? '' : '取消收藏');
                             if(css == 'active-new'){
                                 css = 'active';
                             }
                             $(item).addClass(css).text(text);
                         }
                    });
                }
        var  d = $(".side-pop").offset().top,
             b = $(".side-pop").offset().left;        
        add_animate(event,d,b);
        var    favorite_arr=[];       
        if(!TOP_INFO.user.mobile){
            f();
            if($.cookie('favorite_arr')){
                favorite_arr=$.cookie('favorite_arr').split(',');
                if(favorite_arr.indexOf(carid+'') == -1 ){
                    if(favorite_arr.length>=100){
                        favorite_arr.shift();
                    }
                favorite_arr.unshift(carid+''); 
                $.cookie("favorite_arr",favorite_arr.join(','),{  path:'/',domain: '.xin.com' });                           
                }
            }else{
              favorite_arr.push(carid+'');
              $.cookie("favorite_arr",favorite_arr.join(','),{  path:'/',domain: '.xin.com' }); 
            }           
        }else{
            $.post("/i/favorite/add_favorite/", { carid : carid }, function(data){
                f(data);
            }) 
        }
        $(".circ-icon").show() ; 
    }
    /**
     * 取消收藏操作
     * @param  Array obj [description]
     * @param  Array f   [description]
     * @return Array     [description]
     */
    function del_favorite(obj,f){
        var f = f || function(obj,data){
            if( data && data != 1){ return false;}
            var obj = $(obj);
            var carid = obj.data('carid') || 0;
            var reload = obj.data('reload') || 0 ;
            var page = obj.data("page") || 0;
            if(reload){
                window.location.reload();
                return ;
            }else if(page){
                get_favorite_data(page,function(data){
                    if(data.code==1 && data.data){
                        $("#storeCarWrap").html(data.data);
                    }else{
                        $(".circ-icon").hide() ;
                        //$('.closeJs').click();
                        $('#warmTip10 .closeJs,#stroeUp .closeJs').click();
                    }
                    var page_type =  (jsvar.page_now == "") ? 4 : (jsvar.page_now == 'buy') ? 2 : 3; // 2,3 列表页  4 详情页
                    $("a[name='carFavorite'][data-carid='"+carid+"']").each(function(i,item){
                        var css = $(item).data('css') || 'active' ;
                        if (page_type == 4 && $('.five-button').length <= 0){
                            var text = css == 'click' ? '<i class="icon xin"></i>收藏车源' : '<i class="icon xin"></i>加入收藏';
                            if($(this).children("div").length<=0){
                                $(item).removeClass(css).html(text).removeClass('cd_m_select');  
                            }                           
                        } else {
                            var text = css == 'click' ? '收藏' : (css == 'active-new' ? '' : '加入收藏');
                            if(css == 'active-new'){
                                css = 'active';
                            }
                            $(item).removeClass(css).text(text);
                        }
                    });
                });
                return;
            }else{
                var page_type =  (jsvar.page_now == "") ? 4 : (jsvar.page_now == 'buy') ? 2 : 3; // 2,3 列表页  4 详情页
                $("a[name='carFavorite'][data-carid='"+carid+"']").each(function(i,item){
                    var css = $(item).data('css') || 'active' ;
                    if (page_type == 4 && $('.five-button').length <= 0){
                        var text = css == 'click' ? '<i class="icon xin"></i>收藏车源' : '<i class="icon xin"></i>加入收藏';
                        $(item).removeClass(css).html(text).removeClass('cd_m_select');
                    } else {
                        var text = css == 'click' ? '收藏' : (css == 'active-new' ? '' : '加入收藏');
                        if(css == 'active-new'){
                            css = 'active';
                        }
                        $(item).removeClass(css).text(text);
                    }
                });
            }
        }
         var carid = obj.data('carid') || 0;
         if(!TOP_INFO.user.mobile){
            f(obj);
            if($.cookie('favorite_arr')){
                var favorite_arr=$.cookie('favorite_arr').split(',');
                //favorite_arr.remove(carid+''); 
                remove_item(favorite_arr,carid+'')    
                 $.cookie("favorite_arr",favorite_arr.join(','),{  path:'/',domain: '.xin.com' });
                if(!$("#stroeUp").is(":hidden")){
                    $("a[name='carFavorite'][data-carid='"+carid+"']").parents(".pop_list").remove();
                    var  arr_after=favorite_arr;
                    var  curPage=$(".asyc-page .page-current").data("page");
                    arr_after.join(',');
                    get_favorite_data("","", arr_after.join(','),curPage);
                }
                if(favorite_arr.length<1){
                    $(".circ-icon").hide();
                    if(!$("#stroeUp").is(":hidden")){
                       $('#warmTip10 .closeJs,#stroeUp .closeJs').click(); 
                    }     
                }
            }else{
              $(".circ-icon").hide()
              //favorite_arr.push(carid);
              //$.cookie("favorite_arr",favorite_arr.join(','),{  path:'/',domain: '.xin.com' }); 
            }          
        }else{
            $.post("/i/favorite/del_favorite/", { carid : carid }, function(data){
                f(obj,data)
            });
            if($.cookie('favorite_arr')){
                 var favorite_arr=$.cookie('favorite_arr').split(',');
                 if(favorite_arr.indexOf(carid+'') !=-1 ){
                    //favorite_arr.remove(carid+'');
                    remove_item(favorite_arr,carid+'')              
                     $.cookie("favorite_arr",favorite_arr.join(','),{  path:'/',domain: '.xin.com' }); 
                 }
                
            }

        } 
        /*$.post("/i/favorite/del_favorite/", { carid : carid }, function(data){
            f(obj,data)
        })*/
    }
    /**
     * 对比提示数字变更
     * @param  Array num [description]
     * @return Array     [description]
     */
    function service_i_change(num){
        var num = Number(num);
        if(num <= 0 ){
            if($("#compareC").css('display') !== "none"){
                $("#compareC .closeJs").click();
            }
            $('i.side-num').text('').hide();
        }else{
            $('i.side-num').text(num).show();
        }
    }
    
    /**
     * 查看收藏列表
     * @param  Array page    收藏列表页码
     * @param  Array hidebtn 是否隐藏“我的收藏”按钮 默认显示
     * @return Array         [description]
     */
    function compare_favorite(page,hidebtn){
        
       // $('#stroeUp').hide();
        var hidebtn = hidebtn || false;
        /*if(!TOP_INFO.user.mobile){
            $('#stroeUp').hide();
            $('#popupLogin .PageNum').eq(0).html('<img src="/register/get_vcode/" id="vcodeimg_l"/>');
            $('#vcodeimg_l').bind('click', function () {
                flush_vcode('#vcodeimg_l');
            });
            show_popup("#popupLogin","#popupLogin .closeJs");
        } else{
            get_favorite_data(page);
            if(!page && hidebtn){
                $("#service_fav_btn").hide();
            }else if(!page){
                $("#service_fav_btn").show();
            }
        }*/
        get_favorite_data(page);
       
        /*if(!page && hidebtn){
            $("#service_fav_btn").hide();
        }else if(!page){
            $("#service_fav_btn").show();
        }*/
    }
    /**
     * 获取收藏数据并绑定处理函数
     * @param  Array page 页码
     * @param  Array f    处理函数
     * @return Array      [description]
     */
    var  data_count=[];
    function get_favorite_data(page, f,carids,curPage) {
        var  curPage=curPage,arr=[];
        var f = f || function(data){
            $("#storeCarWrap").html('');
            if (data.code==1 && data.data){
                $("#storeCarWrap").html(data.data);
                get_ahref('#storeCarWrap');
                $("#service_fav_btn").hide();
                show_popup("#stroeUp","#stroeUp .closeJs");
            } else {
                show_tip('主人，您暂时还没有收藏过的车呢');
            }
        };
       /* var url = "/i/favorite/get_favorite/" + page+"/";
        $.post(url, { channel: UrlTool.getUrlParam('channel') }, function(data) {
            data = $.parseJSON(data);
            f(data);
        });*/
        var url = "/i/favorite/get_favorite/" + page+"/";
        if(!TOP_INFO.user.mobile){
           if($.cookie("favorite_arr")){
                $.get('/apis_ajax/collect_car', { carids: carids||$.cookie("favorite_arr"),cityid:TOP_INFO.location.cityid}, function(data) { 
                   if(data.code==1){
                        $("#storeCarWrap").html("")
                        $("#storeCarWrap").html('<div class="pop_item clearfix" id="storeCar"></div><div class="con-page top-page fr asyc-page"></div>');
                        data_count=data.data;
                       if(curPage){
                          if(curPage<=Math.ceil(data.data.length/3)){
                                curPage=curPage;
                                arr=data.data.slice(curPage*3-3,curPage*3+1)
                           }else{
                                curPage=Math.ceil(data.data.length/3)
                                arr=data.data.slice(curPage*3-3,curPage*3+1);
                           }
                       }else{
                            arr=data.data.slice(0, 3); 
                       }
                       get_page_data(arr);
                       page_rule(data.data,curPage||1);
                       show_popup("#stroeUp","#stroeUp .closeJs");
                   }
                });
            }else{
                if( !$("#stroeUp").is(":hidden")){
                    $(".circ-icon").hide() ;
                    //$('.closeJs').click();
                    $('#warmTip10 .closeJs,#stroeUp .closeJs').click();
                }else{
                    show_tip('主人，您暂时还没有收藏过的车呢');  
                }               
            }  
        }else{
            $("#js-cogradient").hide();
            $.post(url, function(data) {               
                data = $.parseJSON(data);
                f(data);
            });
        }
    }
     //获取每一天的数据
     function  get_page_data(location_data){
        var list_arr =[];
        /*var  channel='';
        if(UrlTool.getUrlParam('channel')){
            channel='?channel='+UrlTool.getUrlParam('channel');
        }*/
        var ids = $.cookie('XIN_CARCHECK_IDS');
        if(ids){
            ids = ids.split(',');
        }       
        for(var index=0;index<location_data.length;index++){
            list_arr.push('<div class="pop_list list">');
            if(location_data[index].lefttop_label==3){
              list_arr.push('<span class="yc-icon"></span>');  
            }                
            list_arr.push('<a href="'+UrlTool.fixHref(location_data[index].detail_url)+'" class="carShow" target="_blank" deliver="1">');
            if(location_data[index].is_video==1 && parseInt(location_data[index].status)!==-1){
              list_arr.push('<span class="video"></span>');  
            }                
            list_arr.push('<img  src="'+location_data[index].pic+'"/>');
            if(location_data[index].status==-1){
                if (location_data[index].saling_status == 1) {
                    list_arr.push('<div class="tips-3 collect-ico abs">销售中</div>')
                } else {
                    list_arr.push('<div class="tips-2 collect-ico abs">已售</div>')
                }
            } else if (location_data[index].status==-2) {
                list_arr.push('<div class="tips-2 collect-ico abs">下架</div>')
            }
            list_arr.push("</a>");
            list_arr.push('<h3><a href="'+UrlTool.fixHref(location_data[index].detail_url)+'" title="'+location_data[index].carname+'" target="_blank">'+location_data[index].carname+'</a></h3>');

            /*list_arr.push('<span class="price">');
            if(location_data[index].mortgage == 1 && location_data[index].price>0 && parseInt(location_data[index].status)!==-1){
                list_arr.push('首付￥<em>'+location_data[index].price+'</em>万');
            }
            if(location_data[index].mortgage == -1 && location_data[index].panel_price>0 && parseInt(location_data[index].status)!==-1){
                list_arr.push('<em>'+location_data[index].panel_price+'</em>万');
            }
            list_arr.push("</span>"); 
            if(location_data[index].sku_price > 0 && parseInt(location_data[index].status)!==-1){
                list_arr.push('<span class="first-pay"> 首付'+location_data[index].sku_price+'万</span>');   
            }
            if(location_data[index].panel_price>0 && location_data[index].mortgage == 1 && parseInt(location_data[index].status)!==-1){
            list_arr.push('<span class="allpay"> 全款'+location_data[index].panel_price+'万</span>');
            } */    
            if(location_data[index].car_price > 0 ){
                list_arr.push('<span class="price"><em>'+location_data[index].car_price+'</em>万</span>');
            } 
            if(location_data[index].car_show_price > 0 && parseInt(location_data[index].status) == 1){
                list_arr.push('<span class="first-pay"> 首付'+location_data[index].car_show_price+'万</span>');   
            }   
            list_arr.push('<div class="compar">');
            list_arr.push('<div class="car-checkbox fr">')
            list_arr.push('<input type="checkbox" name="carCheck" class="hidden-access" value="'+location_data[index].carid+'">')
            if($.inArray(location_data[index].carid,ids) !=-1){
                list_arr.push('<label for="carCheck" class="state-default collect-ico ui-state-active">')
            }else{
                list_arr.push('<label for="carCheck" class="state-default collect-ico">')   
            } 
            list_arr.push('<span class="button-text">加入对比</span></label>')         
            list_arr.push('</div>')
            list_arr.push('<span class="s-icon house"><a name="carFavorite" data-css="active"  class="s-icon star active " data-carid="'+location_data[index].carid+'" >取消收藏</a></span>')
            list_arr.push('</div></div>')
        }
        
        $("#storeCarWrap").find("#storeCar").html("");
        $("#storeCarWrap").find("#storeCar").html(list_arr.join(""));           
     }
    //如果已经点击了收藏让红星选中
    if($.cookie("favorite_arr")){
        var  arr=$.cookie("favorite_arr").split(',');
        var  ele_arr=$('body .list-con').find("li");
        if(ele_arr.length>0){
           ele_arr.each(function(index,ele){
               if(arr.indexOf($(this).data("carid")+'')!=-1){
                    $(this).find(".s-icon").addClass("active");
               }
            }); 
        }       
        var  detail_ele= $('.cd_m_info,.cd_m_nav').find("a[name='carFavorite']");
        if(detail_ele.length>0){
            if(arr.indexOf(detail_ele.data("carid")+'') > -1){
                detail_ele.addClass("click cd_m_select");  
                detail_ele.html("<i  class='icon xin'></i>已收藏")
            }  
        }      
    }
    /**
     * 添加对比动画add_animate
     * @param Array a [description]
     * @param Array d [description] d,b动画最后停在的位置
     * @param Array b [description]
     */
    function add_animate(a,d,b) {
        var c = document.body.scrollTop || document.documentElement.scrollTop,
                f = a.pageX ? a.pageX : a.clientX,
                g = a.pageY ? a.pageY : a.clientY + c,
                e = '<img src="'+jsvar.XIN_STATIC_DOMAIN_F+'/xin/images/common/logo-y.png"  id="divComparaImg" style="z-index:100000;position: absolute;top:' + g + "px;left:" + f + 'px" /> ';
                //d = $(".side").offset().top,
               // b = $(".side").offset().left;
        if ($("#divComparaImg").is(":animated")){
            $("#divComparaImg").hide();
        } else {
            $("body").append(e);
            $("#divComparaImg").animate({
                width: "30px",
                height: "30px",
                top: d,
                left: b
            }, 800, function() {
                $(this).remove();
            })
        }
    }
    /**
     * 添加对比
     * @param Array event [description]
     * @param Array id    [description]
     */
    function add_comp_item(event,id){
        var ids = $.cookie('XIN_CARCHECK_IDS') || '';
        var size = 0;
        if(ids == ''){
            ids = id;
            size = 1;
        }else{
            ids = ids.split(',');
            var not_add_animate = 0;
            if($.inArray(id,ids)!==-1){
                show_tip('主人，此车已在对比项中');
                not_add_animate = 1;
            }else if(ids.length>=3){
                show_tip('主人，最多只能添加三个比对项哦');
                not_add_animate = 1;
            }else {
                ids.push(id);
            }
            size = ids.length;
        }
        service_i_change(size);
        if (not_add_animate > 0){
            return false;
        }
        var  d = $(".side").offset().top,
             b = $(".side").offset().left;
        add_animate(event,d,b);
        $.cookie('XIN_CARCHECK_IDS', ids.toString() , { path: '/', domain: 'xin.com' ,expires: 24*60*60 });
        return true;
    }

    //取消对比，清空所有对比之后页面对比模块样式回到未对比的样式
    function claer_db(carid){
        if(carid == jsvar.carid){
            $('.cd_m_info_db').removeClass('active').html('<i></i>加入对比');
        }
    }

    /**
     * 取消对比
     * @param  Array event [description]
     * @param  Array carid [description]
     * @return Array       [description]
     */
    function cancel_comp_item(event,carid){
        var prop;
        var ids = $.cookie('XIN_CARCHECK_IDS');
        ids = ids.split(',');
        var index = $("#div_comp_"+carid).data('index');
        var content = '<a style="cursor:default" class="carShow">';
        content += '<img src="'+jsvar.XIN_STATIC_DOMAIN_F+'/xin/images/popup/car'+index+'.jpg" /></a>'
        content += '<div class="addCar">您可以添加对比车辆</div>';

        $("#div_comp_"+carid).removeAttr('data-carid').removeAttr('id').html(content);
        var pos = ids.indexOf(carid);
        ids.splice(pos,1);
        ids = ids.join(',');
        $.cookie('XIN_CARCHECK_IDS', ids , { path: '/', domain: 'xin.com', expires: 24*60*60 });
        $(":checkbox[name='carCheck'][value='"+carid+"']").next().removeClass("ui-state-active");
        var count = Number($('i.side-num').html());
        count = count-1 >= 0 ? count -1 : 0 ;
        service_i_change(count);
        claer_db(carid);
    }

    /**
     * 清空对比（页面调用）
     * @param  Array event [description]
     * @return Array       [description]
     */
    function clear_all_comp(event){
        var ids = $.cookie('XIN_CARCHECK_IDS');
        ids = ids.split(',');
        $.each(ids,function(i,item){
            cancel_comp_item(event,item);
        });
        claer_db(true);
    }
    /**
     * 浏览历史列表
     * @param  Array page [description]
     * @return Array      [description]
     */
    function browser_history(page){
        //$('#lookFor').hide()
        var url = "/compare_detail/get_browser/" + page+"/";
        $.post(url, function(data){
            data = $.parseJSON(data);
            if(data.code==1 && data.data){
                $('#focusPageWrap').html(data.data);
                get_ahref('#focusPageWrap');
                var  browser_ele= $('#focusPageWrap').find("a[name='carFavorite']");
                if($.cookie('favorite_arr')){
                    var favorite_arr=$.cookie('favorite_arr').split(',');                
                    browser_ele.each(function(index,ele){
                       if(favorite_arr.indexOf($(this).data("carid")+'')!=-1){
                            $(this).addClass("active");
                            $(this).html('取消收藏');
                       }
                    });                                      
                }               
                show_popup("#lookFor","#lookFor .closeJs");
            }else{
                show_tip('主人，您暂时还没有浏览过的车呢');
            }
        });
    }
    /**
     *   同时打开多个详情页面，保持对比车辆的信息同步
     *   @param  { function } fn  - 回调函数
    */
    function addCompareOnChange(fn){
        var falg = 0;
        if (document.addEventListener) {
            if ('hidden' in document) {
                document.addEventListener("visibilitychange", function() {
                    if (document.visibilityState == 'visible') {
                        fn && fn();
                    }
                });
            }else{
                document.addEventListener('focusin',function(){
                    fn  && fn();
                })
            }
        } else if (window.attachEvent) {
            window.attachEvent('onfocus', _focushanlder, false);
            window.attachEvent('onblur', _blurhanler, false);
        }
        function _focushanlder() {
            fn && fn();
        }
        function _blurhanler() {
            falg = 0;
        }
    }

    addCompareOnChange(function(){
        var ids = $.cookie('XIN_CARCHECK_IDS');
        var compareCars = ids && ids.split(',');
        if(compareCars && compareCars.length){
            $('#service .s-icon').text(ids.split(',').length).show();
        }else{
            $('#service .s-icon').hide();
        }
    });

    /**
     * 初始化对比记录，并选中一对比项
     * @return Array [description]
     */
    function _init_carcheck(parent){
        var parent = parent || 'body';
        var ids = $.cookie('XIN_CARCHECK_IDS')||'';
        if(!ids){
            $('i.side-num').text('').hide();
            return true;
        }
        ids = ids.split(',');
        ids = $.unique(ids);
        service_i_change(ids.length);
        // 添加详情页兼容
        if($('.cd_m_info_db').length){
            // 新详情页
            var val = $('.cd_m_info_db').prev().val();
            if ($.inArray(val, ids) !=-1) {
                $('.cd_m_info_db').addClass('active');
                $('.cd_m_info_db').html("<i></i>取消对比")
                if ($('.cd_m_pop_pzcs_addcompare').length > 0){
                    $('.cd_m_pop_pzcs_addcompare').html('取消对比');
                }
            }
        } else if ($('.compare_click').length){
            // 老板详情页
            var val = $('.compare_click').prev().val();
            if ($.inArray(val, ids) !=-1) {
                $('.compare_click').addClass('ui-state-active');
            }
        }

        // 列表页
        $.each(ids,function(i,item){
            var check = $(parent+" :checkbox[name='carCheck'][value='"+item+"']");
            if(check.length>0){
                check.next().addClass("ui-state-active");
            }
        });

        return true;
    }
    
    function _init_carfavorite(parent){
    // 初始化并选中用户收藏车辆   此处一起兼容详情页,（update 2017-8-21 改版弃用）
        var parent = parent || 'body';
        var carFavoriteId = '';
        $(parent + " a[name='carFavorite']").each(function(i,item){
            carFavoriteId += $(this).data('carid') + ',';
        });
        if(carFavoriteId && Cookie.get('XIN_UID')){
            $.post('/ajax/favoriate_load/',{ id:carFavoriteId },function(data){
                if(data.car_show==1){
                    $('.circ-icon').show();
                }     
                if (data.data) {         
                    var page_type =  (jsvar.page_now == "") ? 4 : (jsvar.page_now == 'buy') ? 2 : 3;
                    $.each(data.data,function(i,item){
                        var obj = $(parent + " a[name='carFavorite'][data-carid='"+item+"']");
                        var css = obj.data('css') || 'active';
                        if (page_type == 4) {
                            // 详情页
                            if ($('.five-button').length > 0) { // 兼容老板详情页
                                var text = css == 'click' ? "已收藏" : "取消收藏";
                                obj.text(text).addClass(css);
                            } else {
                                var text = css == 'click cd_m_select' ? "<i class='icon xin'></i>收藏车源" : "<i class='icon xin'></i>已收藏";
                                obj.html(text).addClass(css).addClass('cd_m_select');
                            }
                            if (parent ==  'pop_item') {
                                // 详情页弹框
                                var text = css == 'click' ? '已收藏' :(css == 'active-new' ? '' : '取消收藏');
                                if(css == 'active-new'){
                                    css = 'active';
                                }
                                obj.text(text).addClass(css);
                            }
                        } else {
                            // 列表页
                            var text = css == 'click' ? '已收藏' :(css == 'active-new' ? '' : '取消收藏');
                            if(css == 'active-new'){
                                css = 'active';
                            }
                            obj.text(text).addClass(css);
                        }
                    });
                }
            });
        }
    } 
    _init_carfavorite(".carlist-show");

    //暴露详情页收藏车辆接口
    window.jsvar.init_carfavorite = function(){
        _init_carfavorite(".cd_m_nav");
    }
    
    /*
          
  
 //page分页规则计算
 function  page_rule(totalCount,currentPage){ 
    var ele= $("#storeCarWrap").find(".asyc-page");
    var showList=3;
    var totalPage=Math.ceil(totalCount.length/showList); //总页数
    var prePage = currentPage-1;
    var nextPage = currentPage+1;
    var appendStr ="";
    if(totalCount.length<=3){
        ele.hide();
    }
    if(currentPage!=1&&totalPage>1){
       appendStr+="<a href='javascript:void(0)'  data-page='"+prePage+"' page-rel='prepage'>上一页</a>";
    }
    //中间计算当前元素右边和左边分别最多3个元素所以以3为临界点
    if(totalPage<=4){
        for(var i=1;i<=totalPage;i++){
            if(i==currentPage){
              appendStr+='<span class="page-current" data-page="'+currentPage+'">'+currentPage+"</span>"
            }else{
              appendStr+= '<a  href="javascript:void(0)" data-page="'+i+'">'+i+"</a>" 
            } 
        }
    }else{
        if(currentPage<3){
            for(var i=1;i<=3;i++){
                if(i==currentPage){
                  appendStr+='<span class="page-current" data-page="'+currentPage+'">'+currentPage+"</span>"
                }else{
                  appendStr+= '<a  href="javascript:void(0)" data-page="'+i+'">'+i+"</a>" 
                }
            }
            appendStr+='<span>...</span><a  href="javascript:void(0)" data-page="'+totalPage+'">'+totalPage+"</a>"   
        }else if(currentPage==3){
            for(var i=1;i<=currentPage+1;i++){
                if(i==currentPage){
                  appendStr+='<span class="page-current" data-page="'+currentPage+'">'+currentPage+"</span>"
                }else{
                  appendStr+= '<a  href="javascript:void(0)" data-page="'+i+'">'+i+"</a>" 
                }
            }
            appendStr+='<span>...</span><a  href="javascript:void(0)" data-page="'+totalPage+'">'+totalPage+"</a>"  
        }else if(currentPage>3 && totalPage-currentPage>=3){
            appendStr+= '<a  href="javascript:void(0)" data-page="'+1+'">'+1+"</a><span>...</span>"  ;
            for(var i=currentPage-1;i<=currentPage+1;i++){
                if(i==currentPage){
                  appendStr+='<span class="page-current" data-page="'+currentPage+'">'+currentPage+"</span>"
                }else{
                  appendStr+= '<a  href="javascript:void(0)" data-page="'+i+'">'+i+"</a>" 
                }
            }
            appendStr+='<span>...</span><a  href="javascript:void(0)" data-page="'+totalPage+'">'+totalPage+"</a>";    
        }else if(currentPage>3 && totalPage-currentPage>=1 &&  (totalPage-currentPage<3||totalPage<=6) ){
            appendStr+= '<a  href="javascript:void(0)" data-page="'+1+'">'+1+"</a><span>...</span>"  ; 
            for(var i=currentPage-1;i<=totalPage;i++){
                if(i==currentPage){
                  appendStr+='<span class="page-current" data-page="'+currentPage+'">'+currentPage+"</span>"
                }else{
                  appendStr+= '<a  href="javascript:void(0)" data-page="'+i+'">'+i+"</a>" 
                }
            }         
        }else if(currentPage>3 && totalPage-currentPage<1 ){
            appendStr+= '<a  href="javascript:void(0)" data-page="'+1+'">'+1+"</a><span>...</span>"  ; 
            for(var i=currentPage-2;i<=totalPage;i++){
                if(i==currentPage){
                  appendStr+='<span class="page-current" data-page="'+currentPage+'">'+currentPage+"</span>"
                }else{
                  appendStr+= '<a  href="javascript:void(0)" data-page="'+i+'">'+i+"</a>" 
                }
            }           
        }
    }
    if(currentPage!=totalPage&&totalPage>1){
      appendStr+="<a href='javascript:void(0)'  data-page='"+nextPage+"' page-rel='prepage'>下一页</a>" 
    }
    ele.html(appendStr);
}

function  pageClick(){
    $ele=$("#storeCarWrap").find("a");
    $("#storeCarWrap").on("click",'.asyc-page a',function(){
        var  currentPage=$(this).data("page");
        var  data=data_count.slice(currentPage*3-3,currentPage*3+1);
        page_rule(data_count,currentPage);
        get_page_data(data);
    })   
}
pageClick();
$("body").on('mouseover',".cd_m_info_sccy", function(){
    if($(this).hasClass("cd_m_select")){
       $(this).html('<i class="icon xin"></i>取消收藏');
    }
});
$("body").on('mouseout',".cd_m_info_sccy", function(){
    if($(this).hasClass("cd_m_select")){
       $(this).html('<i class="icon xin"></i>已收藏');
    }
}); 

function  get_ahref(params){
    var  ele_arr = $(params).find(".pop_list a[href]");
    ele_arr.each( function() {
        $(this).attr("href",UrlTool.fixHref($(this).attr("href")));
    })
}

/*如果没有登录弹出登录框*/

$("#js-cogradient").on("click",function(){
    if(!TOP_INFO.user.mobile){
        $("#stroeUp").hide();
        $('.logintab a').get(0).click();
        //$(".closeJs").click();
        $('#popupLogin .PageNum').eq(0).html('<img src="/register/get_vcode/" id="vcodeimg_l"/>');
        $('#vcodeimg_l').bind('click', function () {
            flush_vcode('#vcodeimg_l');
        });
        //clear_invalid() 此方法在main_page.js中
        clear_invalid();
        show_popup("#popupLogin","#popupLogin .closeJs");
        uxl_track("synchronous_cloud");
    }
}) 
</script>



<!-- <script src="//s4.xinstatic.com/www/js/popup.js?v=17112101"></script> -->

<div class="price-notice _price-notice _sale_item3" data-type="fullprice">
    <a href="javascript:void(0);" class="close-btn _close-btn _close-btn1"></a>
    <div class="price-notice-bottom price-notice-bottom1">
        <div class="pn-top">
            <div class="pn-top-left">
                <div class="carName">本车可议价</div>
                <div class="price-notice-price">当前报价48.6万</div>
            </div>
            <div class="pn-top-right">
                <img alt=""> 
            </div>
        </div>
        <span class="price-msg price-msg1">请留下您的手机号，我们将第一时间把底价反馈给您。</span>
        <div class="command">
            <input class="_entry _txtphone _entry1 jId-txtphone js-show-current_mobile" type="tel" placeholder="请输入手机号" maxlength="11"><i></i>
                    </div>
        <div class="pn-img-yzm">
            <input type="text" name="" id="captcha" placeholder="请输入图片验证码" maxlength="4" class="yzm-img">
            <span class="line"></span>
            <img id="price-notice-captcha" class="captcha" alt="">
        </div>
        <div class="pn-yzm">
            <input type="tel" name="" id="smscode" placeholder="请输入短信验证码" maxlength="6" class="yzm">
            <span class="line"></span>
            <a href="javascript:;" id="getCaptcha" class="getyzm">获取验证码</a>
        </div>
        <span class="_sale_error _sale_error1">验证码有误，请重新输入</span>
        <div class="person-num-wrap">已有<span class="person-num">个用户</span>通过此功能询到底价</div>
        <div class="pn-submit pn-submit1">
            <a href="javascript:void(0);" class="submit-btn" id="btnsalephone">询底价</a>
        </div>
    </div>
</div>
<div id="cd_m_pop_jjtxResult" class="cd_m_pop_jjtxResult sumbit-success">
    <i class="cd_m_pop_close cd_m_pop_close1"></i>
</div>
<script>
    //UX 为全局变量，不能局部定义
    (function(){
        var obj2Str = Object.prototype.toString,
            loadFiles = function(qs, index)
            {
                for(var i in qs)
                {
                    if(obj2Str.call(qs[i]) === '[object String]')
                    {
                        addAsyncScript(qs[i]);
                        continue;
                    }
                    addAsyncScript(qs[i].url, qs[i].fn);
                }
            },
            loadScripts = function(q)
            {
                if(obj2Str.call(q) !== '[object Array]') return;
                for(var i in q)
                    q[i]();
            },
            addAsyncScript = function(url, fn)
            {
                var script = document.createElement('script');
                script.type='text/javascript';
                script.async=true;
                script.src=url;
                if(obj2Str.call(fn) === '[object Function]') script.onload = fn;
                var parent = document.getElementsByTagName('script')[0];
                parent.parentNode.insertBefore(script, parent);
            };
        var _ux = function(){ }
        _ux.prototype =
            {
                q:[],
                qs:[],
                isInit:false,
                isLoad:false,
                init:function()
                {
                    var that = this;
                    if(that.isInit) return;
                    that._load();

                    that.isInit = true;
                },
                _load:function()
                {
                    if(this.isLoad) return;
                    this.isLoad = true;
                    try
                    {
                        loadFiles(this.qs);
                        loadScripts(this.q);
                        this.qs = [];
                        this.q = [];
                        this.q.push = function(fn){ fn();};
                        this.qs.push = function(obj)
                        {
                            if(obj2Str.call(obj) === '[object String]')
                            {
                                addAsyncScript(obj);
                                return;
                            }
                            addAsyncScript(obj.url, obj.fn);
                        };
                    }
                    catch(e){ if(window.console) console.log(e); }
                }
            };
        window.UX = new _ux;
        window.UX.scroll =
            {
                _fn:function(e)
                {
                    if(e.preventDefault)
                        e.preventDefault();
                    else
                        e.returnValue = true;
                },
                _fnEx:function(e)
                {
                    var delta = (e.originalEvent.wheelDelta) ? e.originalEvent.wheelDelta / 120 : -(e.originalEvent.detail || 0) / 3;

                    $(e.currentTarget).scrollTop($(e.currentTarget).scrollTop() + (delta * 15 * -1));

                    if(e.preventDefault)
                        e.preventDefault();
                    else
                        e.returnValue = true;
                },
                eventName: document.mozHidden !== undefined ? "DOMMouseScroll" : "mousewheel",
                run:function()
                {
                    $(document).unbind(this.eventName,this._fn);
                },
                pause:function()
                {
                    $(document).bind(this.eventName,this._fn);
                },
                addEx:function(id)
                {
                    $(id).bind(this.eventName,this._fnEx);
                },
                removeEx:function(id)
                {
                    $(id).unbind(this.eventName);
                }
            };
    })();
    // 初始化信息
    var userMobil = "", enquiry_carid = 0, enquiry_page = 'carlist', show_pic = 0, show_sms = 1;
    var uid = ''
    /** 询底价js start **/
    $(function(){

        function placeholder(obj,defaultValue) {
            if (!('placeholder' in document.createElement('input'))) {
                var focusStyle = { color : '#333' },
                    blurStyle = { color : '#ccc' };
                $(obj).css(blurStyle).each(function (i, ele) {
                    this.defaultValue = defaultValue || $(this).attr('placeholder');
                    this.value = this.defaultValue;
                    $(this).focus(function () {
                        if ($(this).val() == this.defaultValue) {
                            $(this).val('');
                        }
                        //$(this).css(focusStyle);
                    }).blur(function () {
                        if ($(this).val() == '') {
                            $(this).val(this.defaultValue);
                            $(this).css(blurStyle)
                        }
                    })
                });
            }
        }
        placeholder('.jId-txtphone',"请输入手机号");
        var type = 'enquiry'; // 询底价类型标识
        var car_id = '';
        var show_pic_yzm = 0;//是否展示图片验证码
        var up_show = ''; //弹出输入框。
        var up_success = ''; //弹出成功框。
        var is_new_user = 0; //用户是否登录。 第一次输入短信验证码应刷页面改为登录状态。
        //询底价按钮点击。
        $(document).on("click",'.b2c_click',function(){
            show_pic = 0
            var releated_mobile = $.cookie('XIN_CURRENT_SHOW_MOBILE');
            $(".pn-yzm ,.pn-img-yzm ").hide();
            placeholder("#captcha","请输入图片验证码");
            placeholder("#smscode","请输入短信验证码");
            var cookie_val = $.cookie("yzm-num");
            uid = $.cookie("XIN_UID_CK");
            var page_type = $('.price-notice').data('type');
            if (page_type == 'car_detail') {
                var carObj = $('.cd_m_nav');
                car_id = $(carObj).data('carid')|| '';
                var car_price = $(carObj).data('price');
                var car_pic = $(carObj).data('pic') || '';
                var zg = $('.cd_m_info').data('zg') || '';
            } else {
                var carObj = $(this).parent('.caritem');
                car_id = $(carObj).data('carid') || ''; // 车辆id
                var car_price = $(carObj).data('price') || ''; // 车辆价格
                var car_pic = $(carObj).data('img') || '';
                var zg = $(carObj).data('zg') || 0; //是否直购车
            }
            $('.pn-top-right img').attr('src',car_pic);
            if (car_price > 0){
                $('.price-notice-price').html('当前报价'+$.trim(car_price)+'万');
            }
            $("._sale_error").text('').css('display','none');// 清空报错

            // 使用 页面加载时判断是否登录的TOP_INFO 验证。用户是否登录。
            var mobile = TOP_INFO.user.mobile || '';
            //输入框手机号回留当时手机号的时候才显示，否则显示空
            var pattern = /^1[34578]\d{9}$/ ;
            if(!pattern.test(mobile)){
                mobile='';
            }
            if( cookie_val ) {
                var cookie_val_currentmobil = JSON.parse(cookie_val);
                $('.jId-txtphone').val(releated_mobile||cookie_val_currentmobil.currentmobil);
                $(".command i").css("display","block")
            }else{
                if(mobile) {
                    $('.jId-txtphone').focus().val(mobile);
                }
            }
            if (!up_show) {
                up_show = new UXPopup({
                    contentId:'.price-notice',
                    closeId:'.close-btn',
                    //shadowId:'.umask',
                    contentShowCenter:true,
                    //shadowUseCss:false,
                    //shadowClose: false,
                    beforeShow:function () {
                        //    $("body").css("overflow","hidden");
                        window.UX.scroll.pause();
                    },
                    afterHide:function () {
                        //    $("body").css("overflow","auto");
                        window.UX.scroll.run();
                        $('#getCaptcha').text('获取验证码').css('color','#666');
                        destroy_timer($('#getCaptcha')[0]);
                    }
                })
            }
            if (cookie_val) {
                cookie_val = JSON.parse(cookie_val);
                var tel_num = 0;
                for(var x in cookie_val.mobile){
                    tel_num++;
                }
                if(cookie_val.num >= 7 || tel_num > 2 ){
                    $(".pn-yzm,.pn-img-yzm").show();
                    show_pic = 1;
                    $("#price-notice-captcha").attr('src', "/b2c_enquiry/getvcode/?v=" + Math.random(1));
                }
                up_show.show();
                $('.jId-txtphone').focus().val(releated_mobile || cookie_val.currentmobil);
            } else {   //第一进去询底价
                up_show.show();
                $('.jId-txtphone').blur();
            }
            $("._entry").keyup();
            $(".pn-img-yzm,.pn-yzm").find('input').val('').blur();
            if (page_type == 'car_detail'){
                uxl_track('w_vehicle_details/bottomprice/carid/'+car_id + '/type/' + ($('#cd_m_qgzg').length > 0 ? '1' : '0'));
            }else if (!is_hf  && location.href.indexOf('sn_v5') == -1 && location.href.indexOf('sn_o1v5') == -1 ) {
                uxl_track('w_carlist/bottomprice/carid/'+car_id+'/type/'+zg);
                return false; //列表页阻止冒泡
            } else {
                uxl_track('w_halfprice_carlist/bottomprice/carid/'+car_id+'/type/'+zg);
                return false; //列表页阻止冒泡
            }
        });

        //输入三次不同的手机号码
        $("._entry").on("keyup",function () {
            var tel = $(this).val();
            if(tel.length == 11){
                var cookie_val = $.cookie("yzm-num");
                cookie_val = JSON.parse(cookie_val);
                if(cookie_val){
                    var mobile_num = 0;
                    for(var x in cookie_val.mobile){
                        mobile_num++;
                    }

                    if(mobile_num == 2 && cookie_val.num <7 ){
                        var check = false;
                        for(var x in cookie_val.mobile){
                            if(tel == x){
                                check = true;
                                break;
                            }
                        }
                        if(!check){
                            $(".pn-img-yzm,.pn-yzm").show().find('input').val('').blur();
                            $("#price-notice-captcha").attr('src', "/b2c_enquiry/getvcode/?v=" + Math.random(1));
                            show_pic = 1
                        }
                        else{
                            $(".pn-img-yzm,.pn-yzm").hide();
                            $("#price-notice-captcha").removeAttr('src');
                            show_pic = 0
                        }
                    }
                }
            }
        })

        //登录情况下，电话号码变更。
        $('#enquiry_phone').on("keyup", function(){
            var mobile =TOP_INFO.user.mobile || '';
            if (mobile) {
                var tel = $(this).val();
                if (tel != mobile) {
                    is_new_user = 1;
                    $(".pn-yzm").css('display','block');
                    var enquiry_yzm = $.cookie("enquiry_yzm");
                    if (enquiry_yzm) {
                        enquiry_yzm = enquiry_yzm.split('_');
                        var yzm_num = enquiry_yzm[1] || '';
                        if (yzm_num >= 3) {
                            show_pic_yzm = 1; // 非登录用户,提交过3次短信验证码后,显示图片验证码
                            if ($('#price-notice-captcha').attr('src').length == 0) {
                                $("#price-notice-captcha").attr('src', "/b2c_enquiry/getvcode/?v=" + Math.random(1));
                            }
                            $(".pn-img-yzm").css("display", "block");
                        }
                    }
                } else {
                    is_new_user = 0;
                    $(".pn-yzm").css('display','none');
                    $(".pn-img-yzm").css("display", "none");
                }
            }
        });


        //点击获取短信验证码
        $('#getCaptcha').on('click',function(){
            $("._sale_error").text("").css('display','none');
            if (!car_id || $(this).html() != '获取验证码' ){
                // 没有车辆id 直接返回。
                return false;
            }
            var telphone = $('._entry ').val();
            var yzm_img = $("#captcha").val();
            var pattern =  /^1[34578]\d{9}$/ ;
            if (!pattern.test(telphone)) {
                $("._sale_error").text("请输入正确的手机号").css('display','block');
                return false;
            }
            if (show_pic == 1) {

                if (!yzm_img) {
                    $("._sale_error").text("验证码有误，请重新输入").css('display', 'block');
                    return false;
                }
            }
            var dat = { 'mobile':telphone, 'vcode':yzm_img, 'type':type};
            var click_obj = this;
            $.post('/b2c_enquiry/send/', dat, function(data) {
                if (data == 1) {
                    get_code_time(click_obj); // 开始倒计时
                } else if(data == 2) {
                    $("._sale_error").text("验证码有误，请重新输入").css("display","block");
                    $('#price-notice-captcha').attr('src', "/b2c_enquiry/getvcode/?v=" + Math.random(1));
                    $('#captcha').val('');

                } else {
                    $("._sale_error").text("发送失败").css("display","block");
                }
            });
        });

        //验证码点击切换
        $('#price-notice-captcha').on('click',function(){
            $("#price-notice-captcha").attr('src', "/b2c_enquiry/getvcode/?v=" + Math.random(1));
        });

        // 提交询底价信息
        $('#btnsalephone').on('click',function(){
            var tel = $('._entry').val();
            var isShow = $(".pn-img-yzm").css("display");
            var yzm_img = $(".pn-img-yzm input").val();
            var yzm = $(".pn-yzm input").val();
            var telReg = /^1[34578]\d{9}$/;

            if (!telReg.test(tel)){
                $("._sale_error").text("请输入正确的手机号").css("display","block")
                return false;
            }
            if(show_pic==1){
                if(!yzm_img){
                    $("._sale_error").text("验证码有误，请重新输入").css("display","block");
                    return false;
                }
                if(!yzm){
                    $("._sale_error").text("短信验证码有误，请重新输入").css("display","block");
                    return false;
                }
            }
            var cookie_val = $.cookie("yzm-num");
            if( cookie_val ) {
                var json= $.parseJSON(cookie_val);
                var json_num = 0;
                var is_new_tel = 0;
                for (i in json.mobile) {
                    if (i == tel) {
                        is_new_tel = 1;
                    }
                    json_num++;
                }
                if( json.num >=15 ) {
                    $("._sale_error").text('服务器繁忙，您可以直接拨打客服电话').css("display","block");
                    return false;
                }
                if( json_num+1>4 && is_new_tel==0)
                {
                    $("._sale_error").text('服务器繁忙，您可以直接拨打客服电话').css("display","block");
                    return false;
                }
            }
            var dat = { 'mobile' : tel, 'carid' : car_id, 'captcha' : yzm_img, 'smscode' : yzm, 'type': type, 'show_pic' : show_pic };
            $.post('/b2c_enquiry/add_clue', dat , function(data) {
                if (data.error_code < 1000) {
                    $("._sale_error").text(data.error_msg).css("display","block");
                    return false;
                } else if (data.error_code == 1000) {
                    var page_type = $('.price-notice').data('type');
;                    if (page_type == 'car_detail'){
                        uxl_track('w_vehicle_details/bottomprice_submit/carid/'+car_id + '/tel_num/' + tel + '/type/' + ($('#cd_m_qgzg').length > 0 ? '1' : '0'));
                    }else if (!is_hf && location.href.indexOf('sn_v5') == -1 && location.href.indexOf('/sn_o1v5') == -1) {
                        var zg = $('li[data-carid='+car_id+']').data('zg');
                        uxl_track('w_carlist/bottomprice_submit/carid/'+car_id+'/tel_num/'+tel+'/type/'+zg);
                    } else {
                        var zg = $('li[data-carid='+car_id+']').data('zg');
                        uxl_track('w_halfprice_carlist/bottomprice_submit/carid/'+car_id+'/tel_num/'+tel+'/type/'+zg);
                    }
                    uid = $.cookie("XIN_UID_CK");
                    var cookie_val = $.cookie("yzm-num");
                    var expiresDate= new Date();
                    var val = expiresDate.getTime() + (60 * 60 * 1000 * 24);
                    if(cookie_val){
                        cookie_val = JSON.parse(cookie_val);
                        if(cookie_val.uid == uid){   //同一用户
                            cookie_val.currentmobil = tel
                            if(cookie_val.mobile[tel]){   //同一用户同一手机号
                                cookie_val.mobile[tel]++;
                            }
                            else{          //同一用户不同手机号
                                cookie_val.mobile[tel] = 1;
                            }
                            cookie_val.num++;
                            cookie_val = JSON.stringify(cookie_val)
                            $.cookie("yzm-num",cookie_val,{ expires:val, path:'/' });
                        }
                        else{     //不是同一用户,重新计算
                            var json = { "uid" : uid, "mobile" : {}, num : 1, "time" : val, "currentmobil" : tel };
                            json.mobile[tel] = 1;
                            var str = JSON.stringify(json);
                            $.cookie("yzm-num",str,{ expires:val, path:'/' });
                        }

                    } else {     //第一次提交
                        var json = { "uid" : uid, "mobile":{}, num : 1, "time" : val, "currentmobil" : tel };
                        json.mobile[tel] = 1;
                        var str = JSON.stringify(json);
                        $.cookie("yzm-num",str,{ expires:val, path:'/' });
                    }
                    if (!up_success) {
                        up_success = new UXPopup({
                            contentId:'.cd_m_pop_jjtxResult',
                            closeId:'.cd_m_pop_close',
                            //shadowId:'.umask',
                            contentShowCenter:true,
                            //shadowUseCss:false,
                            //shadowClose: false,
                            beforeShow:function () {
                                window.UX.scroll.pause();
                                //$("body").css("overflow","hidden");
                            },
                            afterHide:function () {
                                window.UX.scroll.run();
                                //$("body").css("overflow","auto");
                                $('#getCaptcha').text('获取验证码').css('color','#666');
                                destroy_timer($('#getCaptcha')[0]);
                                if (is_new_user || !TOP_INFO.user.mobile) {
//                                    location.href = location.href;
                                }
                            }
                        });
                    }

                    $('.price-notice').css('display','none');
                    $('#umask').css('display','none');
                    up_success.show();
                    // 缺少打点。
                }
            },'json')
        });
//X   代码
        $("._entry").keyup(function(event) {
            var val = $(this).val();
            if(val && this.defaultValue != val){
                $(".command i").css("display","block")
            }else{
                $(".command i").css("display","none")
            }
        });
        $(".command i").click(function () {
            $('.jId-txtphone').val("").blur();
            $(this).hide();
        });
        //取消报错信息 。
        $('#captcha,#smscode,#txtphone,.jId-txtphone').on('click', function(){
            $("._sale_error").text('').css('display','none');
        });
        //发送短信验证码倒计时
        function get_code_time(o) {
            if (o.run){ return false; }
            init_timer(o);
            clearInterval(o.timer);
            o.timer = setInterval(exec, 1000);
            exec();
            o.style.color = '#ccc';
            $(o).data('clear', 0);
            function exec() {
                if (o.wait == 0) {
                    clearInterval(o.timer); init_timer(o);
                } else {
                    o.innerHTML = o.wait + 's后重发'; o.run = true;
                }
                o.wait--;
            }
        }

        function init_timer(o){
            o.innerHTML = "获取验证码";
            o.wait = 120;
            o.timer = null;
            o.run = false;
            o.style.color = '#666';
        }

        function destroy_timer(o){
            clearInterval(o.timer);
            o.run = false;
            o.innerHTML = "获取验证码";
            o.style.color = '#666';
        }
    });
    /** 询底价js end **/

</script>



<script type="text/javascript">
(function(win,jsvar){
    jsvar.search_q = '';
    jsvar.con = {
    	brand_brandid : '',
    	brand_letter : '',
    	brand_brandname : '全部品牌',
    	serial_scname: '',
    	serial_scid : ''
	};
	jsvar.filer_search_word = '';
	jsvar.city_rank = "1";
	jsvar.page_info = '';
    jsvar.huanxin_id = "";
	/*//jira-12921 插入环信插件
	window.__json4fe__.easemob = require('/widget/common/easemob/easemob.es6');
	window.__json4fe__.is_need_login = '';
	window.__json4fe__.is_expert = '';
	window.__json4fe__.huanxin_id = '';
	//环信IM接入通用配置
    var easemobCf = require('/widget/common/easemob/easemob_cf.es6');
	var easemobCfObj = easemobCf.init({
		is_need_login:window.__json4fe__.is_need_login,
		huanxin_id:window.__json4fe__.huanxin_id,
		title:["【PC接入，无车辆信息】","【PC接入，无车辆信息】"]
    });*/
    var infodata = null;
    var getClickIm = $.cookie('clickIm');
    window.__json4fe__.easemobCf = function(data){
        infodata = data;
        var  easemobCfObj = window.semobcf;
		// var easemob = window.__json4fe__.easemob;
        var isLogin = $.cookie("XIN_INFO");
        var configId = "";
        var bind;
        var isSite = $.cookie('s'+window.__json4fe__.cityid);
        // if( (+getClickIm === 1 || data.getClickIm === 1) && isSite){
        if(isLogin && (+getClickIm === 1 || data.getClickIm === 1)){
            bind = true;
        }else{
            bind = false;
        }
        easemob.fn({
            configId:easemobCfObj.configId,
            src:"//kefu.easemob.com/webim/easemob.js?configId="+easemobCfObj.configId,
            exemptLogin:easemobCfObj.exemptLogin,
            msData:data.user,
            clickDemo:".jp-side-im",
            success:false,
            openLogin:function(){
                // if($.cookie("XIN_INFO") || easemobCfObj.exemptLogin){
                //     infodata.getClickIm = 1;
                //     storeJs.init(window.__json4fe__.easemobCf,infodata);
                // }else{
                //     $(".error").remove();
                //     $(".sure").remove();
                //     var curPhone = $.cookie('XIN_CURRENT_SHOW_MOBILE');
                //     $("#search,#search1,#search3,#update_mobile,#mobile,#free_mobile,#consult_mobile,#register_mobile").val( curPhone || '请输入手机号').css("color", curPhone ? "#333" : "#bfbfbf");
                //     $("#search2,#search4,#valicode1").val('六位数字验证码').css("color", "#bfbfbf");
                //     $("#piccode_g,#piccode_r").val('请输入图片码').css("color", "#bfbfbf");
                //     $("#sms_captcha").val('请输入验证码').css("color", "#bfbfbf");
                //     $("#psw6,#psw8,#psw10").val('');
                //     $("#psw1,#psw3,#psw5,#psw7").show();
                //     $("#psw2,#psw4,#psw6,#psw8,#psw10").hide();
                //     $('.error_num').remove();
                //     $('#user_name2,#user_name1').val('');
                //     $('#invite_code').val('');
                //     $('#invited_mobile').val('');
                //     show_popup('#popupLogin','#popupLogin .closeJs');
                //     $('.logintab a').get(0).click();
                //     $('#popupLogin .PageNum').eq(0).html('<img src="/register/get_vcode/?r=' + (new Date()).getTime()+'" id="vcodeimg_l"/>');
                //     $('#vcodeimg_l').bind('click', function () {
                //         if ($('#vcodeimg_l').next().hasClass('error') || $('#vcodeimg_l').next().hasClass('sure')) {
                //             $('#vcodeimg_l').next().remove();
                //         }
                //         flush_vcode('#vcodeimg_l');
                //     });
                // }
                $(".error").remove();
                $(".sure").remove();
                var curPhone = $.cookie('XIN_CURRENT_SHOW_MOBILE');
                $("#search,#search1,#search3,#update_mobile,#mobile,#free_mobile,#consult_mobile,#register_mobile").val( curPhone || '请输入手机号').css("color", curPhone ? "#333" : "#bfbfbf");
                $("#search2,#search4,#valicode1").val('六位数字验证码').css("color", "#bfbfbf");
                $("#piccode_g,#piccode_r").val('请输入图片码').css("color", "#bfbfbf");
                $("#sms_captcha").val('请输入验证码').css("color", "#bfbfbf");
                $("#psw6,#psw8,#psw10").val('');
                $("#psw1,#psw3,#psw5,#psw7").show();
                $("#psw2,#psw4,#psw6,#psw8,#psw10").hide();
                $('.error_num').remove();
                $('#user_name2,#user_name1').val('');
                $('#invite_code').val('');
                $('#invited_mobile').val('');
                show_popup('#popupLogin','#popupLogin .closeJs');
                $('.logintab a').get(0).click();
                $('#popupLogin .PageNum').eq(0).html('<img src="/register/get_vcode/?r=' + (new Date()).getTime()+'" id="vcodeimg_l"/>');
                $('#vcodeimg_l').bind('click', function () {
                    if ($('#vcodeimg_l').next().hasClass('error') || $('#vcodeimg_l').next().hasClass('sure')) {
                        $('#vcodeimg_l').next().remove();
                    }
                    flush_vcode('#vcodeimg_l');
                });
            },
            desc:"",
            item_url:"",
            xdid:$.cookie("XIN_UID_CK"),
            cityid:window.jsvar.cityid,
            cityname:window.jsvar.cityname,
            title:easemobCfObj.title,
        },bind);
    }
})(window,(window.jsvar = window.jsvar ||{} ));
</script>
<script>
    win_add_pageid(2);
    // 当前页面为ABtest的页面，根据url参数增加打点属性
    window.ABtest = UrlTool.getUrlParam('abtest') ? true : false;

    if($(".half-price-wrap").find(".bannernew li").length>1){
        $(".half-price-wrap").slide({ titCell:".hd ul", mainCell:".bannernew ul", effect:"leftLoop", autoPlay:true, autoPage:true, trigger:"click" });
    }
    if($(".ad_m").find(".ad_m_c li").length>1) {
        $(".ad_m").slide({
            titCell: ".ad_m_nav ul",
            mainCell: ".ad_m_c ul",
            effect: "leftLoop",
            autoPlay: true,
            autoPage: true,
            trigger: "click"
        });
    }
    function point_add_abevent(class_name, tpl){
        var point_list = $('div.' + class_name + ' ul li');
        point_list.each(function (i, v) {
            $(v).attr('abevent', tpl + (i + 1) );
        });
    }
    point_add_abevent('hd','/w_carlist/banner_top/click/rank/');
    point_add_abevent('ad_m_nav','/w_carlist/bannerr_bottom/click/rank/');
    $(function(){
        //百度监测
        _hmt.push(['_setCustomVar', 1, 'vistortype', 'buy', 3]);
        var qcode;
        var defaults = $("#search_search").attr("data-default");
        var vals = jsvar.search_q || defaults;
        if(defaults!=vals){
            qcode = decodeURIComponent(vals);
        }else{
            qcode = vals;
        }
        $("#search_search").val(qcode);
        $(function(){
            $('.select-tit').click(function(){
                $(this).find('ul').toggle();
                if($('.select-tit ul').css('display')=='none'){
                    $('.select-tit b').removeClass('select-on')
                }else{
                    $('.select-tit b').addClass('select-on')
                }
            });
            $('.select-tit ul li').click(function(){
                var txt = $(this).text();
                $('.Sitem').val(txt);
                if($('.Sitem').val() == '车辆'){
                    $('.s-input').attr('value','请输入品牌、车系搜索').data('default','请输入品牌、车系搜索');
                }else{
                    $('.s-input').attr('value','请输入店铺名称搜索').data('default','请输入店铺名称搜索');
                }
            });
            $(document).click(function(e){
                if($(e.target).parent(".select-tit").length==0) {
                    $('.select-tit ul').hide();
                }
            });
            //三期打点 end
        });

        //国一国二活动弹层关闭
        window.ux = {};
        window.ux.scroll =
        {
            _fn:function(e)
            {
                if(e.preventDefault)
                    e.preventDefault();
                else
                    e.returnValue = true;
            },
            eventName: document.mozHidden !== undefined ? "DOMMouseScroll" : "mousewheel",
            run:function()
            {
                $(document).unbind(this.eventName,this._fn);
            },
            pause:function()
            {
                $(document).bind(this.eventName,this._fn);
            }
        };
        $(".banner-popup a").click(function () {
            $(".banner-popup").hide(300);
            $(".mask").hide(0,function(){
                window.ux.scroll.run();
            });
        });
    });
</script>