$(document).ready(function () {
  aoyoutoolbox.detectionInit_after();
  aoyoutoolbox._navAdd();

  slider();
  slider2();

  if (diffTime('2019/04/29 00:00:00')){
    var timeStr = resTime('2019/04/29 00:00:00');
    $('.num').text("0"+timeStr);
  }

  getData("con01", 9949);

  $(".tab_con").hover(function () {
    $(".tab_con .text").show();
  },function () {
    $(".tab_con .text").hide();
  });

  $(".tab_nav li").click(function () {
    var index = $(this).index();
    var tabTit = ["中国馆","植物馆","国际馆","妫汭剧场","生活体验馆"];
    var tabCon = [
      "融于一片种植着稃壳各色谷物的梯田之中。馆内可观赏现代数字技术再现的《富春山居图 》等，及各色主题园艺花卉展。",
      "植物馆的建筑设计理念为“升起的地平”，建筑表面机理以植物根系为灵感，庞大的垂坠根系向下不断蔓延。",
      "由94把花伞构成，如同一片花海飘落在园区里。国际馆将在会期承担世界各国、国际组织室内展览以及举办国际园艺竞赛的功能。",
      "为游客们提供了一个优美的田园集市，体验文明现代的生活方式，感受中国传统园艺文化和园艺创新科技带来的快乐。",
      "的建筑设计理念为“升起的地平”，建筑表面机理以植物根系为灵感，庞大的垂坠根系向下不断蔓延"
    ];
    $(this).addClass('on').siblings().removeClass('on');
    $(".tab_nav img").attr("src", "./images/b0" + (index) + ".png");
    $(".tab_con img").attr("src", "./images/img0" + (index) + ".jpg");
    // $(".tab_con").attr("style", "background-image:url(\"images/img0" + (index+1) + ".jpg\")")
    $(".tab_tit").html(tabTit[index-1]);
    $(".tab_jj").html(tabCon[index-1]);
  });

  //侧导航
  $(".side-nav").smartFloat(655);

  //锚点滑动
  $('a[href*=#],area[href*=#]').click(function () {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
      var $target = $(this.hash);
      $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
      if ($target.length) {
        var targetOffset = $target.offset().top;
        $('html,body').animate({
            scrollTop: targetOffset
          },
          1000);
        return false;
      }
    }
  });

});

// 获取产品
function getData(destination, titleId, flag) {
  var $id = $("#" + destination);
  var $main = $(".main");

  //内部函数
  function _innerfunc() {
    if ($.trim($id.html()) === '') {
      $id.html("<p class=\"tips\">\u4ea7\u54c1\u7ef4\u62a4\u4e2d\uff0c\u8bf7\u7a0d\u7b49\u007e");
      $id.css("text-align", "center");
    }
    $main.find(".con").each(function (i, j) {
      $(j).find(".itemtwo").each(function (k, v) {
        if (k % 2 === 1) {
          $(v).css("margin-right", "0");
        }
      });
    });
    $main.find(".con").each(function (i, j) {
      $(j).find(".itemthree").each(function (k, v) {
        if (k % 3 === 2) {
          $(v).css("margin-right", "0");
        }
      });
    });
    $main.find(".con").each(function (i, j) {
      $(j).find(".itemfour").each(function (k, v) {
        if (k % 4 === 3) {
          $(v).css("margin-right", "0");
        }
      });
    });
    $("#" + destination + " .reserve-btn").html("立即预订");
    // $("#con01 .itemtwo:gt(1)").remove();
    $("#con01 .itemtwo").eq(0).find(".corner").css("background","url(./images/corner01.png) no-repeat");
    $("#" + destination + " .price b").each(function () {
      $(this)[0].innerHTML = $(this)[0].innerHTML.replace("起", "起/人")
    });
    scrollNav();
  }

  if (flag) {
    _innerfunc();
  } else {
    $id.html("<img class=\"loading\" src=\"images/loading.gif\"/>");
    $.ajax({
      type: "Get",
      url: "http://activity.aoyou.com/promotion/index?titleID=" + titleId,
      dataType: "jsonp",
      jsonp: "callback",
      cache: false,
      async: true,
      success: function (json) {
        $id.html(json.product);
        _innerfunc();
      }
    });
  }
}

function scrollNav() {
  var wrapper01 = $("#wrapper00").offset().top;
  var wrapper02 = $("#wrapper01").offset().top;
  var wrapper03 = $("#wrapper02").offset().top;
  var wrapper04 = $("#wrapper03").offset().top;
  var wrapper05 = $("#wrapper04").offset().top;
  var wrapper06 = $("#wrapper05").offset().top;
  var wrapper07 = $("#wrapper06").offset().top;
  $(window).scroll(function () {
    var top = $(window).scrollTop();
    if (top >= wrapper01) {
      $(".side-nav li").eq(0).addClass("on").siblings().removeClass("on");
    }
    if (top >= wrapper02) {
      $(".side-nav li").eq(1).addClass("on").siblings().removeClass("on");
    }
    if (top >= wrapper03) {
      $(".side-nav li").eq(2).addClass("on").siblings().removeClass("on");
    }
    if (top >= wrapper04) {
      $(".side-nav li").eq(3).addClass("on").siblings().removeClass("on");
    }
    if (top >= wrapper05) {
      $(".side-nav li").eq(4).addClass("on").siblings().removeClass("on");
    }
    if (top >= wrapper06) {
      $(".side-nav li").eq(5).addClass("on").siblings().removeClass("on");
    }
    if (top >= wrapper07) {
      $(".side-nav li").eq(6).addClass("on").siblings().removeClass("on");
    }
  });
}

function slider() {
  var index = 1,
    len = $('.box .boxcon').size(),
    timer,
    str = '';

  for (var i = 0; i < len; i++) {
    $('.box .boxcon').eq(i).css({'z-index': len - i});
  }

  $('#con04').hover(function () {
    clearInterval(timer);
  }, function () {
    timer = setInterval(function () {
      play(index + 1);
    }, 5000);
  }).mouseleave();

  $(".right").click(function () {
    play(index + 1);
  });
  $(".left").click(function () {
    play(index - 1);
  });

  function play(num) {
    if (!$('.box ').is(':animated')) {
      if (num > len) {
        num = 1;
      } else if (num <= 0) {
        num = len;
      }
      index = num;
      $('.box .boxcon').eq(index - 1).show().siblings().hide();
    }
  }
}

function slider2() {
  var index = 1,
    len = $('.box2 .boxcon2').size(),
    timer,
    str = '';

  for (var i = 0; i < len; i++) {
    $('.box2 .boxcon2').eq(i).css({'z-index': len - i});
  }

  $('#con06').hover(function () {
    clearInterval(timer);
  }, function () {
    timer = setInterval(function () {
      play(index + 1);
    }, 5000);
  }).mouseleave();

  $(".right2").click(function () {
    play(index + 1);
  });
  $(".left2").click(function () {
    play(index - 1);
  });

  function play(num) {
    if (!$('.box2 ').is(':animated')) {
      if (num > len) {
        num = 1;
      } else if (num <= 0) {
        num = len;
      }
      index = num;
      $('.box2 .boxcon2').eq(index - 1).show().siblings().hide();
    }
  }
}

//右侧漂浮
$.fn.smartFloat = function (sidenavtop) {
  var position = function (element) {
    $(window).scroll(function () {
      var scrolls = $(this).scrollTop();
      if (scrolls > sidenavtop) {
        if (window.XMLHttpRequest) {
          element.css({
            position: "fixed",
            top: "0px",
            _top: "0px"
          });
        } else {
          element.css({
            top: scrolls
          });
        }
      } else {
        element.css({
          position: "absolute",
          top: sidenavtop
        });
      }
    });
  };
  return $(this).each(function () {
    position($(this));
  });
};

function resTime(str) {
  var setTime = new Date(str);
  var nowTime = new Date();
  var restSec = setTime.getTime() - nowTime.getTime();
  var day = parseInt(restSec / (60 * 60 * 24 * 1000)+1);
  return day;
}

function diffTime(str) {
  var setTime = new Date(str);
  var nowTime = new Date();
  if (setTime.getTime() - nowTime.getTime() > 0) {
    return true;
  } else {
    return false;
  }
}
