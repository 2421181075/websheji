$(function () {
    verifyCode.init();
    verifyCodePhone.init();    
    necOp.loadScript(function () {
        if ($("#loginnormal").is(":visible")) {
            var vv = $(".state-change li");
            if (vv[0].className == "on") {
                necOp.senseCaptcha();
            }
            else if (vv[1].className == "on") {
                necOp.senseCaptcha2();
            }
        }
    });
    if ($.browser.msie) {
        $("input").each(function () {
            var value = $(this).attr("placeholder");
            $(this).attr("value", value);
            $(this).focus(function () {
                if ($(this).attr("value") == "密码") {
                    $(this).hide();
                    $("#pwd").show().focus();
                }
                $(this).attr("value", '');
            });
            $(this).blur(function () {
                if ($.trim($(this).val()) == '') {
                    if ($(this).attr("id") == 'pwd' || $(this).attr("id") == 'pwd3') {
                        $(this).hide();
                        $(this).prev("input").show();
                    }
                    $(this).attr("value", value);
                }
            });
        });
    }
    else {
        $(".login-inputDiv2").children("input").eq(0).focus(function () {
            $(this).hide();
            $("#pwd").show().focus();
        })
        $(".login-inputDiv2").children("input").eq(2).focus(function () {
            $(this).hide();
            $("#pwd3").show().focus();
        })
        $("#pwd").blur(function () {
            var val = $(this).val();
            if ($.trim(val) == '') {
                $(this).hide();
                $(this).prev("input").show().attr("value", "密码");
            }
        })
    }
    $("#btnlogin,#btnlogin2,#btnlogin3").click(function (e) {
        checkLogin();
        return false;
    });

    //绑定回车
    $(document).keypress(function (e) {
        if (e.which == 13) {
            checkLogin();
        }
    });

    $.ajax(
    {
        type: "GET",
        url: "/Login/Get_Backgroud_Images",
        data: "r=" + Math.random(),
        dataType: "json",
        async: false,
        success: function (data) {
            if (data != null) {
                var ul_slider = $(".slider");
                var html_li = "";
                var url = "/homepage/";
                var array_color = new Array(data.length);
                for (var i = 1; i <= data.length; i++) {
                    if (i == 1) //<a href='"+(data[i - 1].split(",")[2])+"' target='_blank'></a>  //
                    {
                        html_li += "<li style='display:block;'><a href='" + (data[i - 1].split(",")[2]) + "' target='_blank'><img id='img" + i + "' src='" + (data[i - 1].split(",")[0]) + "' width='789' height='428' /></a></li>";
                    }
                    else {
                        html_li += "<li><a href='" + (data[i - 1].split(",")[2]) + "' target='_blank'><img id='img" + i + "' src='" + (data[i - 1].split(",")[0]) + "' width='789' height='428' /></a></li>";
                    }
                    array_color[i - 1] = data[i - 1].split(",")[1];
                }
                ul_slider.html(html_li);
                if (array_color && array_color.length > 0) {
                    $(".main").css("background-color", array_color[0]);
                }

                $('.login-main').juicyslider({
                    width: '100%',
                    height: 600,
                    mask: 'square',
                    bgcolorClass: 'main',
                    background: array_color,
                    show: { effect: 'fade', duration: 1 },
                    hide: { effect: 'fade', duration: 1 }
                });
            }
        }
    });

    //新增
    $(".state-change li").click(function () {
        var $this = $(this);
        var index = $this.index();
        $this.addClass("on").siblings().removeClass("on");
        $(".state-change-con li").eq(index).show().siblings().hide();
        necOp.captchaInit();
    });

    //$(".get-pswd").click(function () {
    //    var phone = $("#loginphone").val();
    //    verifyCodePhone.sendpwd(phone);
    //});
    //看不清，换一张
    $(".yzm-text").children("a").click(function () {
        var src = imgurl();

        $(".imgcode").attr("src", src);
    });

    //手机输入
    $("#loginphone").keydown(function (event) {
        if (!(event.keyCode == 46)
            && !(event.keyCode == 8)
            && !(event.keyCode == 37)
            && !(event.keyCode == 39)) {
            if ($("#loginphone").val().length >= 11) {
                return false;
            }
            if (!((event.keyCode >= 48 && event.keyCode <= 57)
                || (event.keyCode >= 96 && event.keyCode <= 105))) {
                return false;
            }

        }
    });
    GetayHidden();
    GetPreType();
    //$("#imgcode1").attr("src",imgurl());
    UL.Init();
});

function checkLogin() {

    var vv = $(".state-change li");
    if (vv[0].className == "on") {
        $("#usephone").val("0");
        if ($.trim($("#loginname").val()) == "" || $("#loginname").val() == $("#loginname").attr("placeholder")) {
            $("#errMsg").html("请输入用户名");
            verifyCode.resetCssStyle();
            return false;
        }
        if ($.trim($("#pwd").val()).length < 5) {
            $("#errMsg").html("请输入大于或等于5位的密码");
            verifyCode.resetCssStyle();
            return false;
        }
        $("#hidepassword").val(DesEnc($("#pwd").val()));
        $("#errMsg").html("");
        if (necOp.verificate == null) {
            necOp.captchaIns && necOp.captchaIns.verify();
        }
    }
    else if (vv[1].className == "on") {
        $("#usephone").val("1");
        var phone = $.trim($("#loginphone").val());
        if (phone == ""
            || phone == $("#loginphone").attr("placeholder")
            || !checkphone(phone)) {
            $("#errMsg2").html("请输入手机号");

            return false;
        }
        if (!verifyCodePhone.checkDynCode()) {
            $("#errMsg2").html("请输入动态密码");
            return false;
        }
        if (necOp.verificate == null || necOp.verificate == "") {
            $("#errMsg2").html("验证失败，请重新提交登录");
            return false;
        }
        DoLogin();
    }
    else if (vv[2].className == "on") {
        $("#usephone").val("2");
        var phone = $.trim($("#loginphone3").val());
        if (phone == ""
            || phone == $("#loginphone3").attr("placeholder")) {
            $("#errMsg3").html("请输入员工编号");

            return false;
        }

        if (!$.trim($("#verifyCode3").val()) != "") {
            $("#errMsg3").html("请输入验证码");
            return false;
        }
        if ($.trim($("#pwd3").val()).length < 5) {
            $("#errMsg3").html("请输入大于或等于5位的密码");
            verifyCode.resetCssStyle();
            return false;
        }
        $("#hidepassword").val(DesEnc($("#pwd3").val()));
        DoLogin();
    }
    //$(document.forms[0]).submit();
    
}
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
function DoLogin() {
    var verifycode = "";
    var verifycode2 = $("#verifyCode").val();
    var loginphone = $("#loginphone").val();
    var hidePassword = $("#hidepassword").val();
    if ($("#usephone").val() == "0") {
        verifycode = necOp.verificate;
    } else if ($("#usephone").val() == "1") {
        verifycode = necOp.verificate;
    } else if ($("#usephone").val() == "2") {
        verifycode = $("#verifyCode3").val();
        verifycode2 = $("#sltid option:selected").val();
        loginphone = $("#loginphone3").val();
        hidePassword = $("#hidepassword").val();
    }
    $.ajax({
        url: "/Login/Index",
        type: "POST",
        //async: false,
        data: {
            loginName: $("#loginname").val(),
            hidePassword: hidePassword,
            autoLogin: $("#autologin").val(),
            usephone: $("#usephone").val(),
            loginphone: loginphone,
            dyncode: $("#dyncode").val(),
            verifyCode: verifycode,
            verifyCode2: verifycode2,
            from: getUrlParam('from'),
            sessionID: $("#hidSID").val().split('|')[0]
        },
        success: function (data) {
            if (data != null) {
                if (data.respcode == "00") {
                    //神策监测-登录成功
                    sensor.login($.cookie("ayenc"));
                    sensor.setProfile({
                        member_id: $.cookie("ayenc"),
                        phone_number: data.phonenumber
                    });

                    window.location.href = data.fromurl;
                }
                else {
                    window.location.href = data.fromurl;
                }
            }
        },
        error: function () {
            window.location.href = "https://passport.aoyou.com";
        }
    });
}



function checkphone(phone) {
    if (phone.length != 11) {
        return false;
    }
    var pattern = /0?(13|14|15|16|17|18|19)[0-9]{9}/;

    return pattern.test(phone);
}

function DesEnc(pass) {
    var key = document.getElementById("ayhidden").value;
    if (key.length == 0) {
        //alert("字符串错误,请勿修改默认程序");
        return false;
    }
    return encMe(pass, key);
}

///-----验证码处理---///
var verifyCode = function () {
    var isNeedVerify = false,
        $code,
        $img,
        resetCssStyle = function () {
            if (isNeedVerify) {
                if ($("#errMsg").text()) {
                    $("div.login-inputDiv3").animate({ "margin-top": "0px" });
                    $("div.login-friend").animate({ "margin-top": "0px" });
                    $("div.login-friend p.login-friend-p").animate({ "margin-bottom": "2px" });
                    $("div.login-btnBox").animate({ "margin-top": "0px" });
                }
                else {
                    $("div.login-inputDiv3").animate({ "margin-top": "0px" });
                    $("div.login-friend").animate({ "margin-top": "5px" });
                }
            }
        },
        bindEvent = function () {
            $code.focus(function () {
                if ($code.val() == $code.attr("placeholder")) {
                    $code.val("").css("color", "Black");
                }
            }).blur(function () {
                if ($.trim($code.val()) == "") {
                    $code.val($code.attr("placeholder")).css("color", "Gray");
                }
                $code.removeClass("blur");
            });
            $img.click(function () {
                this.src = "/Login/GetVerifyCode?t=" + new Date().getTime();
            })
        },
        checkCode = function () {

            return $.trim($code.val()) != $code.attr("placeholder");

        },
        init = function () {
            isNeedVerify = ($code = $("#verifyCode")).length > 0 && $code.css("display") == "block";
            $img = $(".imgcode");
            if (isNeedVerify) {
                resetCssStyle();
                bindEvent();
                $img.click();
            }
        };
    return {
        isNeedVerify: isNeedVerify,
        resetCssStyle: resetCssStyle,
        bindEvent: bindEvent,
        checkCode: checkCode,
        init: init
    }
}();

//手机登录
var verifyCodePhone = function () {
    var isNeedVerify = true,
         hidVerify = false,
        $code,
        $img,
        $sendbtn,
        $dyncode,
        bindEvent = function () {
            $code.focus(function () {
                if ($code.val() == $code.attr("placeholder")) {
                    $code.val("").css("color", "Black");
                }
            }).blur(function () {
                if ($.trim($code.val()) == "") {
                    $code.val($code.attr("placeholder")).css("color", "Gray");
                }
                $code.removeClass("blur");
            });
            $img.click(function () {
                var src = imgurl();
                $(".imgcode").attr("src", src);
                //this.src = imgurl();
            });

        },
        bindbtnEvent = function () {
            $sendbtn.click(function () {
                var phone = $.trim($("#loginphone").val());
                if (phone == "" || phone == $("#loginphone").attr("placeholder")
                    || !checkphone(phone)) {
                    $("#errMsg2").html("请输入正确手机号");
                    return false;
                } else {
                    if (necOp.verificate == null) {
                        $("#errMsg2").html("请先完成验证");
                    }
                    else {
                        $("#errMsg2").html("");
                        sendpwd(phone);
                    }
                }

            });
        },
        checkCode = function () {
            if (isNeedVerify) {
                return $.trim($code.val()) != $code.attr("placeholder");
            }
            return true;
        },
        checkDynCode = function () {
            if (isNeedVerify) {

                return $.trim($dyncode.val()) != $("#dyncode").attr("placeholder");
            }
            return true;
        },
        init = function () {
            $dyncode = $("#password2");
            isNeedVerify = ($code = $("#verifyCode2")).length > 0 && $code.css("display") == "block";
            $img = $(".imgcode");
            $sendbtn = $("#getpwd");
            if (isNeedVerify) {
                bindEvent();

                $img.first().click();
            }
            bindbtnEvent();
        },
        sendpwd = function (phone) {
            var para = { phoneNumber: phone, vcode: necOp.verificate };
            if (hidVerify) {
                hidVerify = false;
                $(".imgcode").attr("src", imgurl());
                $(".login-inputDiv33").show();
            } else {
                $.post(
                    "/Login/SendDynamicPassWord?t=" + new Date().getTime(),
                    para,
                function (data, status) {

                    if (status == "success") {
                        if (data.statu != "sendsucess") {
                            $("#imgcode2").attr("src", imgurl());
                        }
                        if (data.statu == "sendsucess") {
                            retimeout();
                            $(".login-noRegText").hide();
                            $(".login-inputDiv33").hide();
                            hidVerify = true;
                        } else if (data.statu == "noreg") {
                            $(".login-noRegText").show();

                        } else if (data.statu == "novcode") {
                            $("#errMsg2").html("验证码错误");
                        } else if (data.statu == "errorphone") {
                            $("#errMsg2").html("请输入正确手机号");
                        } else {
                            retimeout();
                        }
                    }
                    else {
                        $("#imgcode2").attr("src", imgurl());
                    }
                },
                    "json"
                );
            }
        };
    return {
        isNeedVerify: isNeedVerify,
        bindEvent: bindEvent,
        checkCode: checkCode,
        init: init,
        checkDynCode: checkDynCode,
        sendpwd: sendpwd,
        bindbtnEvent: bindbtnEvent
    }
}();

function GetayHidden() {
    $.ajax(
    {
        type: "post",
        url: "/Login/GetayHidden",
        data: "r=" + Math.random(),
        dataType: "json",
        success: function (data) {
            if (data != null) {
                document.getElementById("ayhidden").value = data.ayHidden;
            }
        }
    });
}

function imgurl() {
    return "/Login/GetDynamicVerifyCode?t=" + new Date().getTime();
}


//重新发送
var retime = 30;
function retimeout() {
    var sendbtn = $("#getpwd");
    if (retime == 0 || retime < 0) {
        sendbtn.html("获取动态密码");
        retime = 30;
        verifyCodePhone.bindbtnEvent();
    } else {
        sendbtn.unbind("click");
        sendbtn.html("重新发送(" + retime + ")");
        retime--;
        setTimeout("retimeout()", 1000);
    }


};

function GetPreType() {
    $.ajax(
    {
        type: "post",
        url: "/Login/GetPreType",
        data: "r=" + Math.random(),
        dataType: "json",
        success: function (data) {
            if (data != null) {

                for (var i = 0; i < data.length; i++) {     //循环添加多个值

                    $("#sltid").append("<option value='" + data[i].PartnerID + "'>" + data[i].PartnerName + "</option>");

                }
            }
        }
    });
}

//unionlogin start

var UL = {
    Init: function () {
        $(".unln_typeimg").click(function () {
            var par = $(this).parent();
            par.hide();
            if (par.attr("id") == "loginqr") {
                $("#loginnormal").show();
                necOp.captchaInit();
            } else if (par.attr("id") == "loginnormal") {
                $("#loginqr").show();
                UL.ULRefresh();
            }

        });
        $(".unln_bottom1").click(function () {
            $("#loginqr").hide();
            $("#loginnormal").show();
            necOp.captchaInit();
        });
        $("#btnrefreshqr").click(function () {
            UL.ULRefresh();
        });
        $("#returnqr").click(function () {
            UL.ULRefresh();
            $("#unlnlose").hide();
            $("#unlnscan").hide();

            $("#loginnormal").hide();
            $("#loginqr").show();
        });
        $("#unlnqrdiv").mouseenter(function () {
            if (UL.Runanimate == 0 && $("#unlnqri").css("display") == "none") {
                UL.Runanimate = 1;
                UL.Showqri = 1;
                $("#unlnqr").animate(
                    {
                        'padding-left': '0px'
                    }
                    , 'normal'
                    , function () {

                        var pl = $("#unlnqr").css('padding-left');
                        var plval = pl.substr(0, pl.length - 2);
                        if (plval == 0 && UL.Showqri == 1) {

                            $("#unlnqri").show();
                            $("#unlnqri").animate(
                                {
                                    'opacity': '1'
                                }, 300, function () {
                                    UL.Runanimate = 0;
                                }
                            );
                        } else {
                            $("#unlnqri").hide();
                        }
                    }
                    );
            }

        });
        $("#unlnqrdiv").mouseout(function () {
            UL.Showqri = 0;
            UL.Runanimate = 1;
            $("#unlnqri").css('opacity', 0);
            $("#unlnqri").hide();

            $("#unlnqr").animate(
            {
                'padding-left': '80px'
            }
            , 'normal'
            , function () {
                UL.Runanimate = 0;
                $("#unlnqri").hide();

            }
         );

        });


        this.ULRefresh();
    },
    Runanimate: 0,
    Showqri: 0,
    ULRefresh: function () {
        $.ajax({
            type: "post",
            url: "/Login/LoginReset",
            data: "r=" + Math.random(),
            dataType: "json",
            success: function (data) {
                if (typeof (data).toString() != "undefined" && data.statu.toString() != "undefined") {
                    if (data.statu == "1") {
                        UL.Runanimate = 0;
                        $("#unlnqr").attr("src", data.code);
                        $("#unln_title").attr("data", data.id);
                        $("#unlnqrdiv").show();
                        $("#unlnlose").hide();
                        $("#unlnscan").hide();
                        UL.ULDynamic();
                    }
                }
            }
        });
    },
    time: null,
    ULDynamic: function () {
        UL.time = setInterval(function () {
            if ($("#unln_title").attr("data") != "") {
                $.ajax({
                    type: "post",
                    url: "/Login/LoginDynamic",
                    data: {
                        "loginguid": $("#unln_title").attr("data")
                    },
                    dataType: "json",
                    success: function (data) {
                        if (typeof (data).toString() != "undefined") {
                            if (data.isSuccess) {
                                if (data.loginState == 1) {
                                    //$("#unlnlose").hide();
                                    //$("#unlnscan").hide();
                                } else {
                                    if (data.loginState == 2) {
                                        //scan
                                        $("#unlnlose").hide();
                                        $("#unlnscan").show();
                                        $("#unlnmsg1").hide();
                                        $("#unlnmsg2").show();
                                        $("#unlnqrdiv").hide();
                                    }
                                    else if (data.loginState == 3) {
                                        //login
                                        UL.ULDeDynamic();
                                        window.location.href = $("#unln_title").attr("fromurl");
                                    } else if (data.loginState == 4) {
                                        UL.ULDeDynamic();
                                        //lose
                                        $("#unlnscan").hide();
                                        $("#unlnlose").show();
                                        $("#unlnmsg1").show();
                                        $("#unlnmsg2").hide();
                                        $("#unlnqrdiv").hide();
                                    }
                                }
                            }
                        }
                    }
                });
            } else {

            }
        }, 5000);
    },
    ULDeDynamic: function () {
        if (typeof (UL.time).toString() != "undefined") {
            clearTimeout(UL.time);
        }
    }
}
var necOp = {
    verificate: null,
    capid: $("#hidcaptchaid").val(),
    captchaIns:null,
    senseCaptcha: function () {
        var captchaIns;
        necOp.verificate = null;
        var _ = initNECaptcha({
            element: "#verifyCode1",
            captchaId: necOp.capid,
            mode: "bind",
            width: 290,
            //enableClose: false,
            appendTo: '#loginnormal',
            onVerify: function (t) {
                if (!t) {
                    $("#errMsg").html("");
                    necOp.verificate = $("#verifyCode1").find("input").eq(0).val();
                    DoLogin();
                }
            }
        },
         function (e) {
             necOp.captchaIns = e
         });
    },
    senseCaptcha2: function () {
        necOp.verificate = null;
        var captchaIns;
        var _ = initNECaptcha({
            captchaId: necOp.capid,
            element: '#verifyCode2',
            mode: 'float',
            width: '290',
            onVerify: function (err, ret) {
                if (!err) {
                    necOp.verificate = ret['validate'];
                }
            }
        }, function onload(instance) {
            captchaIns = instance;
        }, function onerror(err) {
            alert("发生错误，请重新刷新页面");
        });
    },
    getTimestamp: function () {
        var msec = 1 * 60 * 1000;
        return parseInt((new Date()).valueOf() / msec, 10);
    },
    loadScript: function (cb) {
        var head = document.head || document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        cb = cb || function () { };
        script.type = 'text/javascript';
        script.src = '../js/PassportNewJs/cstaticdun.load.min.js?t=' + necOp.getTimestamp();;
        if (!('onload' in script)) {
            script.onreadystatechange = function () {
                if (this.readyState !== 'complete' && this.readyState !== 'loaded') return;
                this.onreadystatechange = null;
                cb(script);
            }
        }
        script.onload = function () {
            this.onload = null;
            cb(script);
        }
        head.appendChild(script);
    },
    captchaInit: function () {
        var vv = $(".state-change li");
        if (vv[0].className == "on") {
            this.senseCaptcha();
        }
        else if (vv[1].className == "on")
        {
            this.senseCaptcha2();
        }
    }
}


//unionlogin end