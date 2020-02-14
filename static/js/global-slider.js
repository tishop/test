function loadbg(n) {
	$(".blackground").fadeOut(100);
	var i = new Image();
	i.src =theme+"images/bg/"+n+".jpg";
	$(".colorful_loading_frame,.colorful_loading").css("display", "block");
	$("#lmhblog").addClass("loading");
    if (typeof(myhkplayer) != "undefined") {myhkTips.show("第"+n+"张背景 - 加载中...")};
	i.onload = function() {
		jQuery(".bg-image").attr("src", i.src);
		RootCookies.SetCookie("myhk_bg",n, 30);
		bgid=n;
		$(".colorful_loading_frame,.colorful_loading").css("display", "none");
		$("#lmhblog").removeClass("loading")
	};
}
function grin(a) {
	var b;
	a = " " + a + " ";
	if (document.getElementById("comment") && "textarea" == document.getElementById("comment").type) b = document.getElementById("comment");
	else return !1;
	if (document.selection) b.focus(), sel = document.selection.createRange(), sel.text = a, b.focus();
	else if (b.selectionStart || "0" == b.selectionStart) {
		var c = b.selectionEnd,
			d = c;
		b.value = b.value.substring(0, b.selectionStart) + a + b.value.substring(c, b.value.length);
		d += a.length;
		b.focus();
		b.selectionStart = d;
		b.selectionEnd = d
	} else b.value += a, b.focus()
}
function weixin(a) {
	$(".blackground").fadeIn(100);
	$(".boxtitle").html('<i class="fa fa-qrcode"></i> <span style="color:#f00">微信</span> 扫一扫关注')
	$(".logbox,.boxpic").animate({
		opacity: "show",
		marginTop: "-170px"
		}, "slow")
	hidebox()
	$(".boxpic").html('<img src="'+theme+'images/pjax_loading.gif" style="width:30px;height:30px;margin:125px">')
	var wx = new Image();
	wx.src =a;
	wx.onload = function() {
		setTimeout(function() {
			$(".boxpic").html('<img src="'+wx.src+'" style="width:300px;height:280px;margin-top:-10px">')
		}, 1000)
	};
};
function dashang(a) {
	$(".blackground").fadeIn(100);
	$(".boxtitle").html('<i class="fa fa-qrcode"></i> <span style="color:#f00">QQ 微信 支付宝</span> 扫一扫打赏')
	$(".logbox,.boxpic").animate({
		opacity: "show",
		marginTop: "-170px"
		}, "slow")
	hidebox()
	$(".boxpic").html('<img src="'+theme+'images/pjax_loading.gif" style="width:30px;height:30px;margin:125px">')
	var sk = new Image();
	sk.src ='https://api.lmih.cn/api/skqrapi.php?url='+encodeURIComponent('https://api.lmih.cn/shoukuan' + a);
	sk.onload = function() {
		setTimeout(function() {
			$(".boxpic").html('<img src="'+sk.src+'" style="width:300px;height:280px;margin-top:-10px">')
		}, 1000)
	};
};

function isNum(a) {
	return /^[0-9]+$/.test(a)
}
jQuery(document).ready(function() {
	pjaxdone()
});
function get_emailinfo() {
	if ("" != jQuery("#email").val()) if (-1 != jQuery("#email").val().indexOf("qq.com")) {
		var a = jQuery("#email").val().replace("@qq.com", "");
		isNum(a) ? ($("#email .emailavatar,#qq i").hide(), $("#email i,#qq .emailavatar").show(), $("#nickqq").val(a), jQuery("#qq .emailavatar").attr("src", theme+"images/pjax_loading.gif"), setTimeout(function() {
			jQuery("#qq .emailavatar").attr("src", "https://q1.qlogo.cn/g?b=qq&nk=" + a + "&s=40")
		}, 1E3)) : ($("#nickqq").val(""), $("#qq .emailavatar,#email i").hide(), $("#qq i,#email .emailavatar").show(), jQuery("#email .emailavatar").attr("src", theme+"images/pjax_loading.gif"), setTimeout(function() {
			jQuery("#email .emailavatar").attr("src", "https://secure.gravatar.com/avatar.php?gravatar_id=" + hex_md5(jQuery("#email").val())) + "&size=32&d=monsterid&r=G&default=https://lmih.cn/content/templates/lmih.cn/gravatar/default.jpg"
		}, 1E3))
	} else "" != jQuery("#email").val() && ($("#nickqq").val(""), $("#qq .emailavatar,#email i").hide(), $("#qq i,#email .emailavatar").show(), jQuery("#email .emailavatar").attr("src", theme+"images/pjax_loading.gif"), setTimeout(function() {
		jQuery("#email .emailavatar").attr("src", "https://secure.gravatar.com/avatar.php?gravatar_id=" + hex_md5(jQuery("#email").val())) + "&size=32&d=identicon&r=G&default=https://lmih.cn/content/templates/lmih.cn/gravatar/default.jpg"
	}, 1E3));
	else $("#email i").show(), $("#email .emailavatar").hide()
}
function get_qqinfo() {
	if ("" != jQuery("#nickqq").val()) {
		var a = jQuery("#nickqq").val();
		isNum(a) ? ($("#qq i,#email .emailavatar").hide(), $("#qq .emailavatar,#email i").show(), jQuery("#qq .emailavatar").attr("src", theme+"images/pjax_loading.gif"), $("#usb").attr("disabled", "disabled"), $("#nickname").val("昵称获取中..."), $.ajax({
			type: "GET",
			url: "/qq.php?qq=" + a,
			data: "",
			cache: !1,
			dataType: "html",
			success: function(b) {
				"" != b ? $("#nickname").val(b) : $("#nickname").val("匿名");
				$("#usb").removeAttr("disabled")
			},
			error: function(b, a, d) {
				$("#nickname").val("昵称获取失败");
				$("#usb").removeAttr("disabled")
			}
		}), setTimeout(function() {
			jQuery("#qq .emailavatar").attr("src", "https://q1.qlogo.cn/g?b=qq&nk=" + a + "&s=40")
		}, 1E3), $("#email").val(a + "@qq.com"), $("#comurl").val("http://user.qzone.qq.com/" + a)) : ($("#email .emailavatar,#qq .emailavatar").hide(), $("#email i,#qq i").show(), $("#nickqq").val(""),alert("QQ号码有误！"))
	} else $("#qq i").show(), $("#qq .emailavatar").hide()
}
jQuery.fn.navFixed = function() {
	function a() {
		c >= d ? (b.css("position", "fixed"), b.css("top", "0"), b.css("border-radius", "0"), b.css("width", "100%"),$("#mmenu,#header1").css("position", "fixed"), $("#header1").css("top", "0"), $("#mmenu").css("top", "53px")) : ($("#mmenu").css("position", "absolute"),$("#mmenu").css("top", "0"), $("#header1").css("position", "relative"),b.css("position", "relative"), b.css("width", "1366px"), b.css("border-radius", "5px"))
	}
	var b = $(this);
	parseInt(b.prev().css("margin-bottom").substring(0, b.prev().css("margin-bottom").length - 2));
	parseInt(b.next().css("margin-top").substring(0, b.next().css("margin-top").length - 2));
	var c = $(document).scrollTop(),
		d = b.prev().outerHeight(!0);
	a();
	$(document).scroll(function() {
		c = $(document).scrollTop();
		a()
	});
	$(window).resize(function() {
		d = b.prev().outerHeight(!0);
		a()
	})
};

function AutoScroll(a) {
	$(a).find("ul:first").animate({
		marginTop: "-10px"
	}, 300, function() {
		$(this).css({
			marginTop: "0px"
		}).find("li:first").appendTo(this)
	})
}
$(function() {
	$t = setInterval('AutoScroll(".text")', 3E3);
	$(".text").hover(function() {
		clearInterval($t)
	}, function() {
		$t = setInterval('AutoScroll(".text")', 5E3)
	})
});

function tooltip() {
	$("a,div,li,h3,h4,img,i").each(function() {
		$("#tooltip").remove();
		if (this.title) {
			var a = this.title;
			$(this).mouseover(function(b) {
				this.title = "";
				$("body").append('<div id="tooltip">' + a + "</div>");
				$("#tooltip").css({
					left: b.pageX - 15 + "px",
					top: b.pageY + 30 + "px",
					opacity: "0.8"
				}).fadeIn(250)
			}).mouseout(function() {
				this.title = a;
				$("#tooltip").remove()
			}).mousemove(function(b) {
				$("#tooltip").css({
					left: b.pageX - 15 + "px",
					top: b.pageY + 30 + "px"
				})
			})
		}
	})
}(function(a) {
	a.fn.WIT_SetTab = function(b) {
		function c(a) {
			b.Field.filter(":visible").fadeOut(b.OutTime, function() {
				b.Field.eq(a).fadeIn(b.InTime).siblings().hide()
			});
			b.Nav.eq(a).addClass(b.CurCls).siblings().removeClass(b.CurCls)
		}
		b = a.extend({
			Nav: null,
			Field: null,
			K: 0,
			CurCls: "cur",
			Auto: !1,
			AutoTime: 5E3,
			OutTime: 100,
			InTime: 150,
			CrossTime: 60
		}, b || {});
		var d = null,
			f = !1,
			h = null;
		c(b.K);
		b.Nav.hover(function() {
			b.K = b.Nav.index(this);
			b.Auto && clearInterval(h);
			f = a(this).hasClass(b.CurCls);
			d = setTimeout(function() {
				f || c(b.K)
			}, b.CrossTime)
		}, function() {
			clearTimeout(d);
			b.Ajax && b.AjaxFun();
			b.Auto && (h = setInterval(function() {
				b.K++;
				c(b.K);
				b.K == b.Field.size() && (c(0), b.K = 0)
			}, b.AutoTime))
		}).eq(0).trigger("mouseleave")
	}
})(jQuery);
$(function() {
	$(document).WIT_SetTab({
		Nav: $("#J_setTabANav>ul>li"),
		Field: $("#J_setTabABox>div>ul"),
		CurCls: "hover"
	});
	$(document).WIT_SetTab({
		Nav: $("#J_setTabBNav>ul>li"),
		Field: $("#J_setTabBBox>div>ul"),
		Auto: !0,
		CurCls: "hover"
	})
});

function size(a) {
	a.innerHTML = "A" == a.innerHTML ? "A+" : "A+" == a.innerHTML ? "A-" : "A"
}
function embedImage() {
	var a = prompt("请输入图片的 URL 地址（包含http://）:", "http://");
	a && (document.getElementById("comment").value = document.getElementById("comment").value + "[img]" + a + "[/img]")
}
function strong() {
	var a = prompt("请输入需要加粗的文字:");
	a && (document.getElementById("comment").value = document.getElementById("comment").value + "[strong]" + a + "[/strong]")
}
function em() {
	var a = prompt("请输入需要斜体的文字:");
	a && (document.getElementById("comment").value = document.getElementById("comment").value + "[em]" + a + "[/em]")
}
function del() {
	var a = prompt("请输入需要删除线的文字:");
	a && (document.getElementById("comment").value = document.getElementById("comment").value + "[del]" + a + "[/del]")
}
function url1() {
	var a = prompt("请输入链接的 URL 地址（包含http://）:", "http://");
	a && (document.getElementById("comment").value = document.getElementById("comment").value + "[url]" + a + "[/url]")
}
function underline() {
	var a = prompt("请输入需要下划线的文字:");
	a && (document.getElementById("comment").value = document.getElementById("comment").value + "[u]" + a + "[/u]")
}
function code() {
	var a = prompt("请粘贴代码:");
	a && (document.getElementById("comment").value = document.getElementById("comment").value + "[code]" + a + "[/code]")
}
function quote() {
	var a = prompt("请粘贴引用内容:");
	a && (document.getElementById("comment").value = document.getElementById("comment").value + "[blockquote]" + a + "[/blockquote]")
}
function qq() {
	var a = prompt("请输入QQ号:");
	a && (document.getElementById("comment").value = document.getElementById("comment").value + "[qq]" + a + "[/qq]")
}
function embedSmiley() {
	"none" == $(".smilebg").css("display") ? $(".smilebg").slideDown(200) : $(".smilebg").slideUp(200)
}
function checkLength(a) {
	if (250 < a.value.length) return alert("您填写的评论内容已经超出250个字！"), a.value = a.value.substring(0, 250), !1;
	a = 250 - a.value.length;
	document.getElementById("num").innerHTML = a.toString();
	return !0
}
function showreply() {
	$(".form").slideToggle(500, "easeOutExpo")
}
function commentReply(a, b) {
	var c = document.getElementById("comment-post");
	b.style.display = "none";
	document.getElementById("cancel-reply").style.display = "";
	document.getElementById("comment-pid").value = a;
	b.parentNode.parentNode.appendChild(c)
}
function cancelReply() {
	var a = document.getElementById("comment-place"),
		b = document.getElementById("comment-post");
	document.getElementById("comment-pid").value = 0;
	$(".reply a").css({
		display: ""
	});
	document.getElementById("cancel-reply").style.display = "none";
	a.appendChild(b)
}
function b2top(a, b, c) {
	if (10 >= b && 0 <= b) {
		var d = 100 * b;
		$(a).css({
			backgroundPosition: "0 -" + d + "px"
		});
		setTimeout("b2top('" + a + "'," + (c ? b + 1 : b - 1) + "," + c + ")", 50)
	}
}
$(document).ready(function(a) {
	a(function() {
		a("body").dblclick(function() {
			var b = a(window),
				c = b.scrollTop(),
				d = (c - 0) / 5,
				f = c,
				h = setInterval(function() {
					0 >= (f - 0) * (c - 0) ? (clearInterval(h), c = f = 0, b.scrollTop(0)) : (f = c, b.scrollTop(c -= d))
				}, 20),
				e = a("#top").children(":first");
			e.stop().show().animate({}, function() {
				a(this).css({})
			});
			e.parent().append(e)
		});
		a("#top").dblclick(function(a) {
			a.stopPropagation()
		})
	})
});
var a_idx = 0;
jQuery(document).ready(function($) {
    $("body").click(function(e){
		var a = new Array("富强", "民主", "文明", "和谐", "自由", "平等", "公正", "法治", "爱国", "敬业", "诚信", "友善");
        var $i = $("<span/>").text(a[a_idx]); //text(a[Math.floor(Math.random()*a.length)]); //text("+1s");
		a_idx = (a_idx + 1) % a.length;
        var x = e.pageX, y = e.pageY;
        $i.css({
            "z-index":99999,
            "top":y-20,
            "left":x,
            "position":"absolute",
            "color":"#0c0"
        });
        $("body").append($i);
        $i.animate(
            {"top":y-180,"opacity":0},
            1500,
            function(){$i.remove();}
        );
    });
});
function checkReg() {
	var a = $("input[name=username]").val().replace(/(^\s*)|(\s*$)/g, ""),
		b = $("input[name=password]").val().replace(/(^\s*)|(\s*$)/g, ""),
		c = $("input[name=password2]").val().replace(/(^\s*)|(\s*$)/g, "");
	$("input[name=imgcode]").val().replace(/(^\s*)|(\s*$)/g, "");
	if (a.match(/\s/) || b.match(/\s/)) return alert("用户名和密码中不能有空格"), !1;
	if (4 > a.length || 4 > b.length) return alert("用户名和密码都不能小于4位！"), !1;
	if (b != c) return alert("两次输入密码不相等！"), !1
}
function hidebox() {
	$("#dashang,.Share").animate({
		opacity: "hide",
		marginTop: "-300px"
	}, "slow")
}
function pjaxdone() {
	var OriginTitile = document.title, titleTime;
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            document.title = blog;
            clearTimeout(titleTime);
        } else {
            document.title = blog1;
            titleTime = setTimeout(function() {
                document.title = OriginTitile;
            },clsq*1000);
        }
    });
	window.RootCookies = {};
	window.RootCookies.SetCookie = function(a, b, c) {
		var d = new Date;
		d.setTime(d.getTime() + 864E5 * c);
		document.cookie = a + "=" + escape(b) + (null == c ? "" : ";expires=" + d.toGMTString()) + ";path=/"
	};
	$("a[target!=_blank]").unbind("click");
	$(function() {
			$("pre").addClass("prettyprint linenums").attr("style", "overflow:auto"), window.prettyPrint && prettyPrint()
		}), $("#slider").carousel({
			interval: 5e3
		})
	$(function() {
		jQuery(function() {
			var a = 13;
			$(".size").click(function() {
				13 == a ? (a += 3, $(".post-context,.post-context pre").css("font-size", a + "px"), $(".size").css({
					"box-shadow": "inset 0px 0px 10px #cccccc",
					"border": "1px #0c0 solid",
					"font-weight": "bold"
				})) : 16 == a ? (a -= 4, $(".post-context,.post-context pre").css("font-size", a + "px"), $(".size").css({
					"box-shadow": "inset 0px 0px 10px #cccccc",
					"border": "1px #0c0 solid",
					"font-weight": "bold"
				})) : (a = 13, $(".post-context,.post-context pre").css("font-size", a + "px"), $(".size").css({
					"box-shadow": "none",
					"border": "none",
					"font-weight": "normal"
				}))
			})
		})
	});
	$("#showbox").click(function() {
		$(".blackground").fadeIn(100);
		$("#imgul li").css("border", "solid #fff 3px");
		$("#bg-images_tanchu").addClass("bg-images_tanchu");
		$("#changebg").addClass("kaiguan");
		$("#changebg").addClass("flipInX animated");
		setTimeout(function() {
			$("#changebg").removeClass("flipInX")
		}, 800)
	});
	$("#kaiguan").click(function() {
		$(".blackground").fadeOut(100);
		$("#imgul li").css("border", "solid #fff 3px");
		$("#changebg").addClass("flipOutX animated");
		setTimeout(function() {
			$("#changebg").removeClass("flipOutX");
			$("#bg-images_tanchu").removeClass("bg-images_tanchu");
			$("#changebg").removeClass("kaiguan")
		}, 800)
	});
	$("#imgul>li").hover(function() {
		$("#imgul li").css("border", "solid #fff 3px");
		$(this).css("border", "solid #0c0 3px")
	});
	$("#imgul>li").click(function() {
		$("#imgul li").css("border", "solid #fff 3px");
		$("#imgul li").find("i").removeClass("fa fa-check-circle fa-2x checkit");
		$(this).find("i").addClass("fa fa-check-circle fa-2x checkit");
		$("#changebg").addClass("flipOutX animated");
		setTimeout(function() {
			$("#changebg").removeClass("flipOutX");
			$("#bg-images_tanchu").removeClass("bg-images_tanchu");
			$("#changebg").removeClass("kaiguan");
			try {
				if ("undefined" != typeof myhkplayer) return myhkTips.show("第" + bgid + "张背景 - 保存成功"), !0
			} catch (a) {}
			return !1
		}, 500)
	});
	$("#content").find(".toggler").click(function() {
		"展开归档" == jQuery(this).text() ? ($(".archives").find("ul").show(), jQuery(this).text("折叠归档")) : ($(".archives").find("ul").hide(), jQuery(this).text("展开归档"));
		return !1
	});
	$(function() {
		jQuery(function() {
			var meta = document.getElementsByTagName('meta');
			var a = encodeURIComponent(location.href),
				b = encodeURIComponent(document.title);
			$(".Share li a.share1").click(function() {
				window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + a + "&title=" + b, "newwindow", "width=650,height=500")
				$(".blackground").fadeOut(100);
				hidebox()
			});
			$(".Share li a.share2").click(function() {
				window.open("http://v.t.sina.com.cn/share/share.php?url=" + a + "&title=" + b + "&source=bookmark&appkey=1903104813", "newwindow", "width=650,height=500")
				$(".blackground").fadeOut(100);
				hidebox()
			});
			$(".go-qrcode,.Share li a.share3").click(function() {
				$(".blackground").fadeIn(100);
				$(".boxtitle").html('<i class="fa fa-qrcode"></i> 扫一扫二维码分享')
				$(".logbox,.boxpic").animate({
					opacity: "show",
					marginTop: "-170px"
				}, "slow")
				hidebox()
				$(".boxpic").html('<img src="'+theme+'images/pjax_loading.gif" style="width:30px;height:30px;margin:125px">')
				var wx = new Image();
				wx.src ='https://api.lmih.cn/api/qrapi.php?level=H&size=10&url=' + a + '.jpg';
				wx.onload = function() {
					setTimeout(function() {
						$(".boxpic").html('<img src="'+wx.src+'" style="width:300px;height:280px;margin-top:-10px">')
						}, 1000)
				};
			});
			$(".Share li a.share4").click(function() {
				window.open("http://connect.qq.com/widget/shareqq/index.html?url=" + a + "&showcount=0&desc=" + b + "&title=" + b + "&site=" + a + "&pics=", "newwindow", "width=800,height=600")
				$(".blackground").fadeOut(100);
				hidebox()
			});
			$(".Share li a.share5").click(function() {
				window.open("https://www.douban.com/share/service?href=" + a + "&name=" + b, "newwindow", "width=650,height=500")
				$(".blackground").fadeOut(100);
				hidebox()
			});
			$(".qiandao").click(function() {
				$(".num").text("193");
				$body.animate({
					scrollTop: $("#comment-post").offset().top - 200
					}, 1002);
				$(".blackground").fadeIn(100)
				$(".tijiao").slideDown(300)
				return !1
			});
			$(".open,.fenxiang").click(function() {
				$(".blackground").fadeIn(100);
				$(".Share").animate({
					opacity: "show",
					marginTop: "-65px"
				}, "slow")
			});
			$(".close a").click(function() {
				$(".boxtitle,.boxpic").html('')
				$(".blackground").fadeOut(100);
				hidebox()
			})
			$(".closebox a").click(function() {
				$(".blackground").fadeOut(100);
				$(".logbox,#dashang").animate({
					opacity: "hide",
					marginTop: "-300px"
				}, "slow")
			})
		})
	});
	$(function(a) {
		a("#head-nav").navFixed()
	});
	$(document).WIT_SetTab({
		Nav: $("#J_setTabANav>ul>li"),
		Field: $("#J_setTabABox>div>ul"),
		CurCls: "hover"
	});
	$(document).WIT_SetTab({
		Nav: $("#J_setTabBNav>ul>li"),
		Field: $("#J_setTabBBox>div>ul"),
		Auto: !0,
		CurCls: "hover"
	});
	$(".fullscreen").click(function() {
		$(".fullscreen i").hasClass("fa fa-share") ? (RootCookies.SetCookie("myhk_sidebar", "no", 30), $("#sidebar").css("display", "none"), $("#content").css("border-right", "0px dashed #ccc"), $("#content").animate({
			width: "100%"
		}, "slow"), $(".fullscreen i").removeClass("fa fa-share"), $(".fullscreen i").addClass("fa fa-reply")) : (RootCookies.SetCookie("myhk_sidebar", "no", -1), $("#sidebar").css("display", "block"), $("#content").css("border-right", "1px dashed #ccc"), $("#content").animate({
			width: "966px"
		}, "slow"), $(".fullscreen i").removeClass("fa fa-reply"), $(".fullscreen i").addClass("fa fa-share"))
	});
	$(".go-comment").click(function() {
		$body.animate({
			scrollTop: $("#comment-post").offset().top - 200
		}, 1002);
		return !1
	});
	$(".link-back2top").click(function() {
		$body.animate({
			scrollTop: $("#header").offset().top - 200
		}, 1E3);
		return !1
	});
	$(".open2").click(function() {
		$(".blackground").fadeIn(100)
		$(".tijiao").slideDown(300)
	});
	$(".close2 a").click(function() {
		$(".blackground").fadeOut(100);
		$(".tijiao").slideUp(300)
	});
	$(".post-title a").hover(function() {
		$(this).stop().animate({
			marginLeft: "4px"
		}, "fast")
	}, function() {
		$(this).stop().animate({
			marginLeft: "0px"
		}, "fast")
	});
	$(".dropdown").hover(function() {
		$(this).children(".sub-menu").show(200)
	}, function() {
		$(this).children(".sub-menu").hide(200)
	});
	$(function() {
		jQuery(function() {
			function a(a, b, c) {
				if (document.selection) a.focus(), sel = document.selection.createRange(), c ? sel.text = b + sel.text + c : sel.text = b, a.focus();
				else if (a.selectionStart || "0" == a.selectionStart) {
					var e = a.selectionStart,
						k = a.selectionEnd,
						g = k;
					c ? a.value = a.value.substring(0, e) + b + a.value.substring(e, k) + c + a.value.substring(k, a.value.length) : a.value = a.value.substring(0, e) + b + a.value.substring(k, a.value.length);
					c ? g += b.length + c.length : g += b.length - k + e;
					e == k && c && (g -= c.length);
					a.focus();
					a.selectionStart = g;
					a.selectionEnd = g
				} else a.value += b + c, a.focus()
			}
			var b = (new Date).toLocaleTimeString(),
				c = document.getElementById("comment") || 0;
			window.SIMPALED = {};
			window.SIMPALED.Editor = {
				qiandao: function() {
					$(".num").text("193");
					a(c, "[blockquote]签到成功！签到时间：" + b, "，每日打卡，生活更精彩哦~[/blockquote]")
				},
				good: function() {
					$(".num").text("204");
					a(c, "[blockquote][F1] 好羞射，文章真的好赞啊，顶博主！[/blockquote]")
				},
				bad: function() {
					$(".num").text("199");
					a(c, "[blockquote][F14] 有点看不懂哦，希望下次写的简单易懂一点！[/blockquote]")
				}
			}
		})
	});
	$body = window.opera ? "CSS1Compat" == document.compatMode ? $("html") : $("body") : $("html,body");
	$("a[href*=#comment]").click(function() {
		if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
			var a = $(this.hash),
				a = a.length && a || $("[name=" + this.hash.slice(1) + "]");
			if (a.length) return a = a.offset().top, $("html,body").animate({
				scrollTop: a
			}), !1
		}
	});
	$(window).scroll(function() {
		200 < $(this).scrollTop() ? $(".backtop").fadeIn() : $(".backtop").fadeOut()
	});
	$(".backtop").hover(function() {
		b2top(".backtop", 0, !0)
	}, function() {
		b2top(".backtop", 3)
	}).click(function() {
		$("body,html").animate({
			scrollTop: 0
		}, 600, function() {});
		b2top(".backtop", 3)
	});
	$(".archives").find("ul").hide();
	$(".archives").find(eqi).show();
	$(".archives h4").click(function() {
		$(this).next("ul").slideToggle("fast")
	});
	$("#newlog li a,#randlog li a,#hotlog li a,#record li a,#blogsort li a,.tab_box li a,#link li a").hover(function() {
		$(this).stop().animate({
			marginLeft: "4px"
		}, "fast")
	}, function() {
		$(this).stop().animate({
			marginLeft: "0px"
		}, "fast")
	});
	$(".open-nav").click(function(){$("#mmenu").toggleClass("has-opened")})
	$("#mmenu .catbtn ul").hide();
	$("#mmenu .catbtnx").click(function() {
		$(this).next("ul").slideToggle("fast")
	});
	$("#reset").click(function() {
		$(".num").text("250");
		$(".zujian").show()
	});
	$('.fancybox').fancybox();$("a[href$=jpg],a[href$=png],a[href$=gif],a[href$=jpeg],a[href$=bmp]").attr({"data-fancybox":"gallery"});$("[data-fancybox]").fancybox({buttons: ["slideShow","fullScreen","zoom","thumbs","arrowLeft","arrowRight","close"]});
	$(function() {
		jQuery(function(a) {
			a.fn.WIT_SetTab = function(b) {
				function c(a) {
					b.Field.filter(":visible").fadeOut(b.OutTime, function() {
						b.Field.eq(a).fadeIn(b.InTime).siblings().hide()
					});
					b.Nav.eq(a).addClass(b.CurCls).siblings().removeClass(b.CurCls)
				}
				b = a.extend({
					Nav: null,
					Field: null,
					K: 0,
					CurCls: "cur",
					Auto: !1,
					AutoTime: 5E3,
					OutTime: 100,
					InTime: 150,
					CrossTime: 60
				}, b || {});
				var d = null,
					f = !1,
					h = null;
				c(b.K);
				b.Nav.hover(function() {
					b.K = b.Nav.index(this);
					b.Auto && clearInterval(h);
					f = a(this).hasClass(b.CurCls);
					d = setTimeout(function() {
						f || c(b.K)
					}, b.CrossTime)
				}, function() {
					clearTimeout(d);
					b.Ajax && b.AjaxFun();
					b.Auto && (h = setInterval(function() {
						b.K++;
						c(b.K);
						b.K == b.Field.size() && (c(0), b.K = 0)
					}, b.AutoTime))
				}).eq(0).trigger("mouseleave")
			}
		})
	});
	$(".smile").click(function() {
		$(".smilebg").slideUp(200)
	});
	$("#commentform").submit(function() {
		if ($("#simi_comment").is(":checked")) {
            $("[name=comment]").val("[私密评论]" + $("[name=comment]").val());
        }
		var a = $("#commentform").serialize();
		$("#comment,#comment-post .tex").attr("disabled", "disabled");
		$(".ajaxloading").show();
		$("#usb,.nop").hide();
		$.post($("#commentform").attr("action"), a, function(a) {
			var c = /<div class=\"main\">[\r\n]*<p>(.*?)<\/p>/i;
			c.test(a) ? ($(".error").html(a.match(c)[1]).show().fadeOut(4E3), $(".ajaxloading").hide(),$(".blackground").fadeOut(100), $("#usb,.nop").show()) : (c = $("input[name=pid]").val(), cancelReply(), $("[name=comment]").val(""), $(".post-context").html($(a).find(".post-context").html()), $(".commentlist").html($(a).find(".commentlist").html()), 0 != c ? (a = window.opera ? "CSS1Compat" == document.compatMode ? $("html") : $("body") : $("html,body"), a.animate({
				scrollTop: $("#comment-" + c).offset().top - 20
			}, "normal", function() {
				$(".ajaxloading").hide();
				$(".blackground").fadeOut(100);
				$("#usb").show();
				$(".tijiao").slideUp(300)
			})) : (a = window.opera ? "CSS1Compat" == document.compatMode ? $("html") : $("body") : $("html,body"), a.animate({
				scrollTop: $(".commentlist").offset().top - 20
			}, "normal", function() {
				$(".ajaxloading").hide();
				$(".blackground").fadeOut(100);
				$("#usb").show();
				$(".tijiao").slideUp(300)
			})));
			$("a[href*=#comment]").click(function() {
				if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
					var a = $(this.hash),
						a = a.length && a || $("[name=" + this.hash.slice(1) + "]");
					if (a.length) return a = a.offset().top, $("html,body").animate({
						scrollTop: a
					}), !1
				}
			});
			if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i))) {
              $("#tooltip").hide();
            }else{
              tooltip();
            };
			$("#comment,#comment-post .tex").attr("disabled", !1)
		});
		return !1
	});
	$(function() {
		jQuery(function() {
			var a = $(".search input"),
				b = $(".search button"),
				c = $(".search .result"),
				d = $(".search .result div");
			a.focus(function() {
				"输入关键字自动全文搜索..." == a.val() && a.val("")
			});
			a.blur(function() {
				"" == a.val() && (a.val("输入关键字自动全文搜索..."), b.stop().fadeOut())
			});
			a.keydown(function() {
				clearTimeout("t")
			}).keypress(function() {
				clearTimeout("t")
			});
			a.keyup(function() {
				0 < a.val().length ? (b.fadeIn(), 1 < a.val().length && (b.addClass("load"), t = setTimeout(function() {
					d.load(theme.replace("/content/templates/colorful/", "/")+"pjaxsearch.php?k=" + a.val()+"&u="+theme, function() {
						c.fadeIn();
						c.find("h2 span").html(a.val());
						b.removeClass("load")
					})
				}, 1E3))) : (b.stop().fadeOut(), c.stop().fadeOut())
			});
			b.click(function() {
				b.stop().fadeOut();
				c.stop().fadeOut()
			});
			c.click(function() {
				c.stop().fadeOut();
				a.val("输入关键字自动全文搜索...");
				b.stop().fadeOut()
			})
		})
	});
	$(function() {
		jQuery(function() {
			jQuery("#nickqq").blur(function() {
				get_qqinfo()
			})
		})
	});
	$(function() {
		jQuery(function() {
			jQuery("#email").blur(function() {
				get_emailinfo()
			})
		})
	});
	pause();
	if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i))) {
		$("#tooltip").hide();
	}else{
		tooltip();
	};
	pjaxfooter();
	$(".colorful_loading_frame,.colorful_loading").css("display", "none")
}

pjaxstart();

function pjaxstart() {
	$(document).pjax("a[target!=_blank]", "#lmhblog", {
		fragment: "#lmhblog",
		timeout: 1E4
	});
	$(document).on("submit", "form", "button", function(a) {
		$.pjax.submit(a, "#lmhblog", {
			fragment: "#lmhblog",
			timeout: 1E4
		})
	});
	$(document).on("pjax:send", function() {
		$("#lmhblog").addClass("loading")
		$(".colorful_loading_frame,.colorful_loading").css("display", "block")
	});
	$(document).on("pjax:complete", function() {
		window.location.hash ? $("html,body").stop().animate({
			scrollTop: $(window.location.hash).offset().top - 130
		}, 500) : $("html,body").stop().animate({
			scrollTop: 0
		}, 0);
		pjaxdone();
		$(".colorful_loading_frame,.colorful_loading").css("display", "none")
		$("#lmhblog").removeClass("loading")
		$(".open-nav").click(function(){$("#mmenu").toggleClass("has-opened")})
		$("#tooltip").hide()
		$("#tooltip").remove()
		try {
			if ("undefined" != typeof myhkplayer) return myhkTips.show(document.title + " - 加载完成"), !0
		} catch (a) {}
		return !1
	})
}
function play(a, b) {
	try {
		if ("undefined" != typeof myhkplayer && -1 == document.cookie.indexOf("myhk_player=") && songId + 1 != b) return music(a, b), !0
	} catch (c) {}
	return !1
};
function pause(){
	 try {
        if (typeof(myhkplayer) == "undefined") {
            //alert("value is undefined"); 
            return false;
        } else {
			if($(".post-context .video,.dplayer").length){
				$("#sidebar").css("display", "none");
				$("#content").css("border-right", "0px dashed #ccc");
				$("#content").animate({width: "100%"}, "slow");
				audio.pause();
				}else{
		//audio.play();
		}
	  }
	} catch(e) {}
}