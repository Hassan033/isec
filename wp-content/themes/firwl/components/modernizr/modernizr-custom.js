/*! modernizr 3.5.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-audio-canvas-touchevents-hasevent-setclasses !*/
! function(e, n, o) {
    function t(e, n) {
        return typeof e === n
    }

    function a() {
        var e, n, o, a, s, i, r;
        for (var c in d)
            if (d.hasOwnProperty(c)) {
                if (e = [], n = d[c], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length))
                    for (o = 0; o < n.options.aliases.length; o++) e.push(n.options.aliases[o].toLowerCase());
                for (a = t(n.fn, "function") ? n.fn() : n.fn, s = 0; s < e.length; s++) i = e[s], r = i.split("."), 1 === r.length ? Modernizr[r[0]] = a : (!Modernizr[r[0]] || Modernizr[r[0]] instanceof Boolean || (Modernizr[r[0]] = new Boolean(Modernizr[r[0]])), Modernizr[r[0]][r[1]] = a), l.push((a ? "" : "no-") + r.join("-"))
            }
    }

    function s(e) {
        var n = f.className,
            o = Modernizr._config.classPrefix || "";
        if (p && (n = n.baseVal), Modernizr._config.enableJSClass) {
            var t = new RegExp("(^|\\s)" + o + "no-js(\\s|$)");
            n = n.replace(t, "$1" + o + "js$2")
        }
        Modernizr._config.enableClasses && (n += " " + o + e.join(" " + o), p ? f.className.baseVal = n : f.className = n)
    }

    function i() {
        return "function" != typeof n.createElement ? n.createElement(arguments[0]) : p ? n.createElementNS.call(n, "http://www.w3.org/2000/svg", arguments[0]) : n.createElement.apply(n, arguments)
    }

    function r() {
        var e = n.body;
        return e || (e = i(p ? "svg" : "body"), e.fake = !0), e
    }

    function c(e, o, t, a) {
        var s, c, l, d, u = "modernizr",
            p = i("div"),
            v = r();
        if (parseInt(t, 10))
            for (; t--;) l = i("div"), l.id = a ? a[t] : u + (t + 1), p.appendChild(l);
        return s = i("style"), s.type = "text/css", s.id = "s" + u, (v.fake ? v : p).appendChild(s), v.appendChild(p), s.styleSheet ? s.styleSheet.cssText = e : s.appendChild(n.createTextNode(e)), p.id = u, v.fake && (v.style.background = "", v.style.overflow = "hidden", d = f.style.overflow, f.style.overflow = "hidden", f.appendChild(v)), c = o(p, e), v.fake ? (v.parentNode.removeChild(v), f.style.overflow = d, f.offsetHeight) : p.parentNode.removeChild(p), !!c
    }
    var l = [],
        d = [],
        u = {
            _version: "3.5.0",
            _config: {
                classPrefix: "",
                enableClasses: !0,
                enableJSClass: !0,
                usePrefixes: !0
            },
            _q: [],
            on: function(e, n) {
                var o = this;
                setTimeout(function() {
                    n(o[e])
                }, 0)
            },
            addTest: function(e, n, o) {
                d.push({
                    name: e,
                    fn: n,
                    options: o
                })
            },
            addAsyncTest: function(e) {
                d.push({
                    name: null,
                    fn: e
                })
            }
        },
        Modernizr = function() {};
    Modernizr.prototype = u, Modernizr = new Modernizr;
    var f = n.documentElement,
        p = "svg" === f.nodeName.toLowerCase(),
        v = function() {
            function e(e, n) {
                var a;
                return e ? (n && "string" != typeof n || (n = i(n || "div")), e = "on" + e, a = e in n, !a && t && (n.setAttribute || (n = i("div")), n.setAttribute(e, ""), a = "function" == typeof n[e], n[e] !== o && (n[e] = o), n.removeAttribute(e)), a) : !1
            }
            var t = !("onblur" in n.documentElement);
            return e
        }();
    u.hasEvent = v, Modernizr.addTest("canvas", function() {
        var e = i("canvas");
        return !(!e.getContext || !e.getContext("2d"))
    });
    var m = u._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];
    u._prefixes = m;
    var y = u.testStyles = c;
    Modernizr.addTest("touchevents", function() {
        var o;
        if ("ontouchstart" in e || e.DocumentTouch && n instanceof DocumentTouch) o = !0;
        else {
            var t = ["@media (", m.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");
            y(t, function(e) {
                o = 9 === e.offsetTop
            })
        }
        return o
    }), Modernizr.addTest("audio", function() {
        var e = i("audio"),
            n = !1;
        try {
            n = !!e.canPlayType, n && (n = new Boolean(n), n.ogg = e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), n.mp3 = e.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/, ""), n.opus = e.canPlayType('audio/ogg; codecs="opus"') || e.canPlayType('audio/webm; codecs="opus"').replace(/^no$/, ""), n.wav = e.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), n.m4a = (e.canPlayType("audio/x-m4a;") || e.canPlayType("audio/aac;")).replace(/^no$/, ""))
        } catch (o) {}
        return n
    }), a(), s(l), delete u.addTest, delete u.addAsyncTest;
    for (var h = 0; h < Modernizr._q.length; h++) Modernizr._q[h]();
    e.Modernizr = Modernizr
}(window, document);