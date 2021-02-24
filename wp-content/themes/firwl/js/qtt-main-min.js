! function(p) {
    "use strict";
    p.qantumthemesMainObj = {
        body: p("body"),
        window: p(window),
        document: p(document),
        htmlAndbody: p("html,body"),
        scrolledTop: 0,
        oldScroll: 0,
        scroDirect: !1,
        clock: !1,
        headerbar: p("#firwlHeaderBar"),
        stickyheader: p("[data-firwl-stickyheader]"),
        glitchInterval: 700,
        glitchPause: 3e3,
        fn: {
            isExplorer: function() {
                return /Trident/i.test(navigator.userAgent)
            },
            isSafari: function() {
                return /Safari/i.test(navigator.userAgent)
            },
            isMobile: function() {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || p.qantumthemesMainObj.window.width() < 1170
            },
            areClipPathShapesSupported: function() {
                for (var t = "clipPath", e = ["webkit", "moz", "ms", "o"], i = [t], a = document.createElement("testelement"), n = "polygon(50% 0%, 0% 100%, 100% 100%)", r = 0, o = e.length; r < o; r++) {
                    var l = e[r] + t.charAt(0).toUpperCase() + t.slice(1);
                    i.push(l)
                }
                for (var r = 0, o = i.length; r < o; r++) {
                    var c = i[r];
                    if ("" === a.style[c] && (a.style[c] = n, "" !== a.style[c])) return p("body").addClass("firwl-clip-enabled"), !0
                }
                return p("body").addClass("firwl-clip-disabled"), !1
            },
            uniqId: function() {
                return Math.round((new Date).getTime() + 100 * Math.random())
            },
            imagesLoaded: function(t) {
                var e = p.firwlXtendObj.fn,
                    i = p(t).find('img[src!=""]');
                if (!i.length) return p.Deferred().resolve().promise();
                var a = [];
                return i.each(function() {
                    var t = p.Deferred();
                    a.push(t);
                    var e = new Image;
                    e.onload = function() {
                        t.resolve()
                    }, e.onerror = function() {
                        t.resolve()
                    }, e.src = this.src
                }), p.when.apply(p, a)
            },
            treeMenu: function() {
                return p(".firwl-menu-tree li.menu-item-has-children").each(function(t, e) {
                    var i = p(e);
                    i.find("> a").after("<a class='firwl-openthis'><i class='material-icons'>keyboard_arrow_down</i></a>"), i.on("click", "> .firwl-openthis", function(t) {
                        return t.preventDefault(), i.toggleClass("firwl-open"), !1
                    })
                }), !0
            },
            activates: function() {
                var e, t = p.qantumthemesMainObj,
                    i = !1;
                t.body.off("click", "[data-firwl-activates]"), t.body.on("click", "[data-firwl-activates]", function(t) {
                    t.preventDefault(), i = p(this).attr("data-firwl-activates"), e = p(i), i && "" !== i || (e = p(this)), "parent" == i && (e = p(this).parent()), "gparent" == i && (e = p(this).parent().parent()), e.toggleClass("firwl-active")
                })
            },
            switchClass: function() {
                var e, i, t = p.qantumthemesMainObj;
                t.body.off("click", "[data-firwl-switch]"), t.body.on("click", "[data-firwl-switch]", function(t) {
                    t.preventDefault(), e = p(p(this).attr("data-firwl-target")), i = p(this).attr("data-firwl-switch"), e.toggleClass(i)
                })
            },
            extractYoutubeId: function(t) {
                if (void 0 === t) return !1;
                var e = t.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
                return null !== e && e[1]
            },
            qtVcVideobg: function() {
                var t, e = p.qantumthemesMainObj.fn,
                    i, a, n;
                jQuery("[data-firwl-video-bg]").each(function() {
                    a = p(this), "function" == typeof insertYoutubeVideoAsBackground && "function" == typeof vcResizeVideoBackground && (insertYoutubeVideoAsBackground(a, e.extractYoutubeId(a.data("firwl-video-bg"))), vcResizeVideoBackground(a))
                })
            },
            YTreszr: function() {
                jQuery("iframe").each(function(t, e) {
                    var i = jQuery(this);
                    if (i.attr("src")) {
                        var a = i.attr("src");
                        if (a.match("youtube.com") || a.match("vimeo.com") || a.match("vevo.com")) {
                            var n = i.parent().width(),
                                r = i.height();
                            i.css({
                                width: n
                            }), i.height(n / 16 * 9)
                        }
                    }
                })
            },
            ipadBgFix: function() {
                var t = p.qantumthemesMainObj,
                    e = t.fn;
                e.isMobile() && e.isSafari() && t.body.addClass("firwl-safari-mobile")
            },
            qtParallax: function() {
                if (void 0 !== p.stellar) {
                    var t = p.qantumthemesMainObj,
                        e = t.body;
                    t.fn.isMobile() || (e.stellar("destroy"), p("[data-firwl-parallax]").imagesLoaded().then(function() {
                        e.stellar({
                            hideDistantElements: !1
                        })
                    }))
                }
            },
            scrolledTop: function() {
                var t = p.qantumthemesMainObj,
                    e = window.pageYOffset || document.documentElement.scrollTop,
                    i = 0;
                return 0 != (i = t.scrolledTop - e) && (t.scroDirect = i), t.scrolledTop = e
            },
            stickyBarLinkPrep: function() {
                var t = p.qantumthemesMainObj,
                    e = p("#wpadminbar"),
                    i = e.outerHeight(),
                    a, n = p("#firwlMenu").outerHeight(),
                    r;
                if (!1 !== t.fn.areClipPathShapesSupported() && (t.OTS = p("#firwl-Sticky"), 0 !== t.OTS.length)) {
                    t.OTSc = p("#firwl-StickyCon");
                    var o = t.OTS,
                        l = o.outerHeight();
                    o.css({
                        height: Math.round(l) + "px"
                    }), o.closest(".firwl-vc-row-container").addClass("firwl-stickybar-parent"), t.StickMeTo = 0, t.whenToStick = p(".firwl-stickybar-parent").position().top - l, 0 < t.stickyheader.length && (t.whenToStick -= n, t.StickMeTo += n), 1 <= e.length && (t.whenToStick -= i, t.StickMeTo += i), t.whenToStick = Math.floor(t.whenToStick), t.StickMeTo = Math.floor(t.StickMeTo)
                }
            },
            stickyBarLink: function(t) {
                var e = p.qantumthemesMainObj,
                    i = e.StickMeTo,
                    a = e.whenToStick,
                    n = e.fn.areClipPathShapesSupported();
                0 !== e.OTS.length && !1 !== n && (a <= t ? (e.OTS.addClass("firwl-stickme"), e.OTSc.addClass("firwl-paper").css({
                    top: i + "px"
                })) : (e.OTSc.removeClass("firwl-paper"), e.OTS.removeClass("firwl-stickme")))
            },
            stickyMenu: {
                pageScrolled: function(t, e) {
                    var i = p.qantumthemesMainObj,
                        a = "firwl-headerbar__sticky__s";
                    "up" === e ? i.headerbar.removeClass(a) : 100 < t && i.headerbar.addClass(a)
                }
            },
            menuItemAlign: function() {
                var t, e = p.qantumthemesMainObj.body,
                    i = e.find("#firwlMenuBar > li.menu-item"),
                    a = e.width() / 2;
                0 != i.length && i.each(function(t, e) {
                    var i = p(e);
                    i.offset().left > a && i.addClass("firwl-iright")
                })
            },
            themeScroll: function() {
                var t = p.qantumthemesMainObj,
                    e = t.fn,
                    i, a;
                !1 !== t.clock && clearInterval(t.clock), t.body.attr("data-firwl-scrolled", 0), t.clock = setInterval(function() {
                    e.scrolledTop(), i = t.scrolledTop, (a = t.oldScroll) !== i && (t.oldScroll = i, e.stickyBarLink(i), t.body.attr("data-firwl-scrolled", i), e.qtScrollSpy.update(i), a + 50 < i && e.stickyMenu.pageScrolled(i, "down"), i < a - 50 && i < 400 && e.stickyMenu.pageScrolled(i, "up"))
                }, 80)
            },
            countDown: {
                cd: p(".firwl-countdown"),
                cdf: this,
                pad: function(t, e) {
                    return t < e ? "0" + t : t
                },
                showclock: function() {
                    var t = p(".firwl-countdown"),
                        e = p.qantumthemesMainObj.fn.countDown;
                    if (t.length < 1) e.remove(t);
                    else if (t.data("firwl-date") && t.data("firwl-time")) {
                        var i, a, n, r = e.cdf,
                            o = "",
                            l = t.data("firwl-now"),
                            c = new Date(l),
                            s = new Date,
                            f = t.data("firwl-date").split("-"),
                            u = t.data("firwl-time").split(":"),
                            d = new Date(f[0], f[1] - 1, f[2], u[0], u[1]),
                            h = d.getTime() / 1e3 - s.getTime() / 1e3,
                            m = d.getTime() - s.getTime();
                        if (h <= 0 || isNaN(h)) return e.remove(t), t;
                        i = Math.floor(h / 86400), h %= 86400, a = Math.floor(h / 3600), h %= 3600, n = Math.floor(h / 60), h = Math.floor(h % 60), m = Math.floor(m % 1e3), 0 != i && (o += "<span>" + e.pad(i, 10) + "</span>"), o += "<span>" + e.pad(a, 10) + "</span>", o += "<span>" + e.pad(n, 10) + "</span>", o += "<span>" + e.pad(h, 10) + "</span>", o += '<span class="firwl-mss">' + e.pad(m, 100) + "</span>", t.html(o)
                    } else e.remove(t)
                },
                remove: function(t) {
                    var e = p.qantumthemesMainObj.fn.countDown;
                    t.closest(".firwl-countdown__container").remove(), e.qtClockInterval && clearInterval(e.qtClockInterval)
                },
                init: function() {
                    var t = p.qantumthemesMainObj.fn.countDown;
                    p(".firwl-countdown").length < 1 || (t.showclock(), t.qtClockInterval = setInterval(function() {
                        t.showclock()
                    }, 12))
                }
            },
            qtScrollSpy: {
                init: function() {
                    function t() {
                        var t = p.qantumthemesMainObj,
                            s = t.fn.areClipPathShapesSupported(),
                            e = t.body,
                            i = p("#firwl-Sticky"),
                            f = 0,
                            a = t.stickyheader,
                            n = p("#wpadminbar"),
                            r = [],
                            o = Math.floor(p(window).height() / 2);
                        t.scrollspycontainer = e.find("[data-firwl-scrollspy]"), 0 < i.length && (f += 70), 0 < a.length && (f += a.find("#firwlMenu").outerHeight()), 0 < n.length && (f += n.outerHeight()), o = Math.floor(o + f / 2), e.attr("data-scrollspy-half", o), t.scrollspycontainer.find("a[href^='#']").each(function(t, e) {
                            var i = p(e),
                                a, n = i.attr("href"),
                                r = p(n);
                            if (0 < r.length) {
                                var o = Math.floor(r.offset().top),
                                    l, c = o + (o + Math.floor(r.outerHeight()) - o) / 2,
                                    a = o - f;
                                r.attr("data-scrollspy-mid", c), s && i.unbind("click").off("click").on("click", function(t) {
                                    return t.preventDefault(), window.scrollTo({
                                        top: a,
                                        left: 0,
                                        behavior: "smooth"
                                    }), !1
                                })
                            }
                        })
                    }
                    var e = setTimeout(t, 600)
                },
                update: function(n) {
                    var t, e = p.qantumthemesMainObj.body,
                        r = Number(e.attr("data-scrollspy-half")),
                        i = p("[data-scrollspy-mid]"),
                        a, o = [],
                        l, c = !1,
                        s = p("#firwl-StickyCon");
                    i.each(function(t, e) {
                        var i = p(e),
                            a = Math.abs(Number(i.attr("data-scrollspy-mid")) - n - r);
                        o.push([a, i.attr("id")])
                    }), o.sort(function(t, e) {
                        return t[0] - e[0]
                    }), void 0 !== o[0] && (l = o[0][1], c && clearTimeout(c), c = setTimeout(function(t) {
                        s.find(".firwl-active").removeClass("firwl-active"), s.find('a[href="#' + l + '"]').addClass("firwl-active")
                    }, 300))
                }
            },
            owlCallback: function(t) {
                var e = t.target,
                    i = t.type,
                    a = t.namespace,
                    n = t.item.count,
                    r = t.item.index,
                    o = t.page.count,
                    l = t.page.index,
                    c = t.page.size
            },
            owlCarousel: function() {
                jQuery.fn.owlCarousel && p(".firwl-owl-carousel").each(function(t, e) {
                    var n = p(e),
                        i = p(e).attr("id"),
                        a, r;
                    n.owlCarousel({
                        loop: n.data("loop"),
                        margin: n.data("gap"),
                        nav: n.data("nav"),
                        dots: n.data("dots"),
                        navText: ['<i class="firwl-arrow firwl-arrow__l"></i>', '<i class="firwl-arrow firwl-arrow__r"></i>'],
                        center: n.data("center"),
                        stagePadding: n.data("stage_padding"),
                        autoplay: 0 < n.data("autoplay_timeout"),
                        autoplayTimeout: n.data("autoplay_timeout"),
                        autoplayHoverPause: n.data("pause_on_hover"),
                        responsive: {
                            0: {
                                items: n.data("items_mobile")
                            },
                            420: {
                                items: n.data("items_mobile_hori")
                            },
                            600: {
                                items: n.data("items_tablet")
                            },
                            1025: {
                                items: n.data("items")
                            }
                        }
                    }), n.hasClass("firwl-multinav-main") && (r = n.data("target"), n.parent().find(".firwl-multinav__controller").find("a:first-child").addClass("current"), n.on("changed.owl.carousel", function(t) {
                        if (t.item) {
                            a = n.find(".active [data-index]").data("index") + 1;
                            var e = t.item.index,
                                i = t.item.count;
                            i < e && (e -= i), e <= 0 && (e += i), n.parent().find(".firwl-multinav__controller .current").removeClass("current"), n.parent().find(".firwl-multinav__controller").find('[data-multinav-controller="' + a + '"]').addClass("current")
                        }
                    })), n.on("click", "[data-multinav-controller]", function(t) {
                        t.preventDefault();
                        var e = p(this),
                            i = e.data("multinav-controller"),
                            a = e.data("multinav-target");
                        p("#" + a).trigger("stop.owl.autoplay", i), p("#" + a).trigger("to.owl.carousel", i), n.parent().find(".firwl-multinav__controller .owl-item a").removeClass("current"), e.addClass("current")
                    })
                })
            },
            qtGlitch: {
                init: function(e, t) {
                    var i = p.qantumthemesMainObj,
                        a = i.fn.qtGlitch,
                        n = e + t;
                    p(".firwl-glitchpicture").imagesLoaded().fadeIn(300).then(function() {
                        a.glitchStart(i), setTimeout(function() {
                            a.glitchStop(i)
                        }, e);
                        var t = setInterval(function() {
                            a.glitchStart(i), setTimeout(function() {
                                a.glitchStop(i)
                            }, e)
                        }, n)
                    })
                },
                glitchStart: function(t) {
                    p(".firwl-glitchtxt, .firwl-decor").addClass("glitching"), t.fn.qtGlitchingParticles.start(p(".firwl-particles__auto")), "function" == typeof p.fn.mgGlitch && p(".firwl-glitchpicture").find("img").mgGlitch({
                        destroy: !1,
                        glitch: !0,
                        scale: !1,
                        blend: !0,
                        blendModeType: "screen",
                        glitch1TimeMin: 600,
                        glitch1TimeMax: 300,
                        glitch2TimeMin: 10,
                        glitch2TimeMax: 115
                    })
                },
                glitchStop: function(t) {
                    if (p(".firwl-glitchtxt, .firwl-decor").removeClass("glitching"), t.fn.qtGlitchingParticles.stop(p(".firwl-particles__auto")), "function" == typeof p.fn.mgGlitch) {
                        var e = p(".glitch-glitchpicture img:first-child");
                        e.mgGlitch({
                            destroy: !0,
                            glitch: !1
                        }), e.removeClass("glitching"), p(".back").removeClass("back"), p(".front-1, .front-2, .front-3").remove()
                    }
                }
            },
            qtGlitchingParticles: {
                init: function(t) {
                    t.find("hr").remove(), t.each(function(e, t) {
                        var i = p(this),
                            a = 8,
                            e, n, r, o;
                        if (!(i.length <= 0)) {
                            for (i.find("hr").remove(), e = 0; e < a; e++) i.append("<hr>");
                            clearInterval(o), o = setInterval(function() {
                                l(i)
                            }, 600), l(i)
                        }

                        function l(t) {
                            for (e = 0; e <= a; e++) t.find("hr").each(function(t, e) {
                                n = p(e), r = Math.floor(20 * Math.random()), n.css({
                                    left: Math.floor(90 * Math.random()) + "%",
                                    top: Math.floor(100 * Math.random()) + "%",
                                    width: 6 + Math.floor(6 * Math.random()) + "px",
                                    height: 6 + Math.floor(6 * Math.random()) + "px"
                                })
                            })
                        }
                    })
                },
                start: function(t) {
                    t.addClass("active")
                },
                stop: function(t) {
                    t.removeClass("active")
                }
            },
            resetOverlay: function() {
                p(".firwl-overlayopen").removeClass("firwl-overlayopen")
            },
            qtMenuDecor: {
                init: function() {
                    var t, r = p.qantumthemesMainObj.fn,
                        e = p("#firwlMenu"),
                        i = p("#firwlMenuBar > li"),
                        a = p("#firwlMenuBar > .current-menu-ancestor"),
                        n = p("#firwlMenuBar > .current-menu-item"),
                        o = p("#firwlMenuBar > li:first-child"),
                        l, c, s = !1,
                        f = !1;
                    if (0 == p("#firwlIndx").length && e.append('<span id="firwlIndx" class="firwl-primary"></span>'), 0 < (s = 0 < a.length ? a : 0 < n.length ? n : o).length) {
                        l = Math.round(s.offset().left) + "px", c = Math.round(s.outerWidth() - 8) + "px", r.qtMenuDecor.upd(l, c);
                        var u = setTimeout(function() {
                            p("#firwlIndx").addClass("firwl-inz")
                        }, 600)
                    }
                    i.off("mouseenter"), i.off("mouseout"), i.on("mouseenter, mouseover", function(t, e) {
                        var i = p(this),
                            a = Math.round(i.offset().left) + "px",
                            n = Math.round(i.outerWidth() - 8) + "px";
                        r.qtMenuDecor.upd(a, n), f && clearTimeout(f)
                    }).on("mouseout", function() {
                        f = setTimeout(function() {
                            r.qtMenuDecor.upd(l, c)
                        }, 300)
                    })
                },
                upd: function(t, e) {
                    jQuery("#firwlIndx").css({
                        transform: "translateX(" + t + ")",
                        width: e
                    })
                }
            },
            initializeAfterAjax: function() {
                var t = p.qantumthemesMainObj,
                    e = t.fn;
                return e.resetOverlay(), e.countDown.init(), e.YTreszr(), e.switchClass(), e.activates(), e.ipadBgFix(), e.qtParallax(), e.qtVcVideobg(), e.qtScrollSpy.init(), e.owlCarousel(), e.qtMenuDecor.init(), e.qtGlitchingParticles.init(jQuery(".firwl-particles__auto")), e.qtGlitch.init(t.glitchInterval, t.glitchPause), !0
            },
            windoeResized: function() {
                var e, t = p.qantumthemesMainObj,
                    i = t.fn,
                    a = t.window,
                    n = a.width(),
                    r = a.height();
                p(window).on("resize", function(t) {
                    clearTimeout(e), e = setTimeout(function() {
                        i.owlCarousel(), i.qtScrollSpy.init(), i.menuItemAlign(), a.height() != r && (i.stickyBarLinkPrep(), i.themeScroll()), a.width() != n && (i.stickyBarLinkPrep(), i.YTreszr()), p("body").hasClass("vc_editor") && i.qtGlitchingParticles.init(jQuery(".firwl-particles__auto"))
                    }, 500)
                })
            },
            init: function() {
                var t = p.qantumthemesMainObj.fn;
                t.treeMenu(), t.stickyBarLinkPrep(), t.themeScroll(), t.initializeAfterAjax(), t.areClipPathShapesSupported(), t.menuItemAlign(), t.windoeResized()
            }
        }
    }, jQuery(document).ready(function() {
        p.qantumthemesMainObj.fn.init()
    })
}(jQuery);
//# sourceMappingURL=qtt-main-min.js.map