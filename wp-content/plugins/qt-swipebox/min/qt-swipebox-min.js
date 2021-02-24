/*! Swipebox v1.4.5 | Constantin Saguin csag.co | MIT License | github.com/brutaldesign/swipebox */ ! function(e, t, i, s) {
    i.swipebox = function(s, o) {
        var n, a = {
                useCSS: !0,
                useSVG: !0,
                initialIndexOnArray: 0,
                removeBarsOnMobile: !0,
                hideCloseButtonOnMobile: !1,
                hideBarsDelay: 3e3,
                videoMaxWidth: 1140,
                vimeoColor: "cccccc",
                beforeOpen: null,
                afterOpen: null,
                afterClose: null,
                afterMedia: null,
                nextSlide: null,
                prevSlide: null,
                loopAtEnd: !1,
                autoplayVideos: !1,
                queryStringData: {},
                toggleClassOnLoad: "",
                titleAttribute: "title",
                captionAttribute: "data-caption",
                selector: null
            },
            r = this,
            l = [],
            d, p = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i),
            c = null !== p || void 0 !== t.createTouch || "ontouchstart" in e || "onmsgesturechange" in e || navigator.msMaxTouchPoints,
            b = !!t.createElementNS && !!t.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
            u = e.innerWidth ? e.innerWidth : i(e).width(),
            h = e.innerHeight ? e.innerHeight : i(e).height(),
            g = 0,
            f = '<div id="swipebox-overlay">\t\t\t\t\t<div id="swipebox-container">\t\t\t\t\t\t<div id="swipebox-slider"></div>\t\t\t\t\t\t<div id="swipebox-top-bar">\t\t\t\t\t\t\t<div id="swipebox-title"></div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div id="swipebox-bottom-bar">\t\t\t\t\t\t\t<div id="swipebox-arrows">\t\t\t\t\t\t\t\t<a id="swipebox-prev"></a>\t\t\t\t\t\t\t\t<a id="swipebox-next"></a>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<a id="swipebox-close"></a>\t\t\t\t\t</div>\t\t\t</div>';
        r.settings = {}, i.swipebox.close = function() {
            n.closeSlide()
        }, i.swipebox.extend = function() {
            return n
        }, r.init = function() {
            r.settings = i.extend({}, a, o), i.isArray(s) ? (l = s, n.target = i(e), n.init(r.settings.initialIndexOnArray)) : i(s).on("click", r.settings.selector, (function(e) {
                if ("slide current" === e.target.parentNode.className) return !1;
                var t, o, a;
                n.destroy(), d = null === r.settings.selector ? i(s) : i(s).find(r.settings.selector), l = [], a || (o = "data-rel", a = i(this).attr(o)), a || (o = "rel", a = i(this).attr(o)), a && "" !== a && "nofollow" !== a && (d = d.filter("[" + o + '="' + a + '"]')), d.each((function() {
                    var e = null,
                        t = null,
                        s = null;
                    i(this).attr(r.settings.titleAttribute) && (e = i(this).attr(r.settings.titleAttribute)), i(this).attr(r.settings.captionAttribute) && (t = i(this).attr(r.settings.captionAttribute)), i(this).attr("href") && (s = i(this).attr("href")), l.push({
                        href: s,
                        title: e,
                        caption: t
                    })
                })), t = d.index(i(this)), e.preventDefault(), e.stopPropagation(), n.target = i(e.target), n.init(t)
            }))
        }, n = {
            init: function(e) {
                r.settings.beforeOpen && r.settings.beforeOpen(), this.target.trigger("swipebox-start"), i.swipebox.isOpen = !0, this.build(), this.openSlide(e), this.openMedia(e), this.preloadMedia(e + 1), this.preloadMedia(e - 1), r.settings.afterOpen && r.settings.afterOpen(e)
            },
            build: function() {
                var e = this,
                    t;
                i("body").append(f), b && !0 === r.settings.useSVG && (t = (t = i("#swipebox-close").css("background-image")).replace("png", "svg"), i("#swipebox-prev, #swipebox-next, #swipebox-close").css({
                    "background-image": t
                })), p && r.settings.removeBarsOnMobile && i("#swipebox-bottom-bar, #swipebox-top-bar").remove(), i.each(l, (function() {
                    i("#swipebox-slider").append('<div class="slide"></div>')
                })), this.setDim(), this.actions(), c && this.gesture(), this.keyboard(), this.animBars(), this.resize()
            },
            setDim: function() {
                var t, s, o = {};
                "onorientationchange" in e ? e.addEventListener("orientationchange", (function() {
                    0 === e.orientation ? (t = u, s = h) : 90 !== e.orientation && -90 !== e.orientation || (t = h, s = u)
                }), !1) : (t = e.innerWidth ? e.innerWidth : i(e).width(), s = e.innerHeight ? e.innerHeight : i(e).height()), o = {
                    width: t,
                    height: s
                }, i("#swipebox-overlay").css(o)
            },
            resize: function() {
                var t = this;
                i(e).resize((function() {
                    t.setDim()
                })).resize()
            },
            supportTransition: function() {
                var e = "transition WebkitTransition MozTransition OTransition msTransition KhtmlTransition".split(" "),
                    i;
                for (i = 0; i < e.length; i++)
                    if (void 0 !== t.createElement("div").style[e[i]]) return e[i];
                return !1
            },
            doCssTrans: function() {
                if (r.settings.useCSS && this.supportTransition()) return !0
            },
            gesture: function() {
                var e = this,
                    t, s, o, n, a, r, d = !1,
                    p = !1,
                    c = 10,
                    b = 50,
                    h = {},
                    f = {},
                    w = i("#swipebox-top-bar, #swipebox-bottom-bar"),
                    v = i("#swipebox-slider");
                w.addClass("visible-bars"), e.setTimeout(), i("body").bind("touchstart", (function(e) {
                    return i(this).addClass("touching"), t = i("#swipebox-slider .slide").index(i("#swipebox-slider .slide.current")), f = e.originalEvent.targetTouches[0], h.pageX = e.originalEvent.targetTouches[0].pageX, h.pageY = e.originalEvent.targetTouches[0].pageY, i("#swipebox-slider").css({
                        "-webkit-transform": "translate3d(" + g + "%, 0, 0)",
                        transform: "translate3d(" + g + "%, 0, 0)"
                    }), i(".touching").bind("touchmove", (function(e) {
                        if (e.preventDefault(), e.stopPropagation(), f = e.originalEvent.targetTouches[0], !p && (a = o, o = f.pageY - h.pageY, Math.abs(o) >= 50 || d)) {
                            var c = .75 - Math.abs(o) / v.height();
                            v.css({
                                top: o + "px"
                            }), v.css({
                                opacity: c
                            }), d = !0
                        }
                        n = s, s = f.pageX - h.pageX, r = 100 * s / u, !p && !d && Math.abs(s) >= 10 && (i("#swipebox-slider").css({
                            "-webkit-transition": "",
                            transition: ""
                        }), p = !0), p && (0 < s ? 0 === t ? i("#swipebox-overlay").addClass("leftSpringTouch") : (i("#swipebox-overlay").removeClass("leftSpringTouch").removeClass("rightSpringTouch"), i("#swipebox-slider").css({
                            "-webkit-transform": "translate3d(" + (g + r) + "%, 0, 0)",
                            transform: "translate3d(" + (g + r) + "%, 0, 0)"
                        })) : 0 > s && (l.length === t + 1 ? i("#swipebox-overlay").addClass("rightSpringTouch") : (i("#swipebox-overlay").removeClass("leftSpringTouch").removeClass("rightSpringTouch"), i("#swipebox-slider").css({
                            "-webkit-transform": "translate3d(" + (g + r) + "%, 0, 0)",
                            transform: "translate3d(" + (g + r) + "%, 0, 0)"
                        }))))
                    })), !1
                })).bind("touchend", (function(t) {
                    if (t.preventDefault(), t.stopPropagation(), i("#swipebox-slider").css({
                            "-webkit-transition": "-webkit-transform 0.4s ease",
                            transition: "transform 0.4s ease"
                        }), o = f.pageY - h.pageY, s = f.pageX - h.pageX, r = 100 * s / u, d)
                        if (d = !1, Math.abs(o) >= 100 && Math.abs(o) > Math.abs(a)) {
                            var l = o > 0 ? v.height() : -v.height();
                            v.animate({
                                top: l + "px",
                                opacity: 0
                            }, 300, (function() {
                                e.closeSlide()
                            }))
                        } else v.animate({
                            top: 0,
                            opacity: 1
                        }, 300);
                    else p ? (p = !1, s >= 10 && s >= n ? e.getPrev() : s <= -10 && s <= n && e.getNext()) : w.hasClass("visible-bars") ? (e.clearTimeout(), e.hideBars()) : (e.showBars(), e.setTimeout());
                    i("#swipebox-slider").css({
                        "-webkit-transform": "translate3d(" + g + "%, 0, 0)",
                        transform: "translate3d(" + g + "%, 0, 0)"
                    }), i("#swipebox-overlay").removeClass("leftSpringTouch").removeClass("rightSpringTouch"), i(".touching").off("touchmove").removeClass("touching")
                }))
            },
            setTimeout: function() {
                if (r.settings.hideBarsDelay > 0) {
                    var t = this;
                    t.clearTimeout(), t.timeout = e.setTimeout((function() {
                        t.hideBars()
                    }), r.settings.hideBarsDelay)
                }
            },
            clearTimeout: function() {
                e.clearTimeout(this.timeout), this.timeout = null
            },
            showBars: function() {
                var e;
                i("#swipebox-top-bar, #swipebox-bottom-bar").addClass("visible-bars")
            },
            hideBars: function() {
                var e;
                i("#swipebox-top-bar, #swipebox-bottom-bar").removeClass("visible-bars")
            },
            animBars: function() {
                var e = this,
                    t = i("#swipebox-top-bar, #swipebox-bottom-bar");
                t.addClass("visible-bars"), e.setTimeout(), i("#swipebox-slider").click((function() {
                    t.hasClass("visible-bars") || (e.showBars(), e.setTimeout())
                })), i("#swipebox-bottom-bar").hover((function() {
                    e.showBars(), t.addClass("visible-bars"), e.clearTimeout()
                }), (function() {
                    r.settings.hideBarsDelay > 0 && (t.removeClass("visible-bars"), e.setTimeout())
                }))
            },
            keyboard: function() {
                var t = this;
                i(e).bind("keyup", (function(e) {
                    e.preventDefault(), e.stopPropagation(), 37 === e.keyCode ? t.getPrev() : 39 === e.keyCode ? t.getNext() : 27 === e.keyCode && t.closeSlide()
                }))
            },
            actions: function() {
                var e = this,
                    t = "touchend click";
                l.length < 2 ? (i("#swipebox-bottom-bar").hide(), void 0 === l[1] && i("#swipebox-top-bar").hide()) : (i("#swipebox-prev").bind(t, (function(t) {
                    t.preventDefault(), t.stopPropagation(), e.getPrev(), e.setTimeout()
                })), i("#swipebox-next").bind(t, (function(t) {
                    t.preventDefault(), t.stopPropagation(), e.getNext(), e.setTimeout()
                }))), i("#swipebox-close").bind(t, (function(t) {
                    t.preventDefault(), t.stopPropagation(), e.closeSlide()
                }))
            },
            setSlide: function(e, t) {
                t = t || !1;
                var s = i("#swipebox-slider");
                g = 100 * -e, this.doCssTrans() ? s.css({
                    "-webkit-transform": "translate3d(" + 100 * -e + "%, 0, 0)",
                    transform: "translate3d(" + 100 * -e + "%, 0, 0)"
                }) : s.animate({
                    left: 100 * -e + "%"
                }), i("#swipebox-slider .slide").removeClass("current"), i("#swipebox-slider .slide").eq(e).addClass("current"), this.setTitle(e), t && s.fadeIn(), i("#swipebox-prev, #swipebox-next").removeClass("disabled"), 0 === e ? i("#swipebox-prev").addClass("disabled") : e === l.length - 1 && !0 !== r.settings.loopAtEnd && i("#swipebox-next").addClass("disabled"), this.showBars(), this.setTimeout()
            },
            openSlide: function(t) {
                i("html").addClass("swipebox-html"), c ? (i("html").addClass("swipebox-touch"), r.settings.hideCloseButtonOnMobile && i("html").addClass("swipebox-no-close-button")) : i("html").addClass("swipebox-no-touch"), i(e).trigger("resize"), this.setSlide(t, !0)
            },
            preloadMedia: function(e) {
                var t = this,
                    i = null;
                void 0 !== l[e] && (i = l[e].href), t.isVideo(i) ? t.openMedia(e) : setTimeout((function() {
                    t.openMedia(e)
                }), 1e3)
            },
            openMedia: function(e) {
                var t = this,
                    s, o;
                if (void 0 !== l[e] && (s = l[e].href), e < 0 || e >= l.length) return !1;
                o = i("#swipebox-slider .slide").eq(e), this.isVideo(s) ? (o.html(this.getVideo(s)), r.settings.afterMedia && r.settings.afterMedia(e)) : (o.addClass("slide-loading"), this.loadMedia(s, (function() {
                    o.removeClass("slide-loading"), o.html(this), r.settings.afterMedia && r.settings.afterMedia(e)
                })))
            },
            setTitle: function(e) {
                var t = null,
                    s = null;
                if (i("#swipebox-title").empty(), void 0 !== l[e] && (t = l[e].title, s = l[e].caption), t || s) {
                    if (i("#swipebox-top-bar").show(), t) {
                        var o = i("<div></div>").addClass("title").text(t);
                        i("#swipebox-title").append(o)
                    }
                    if (s) {
                        var n = i("<div></div>").addClass("caption").text(s);
                        i("#swipebox-title").append(n)
                    }
                } else i("#swipebox-top-bar").hide()
            },
            isVideo: function(e) {
                if (e) {
                    if (e.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || e.match(/vimeo\.com\/([0-9]*)/) || e.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/)) return !0;
                    if (e.toLowerCase().indexOf("swipeboxvideo=1") >= 0) return !0
                }
            },
            parseUri: function(e, s) {
                var o = t.createElement("a"),
                    n = {};
                return o.href = decodeURIComponent(e), o.search && (n = JSON.parse('{"' + o.search.toLowerCase().replace("?", "").replace(/&/g, '","').replace(/=/g, '":"') + '"}')), i.isPlainObject(s) && (n = i.extend(n, s, r.settings.queryStringData)), i.map(n, (function(e, t) {
                    if (e && e > "") return encodeURIComponent(t) + "=" + encodeURIComponent(e)
                })).join("&")
            },
            getVideo: function(e) {
                var t = "",
                    i = e.match(/((?:www\.)?youtube\.com|(?:www\.)?youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/),
                    s = e.match(/(?:www\.)?youtu\.be\/([a-zA-Z0-9\-_]+)/),
                    o = e.match(/(?:www\.)?vimeo\.com\/([0-9]*)/),
                    a = "";
                return i || s ? (s && (i = s), a = n.parseUri(e, {
                    autoplay: r.settings.autoplayVideos ? "1" : "0",
                    v: ""
                }), t = '<iframe width="560" height="315" src="//' + i[1] + "/embed/" + i[2] + "?" + a + '" frameborder="0" allowfullscreen></iframe>') : o ? (a = n.parseUri(e, {
                    autoplay: r.settings.autoplayVideos ? "1" : "0",
                    byline: "0",
                    portrait: "0",
                    color: r.settings.vimeoColor
                }), t = '<iframe width="560" height="315"  src="//player.vimeo.com/video/' + o[1] + "?" + a + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>') : t = '<iframe width="560" height="315" src="' + e + '" frameborder="0" allowfullscreen></iframe>', '<div class="swipebox-video-container" style="max-width:' + r.settings.videoMaxWidth + 'px"><div class="swipebox-video">' + t + "</div></div>"
            },
            loadMedia: function(e, t) {
                if (0 === e.trim().indexOf("#")) t.call(i("<div>", {
                    class: "swipebox-inline-container"
                }).append(i(e).clone().toggleClass(r.settings.toggleClassOnLoad)));
                else if (!this.isVideo(e)) {
                    var s = i("<img>").on("load", (function() {
                        t.call(s)
                    }));
                    s.attr("src", e)
                }
            },
            getNext: function() {
                var e = this,
                    t, s = i("#swipebox-slider .slide").index(i("#swipebox-slider .slide.current"));
                s + 1 < l.length ? (t = i("#swipebox-slider .slide").eq(s).contents().find("iframe").attr("src"), i("#swipebox-slider .slide").eq(s).contents().find("iframe").attr("src", t), s++, this.setSlide(s), this.preloadMedia(s + 1), r.settings.nextSlide && r.settings.nextSlide(s)) : !0 === r.settings.loopAtEnd ? (t = i("#swipebox-slider .slide").eq(s).contents().find("iframe").attr("src"), i("#swipebox-slider .slide").eq(s).contents().find("iframe").attr("src", t), s = 0, this.preloadMedia(s), this.setSlide(s), this.preloadMedia(s + 1), r.settings.nextSlide && r.settings.nextSlide(s)) : (i("#swipebox-overlay").addClass("rightSpring"), setTimeout((function() {
                    i("#swipebox-overlay").removeClass("rightSpring")
                }), 500))
            },
            getPrev: function() {
                var e = i("#swipebox-slider .slide").index(i("#swipebox-slider .slide.current")),
                    t;
                e > 0 ? (t = i("#swipebox-slider .slide").eq(e).contents().find("iframe").attr("src"), i("#swipebox-slider .slide").eq(e).contents().find("iframe").attr("src", t), e--, this.setSlide(e), this.preloadMedia(e - 1), r.settings.prevSlide && r.settings.prevSlide(e)) : (i("#swipebox-overlay").addClass("leftSpring"), setTimeout((function() {
                    i("#swipebox-overlay").removeClass("leftSpring")
                }), 500))
            },
            nextSlide: function(e) {},
            prevSlide: function(e) {},
            closeSlide: function() {
                i("html").removeClass("swipebox-html"), i("html").removeClass("swipebox-touch"), i(e).trigger("resize"), this.destroy()
            },
            destroy: function() {
                i(e).unbind("keyup"), i("body").unbind("touchstart"), i("body").unbind("touchmove"), i("body").unbind("touchend"), i("#swipebox-slider").unbind(), i("#swipebox-overlay").remove(), i.isArray(s) || s.removeData("_swipebox"), this.target && this.target.trigger("swipebox-destroy"), i.swipebox.isOpen = !1, r.settings.afterClose && r.settings.afterClose()
            }
        }, r.init()
    }, i.fn.swipebox = function(e) {
        if (!i.data(this, "_swipebox")) {
            var t = new i.swipebox(this, e);
            this.data("_swipebox", t)
        }
        return this.data("_swipebox")
    }
}(window, document, jQuery),
function(e) {
    e.qtSwipeboxFunction = function() {
        e.qtSwipeboxEnable = !0, e('.swipebox, .gallery a, a[href*=".jpg"], a[href*="youtube.com/watch"]:not(.qw_social), a[href*="youtube.com"]:not(.qw_social), a[href*="youtu.be"]:not(.qw_social), a[href*="vimeo.com"]:not(.qw_social), a[href*="jpeg"], a[href*=".png"], a[href*=".gif"], .Collage a').swipebox({
            beforeOpen: function() {
                e.swipeboxState = 1
            }
        })
    }, e(window).on("load", (function() {
        e.qtSwipeboxFunction()
    }))
}(jQuery);