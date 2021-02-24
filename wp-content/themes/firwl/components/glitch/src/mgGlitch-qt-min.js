! function(u, t, e, s) {
    "use strict";
    var i = "mgGlitch",
        n = {
            destroy: !1,
            glitch: !0,
            scale: !0,
            blend: !0,
            blendModeType: "hue",
            glitch1TimeMin: 600,
            glitch1TimeMax: 900,
            glitch2TimeMin: 10,
            glitch2TimeMax: 115,
            zIndexStart: 5
        };

    function a(t, e) {
        this.element = t, this.settings = u.extend({}, n, e), this._defaults = n, this._name = i, this.init()
    }
    u.extend(a.prototype, {
        init: function() {
            this.glitch()
        },
        glitch: function() {
            var l = this.element,
                o = this.settings.scale,
                c = this.settings.glitch1TimeMin,
                h = this.settings.glitch1TimeMax,
                f = this.settings.glitch2TimeMin,
                d = this.settings.glitch2TimeMax,
                t = this.settings.zIndexStart;

            function g(t, e) {
                return Math.floor(Math.random() * (e - t + 1)) + t
            }
            if (!0 === this.settings.destroy)(u(l).siblings().hasClass("el-front-1") || u(l).siblings().hasClass("front-3") || u(l).siblings().hasClass("front-2")) && u(l).siblings(".front-1, .front-2, .front-3").remove(), u(".back").removeClass("back");
            else if (!1 === this.settings.destroy) {
                var e, e, e;
                if ((e = u(l).clone()).insertBefore(l).addClass("back").css({
                        "z-index": t
                    }), !0 === this.settings.blend)(e = u(l).clone()).insertAfter(l).addClass("front-3").css({
                    "z-index": t + 3,
                    "mix-blend-mode": this.settings.blendModeType
                }), p();
                if (!0 === this.settings.glitch)(e = u(l).clone()).insertAfter(l).addClass("front-2").css({
                    "z-index": t + 2
                }), u(".back").next().addClass("front-1").css({
                    "z-index": t + 1
                }), x(), m()
            }

            function x() {
                var t = g(10, 1230),
                    e = 9999,
                    s = g(0, 1280),
                    i = 0,
                    n = g(0, 6) - g(0, 6),
                    a = g(0, 6) - g(0, 6),
                    r = g(c, h);
                u(l).css({
                    clip: "rect(" + t + "px, " + e + "px, " + s + "px,0px)",
                    right: a,
                    left: n,
                    opacity: .4
                }), setTimeout(x, r)
            }

            function m() {
                var t = g(10, 1230),
                    e = 9999,
                    s = g(0, 1280),
                    i = 0,
                    n = g(0, 10) - g(0, 10),
                    a = g(0, 10) - g(0, 10),
                    r = g(f, d);
                if (!0 === o) var c = (Math.random() * (1.1 - .9) + .9).toFixed(2);
                else if (!1 === o) var c = 1;
                u(l).next().css({
                    clip: "rect(" + t + "px, " + e + "px, " + s + "px,0px)",
                    left: n,
                    right: a,
                    "-webkit-transform": "scale(" + c + ")",
                    "-ms-transform": "scale(" + c + ")",
                    transform: "scale(" + c + ")",
                    filter: "hue-rotate(270deg)",
                    opacity: .4
                }), setTimeout(m, r)
            }

            function p() {
                var t = g(10, 1900),
                    e = 9999,
                    s = g(10, 1300),
                    i = 0,
                    n = g(0, 10) - g(0, 10),
                    a = g(0, 10) - g(0, 10),
                    r = g(f, d);
                if (!0 === o) var c = (Math.random() * (1.1 - .9) + .9).toFixed(2);
                else if (!1 === o) var c = 1;
                r < 15 ? u(l).next().next().css({
                    clip: "rect(" + t + "px, " + e + "px, " + s + "px,0px)",
                    left: n,
                    right: a,
                    "-webkit-transform": "scale(" + c + ")",
                    "-ms-transform": "scale(" + c + ")",
                    transform: "scale(" + c + ")",
                    filter: "hue-rotate(130deg)",
                    opacity: .7
                }) : u(l).next().css({
                    opacity: 0
                }), setTimeout(p, r)
            }
        }
    }), u.fn[i] = function(t) {
        return this.each(function() {
            new a(this, t)
        })
    }
}(jQuery, window, document);