/**====================================================================
 *
 *  Main Script File
 *
 *====================================================================*/
(function($) {
    "use strict";

    $.qantumthemesMainObj = {
        /**
         * Global function variables and main objects
         */
        body: $("body"),
        window: $(window),
        document: $(document),
        htmlAndbody: $('html,body'),
        scrolledTop: 0, // global value of the amount of top scrolling
        oldScroll: 0,
        scroDirect: false,
        clock: false,
        headerbar: $('#firwlHeaderBar'),
        stickyheader: $('[data-firwl-stickyheader]'),
        glitchInterval: 700,
        glitchPause: 3000,

        /**
         * ======================================================================================================================================== |
         * 																																			|
         * 																																			|
         * START SITE FUNCTIONS 																													|
         * 																																			|
         *																																			|
         * ======================================================================================================================================== |
         */

        fn: {
            isExplorer: function() {
                return /Trident/i.test(navigator.userAgent);
            },
            isSafari: function() {
                return /Safari/i.test(navigator.userAgent);
            },
            isMobile: function() {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || $.qantumthemesMainObj.window.width() < 1170;
            },
            areClipPathShapesSupported: function() {
                var base = 'clipPath',
                    prefixes = ['webkit', 'moz', 'ms', 'o'],
                    properties = [base],
                    testElement = document.createElement('testelement'),
                    attribute = 'polygon(50% 0%, 0% 100%, 100% 100%)';

                // Push the prefixed properties into the array of properties.
                for (var i = 0, l = prefixes.length; i < l; i++) {
                    var prefixedProperty = prefixes[i] + base.charAt(0).toUpperCase() + base.slice(1); // remember to capitalize!
                    properties.push(prefixedProperty);
                }

                // Interate over the properties and see if they pass two tests.
                for (var i = 0, l = properties.length; i < l; i++) {
                    var property = properties[i];

                    // First, they need to even support clip-path (IE <= 11 does not)...
                    if (testElement.style[property] === '') {

                        // Second, we need to see what happens when we try to create a CSS shape...
                        testElement.style[property] = attribute;
                        if (testElement.style[property] !== '') {
                            $("body").addClass('firwl-clip-enabled');
                            return true;
                        }
                    }
                }
                $("body").addClass('firwl-clip-disabled');
                return false;
            },

            /** random id when required
            ====================================================================*/
            uniqId: function() {
                return Math.round(new Date().getTime() + (Math.random() * 100));
            },

            /** Check if pics are loaded for given cotnainer
            ====================================================================*/
            imagesLoaded: function(container) {
                var f = $.firwlXtendObj.fn;
                var $imgs = $(container).find('img[src!=""]');
                if (!$imgs.length) {
                    return $.Deferred().resolve().promise();
                }
                var dfds = [];
                $imgs.each(function() {
                    var dfd = $.Deferred();
                    dfds.push(dfd);
                    var img = new Image();
                    img.onload = function() {
                        dfd.resolve();
                    }
                    img.onerror = function() {
                        dfd.resolve();
                    }
                    img.src = this.src;
                });
                // IE - when all the images are loaded
                return $.when.apply($, dfds);
            },

            // Website tree menu			
            treeMenu: function() {
                $(".firwl-menu-tree li.menu-item-has-children").each(function(i, c) {
                    var t = $(c);
                    t.find('> a').after("<a class='firwl-openthis'><i class='material-icons'>keyboard_arrow_down</i></a>");
                    t.on("click", "> .firwl-openthis", function(e) {
                        e.preventDefault();
                        t.toggleClass("firwl-open");
                        return false;
                    });
                    return;
                });
                return true;
            },

            /* activates
            *  Adds and removes the class "firwl-active" from the target item	
            ====================================================================*/
            activates: function() {
                var t, // target
                    o = $.qantumthemesMainObj,
                    s = false;
                o.body.off("click", "[data-firwl-activates]");
                o.body.on("click", "[data-firwl-activates]", function(e) {
                    e.preventDefault();
                    s = $(this).attr("data-firwl-activates")
                    t = $(s);
                    if (!s || s === '') {
                        t = $(this);
                    }
                    if (s == 'parent') {
                        t = $(this).parent();
                    }
                    if (s == 'gparent') {
                        t = $(this).parent().parent();
                    }
                    t.toggleClass("firwl-active");
                    return;
                });
            },

            /* switchClass
            *  toggles the class defined with "data-firwl-switch" from the target element data-firwl-target
            *  used to change state of other items (search and similar)
            ====================================================================*/
            switchClass: function() {
                var t, // target
                    c, // class to switch
                    o = $.qantumthemesMainObj;
                o.body.off("click", "[data-firwl-switch]");
                o.body.on("click", "[data-firwl-switch]", function(e) {
                    e.preventDefault();
                    t = $($(this).attr("data-firwl-target"));
                    c = $(this).attr("data-firwl-switch");
                    t.toggleClass(c);
                });
            },

            extractYoutubeId: function(url) {
                if (void 0 === url) return !1;
                var id = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
                return null !== id && id[1];
            },

            /**
             * Fix video background Page Builder rows su ajax load
             */
            qtVcVideobg: function() {
                var o = $.qantumthemesMainObj,
                    f = o.fn,
                    ytu, t, vid;
                jQuery("[data-firwl-video-bg]").each(
                    function() {
                        t = $(this);
                        if (typeof(insertYoutubeVideoAsBackground) == 'function' && typeof(vcResizeVideoBackground) == 'function') {
                            insertYoutubeVideoAsBackground(t, f.extractYoutubeId(t.data("firwl-video-bg")));
                            vcResizeVideoBackground(t);
                        }
                    }
                );
            },

            /* Responsive video resize
            ====================================================================*/
            YTreszr: function() {
                jQuery("iframe").each(function(i, c) { // .youtube-player
                    var t = jQuery(this);
                    if (t.attr("src")) {
                        var href = t.attr("src");
                        if (href.match("youtube.com") || href.match("vimeo.com") || href.match("vevo.com")) {
                            var width = t.parent().width(),
                                height = t.height();
                            t.css({
                                "width": width
                            });
                            t.height(width / 16 * 9);
                        };
                    };
                });
            },

            /* Fix background in safari
            ====================================================================*/

            ipadBgFix: function() {
                var o = $.qantumthemesMainObj,
                    f = o.fn;
                if (f.isMobile() && f.isSafari()) {
                    o.body.addClass('firwl-safari-mobile');
                }
            },

            /* Parallax background
            ====================================================================*/
            qtParallax: function() {
                if ('undefined' == typeof($.stellar)) {
                    return;
                }
                var o = $.qantumthemesMainObj,
                    b = o.body;
                if (o.fn.isMobile()) {
                    return;
                }
                b.stellar('destroy');
                $('[data-firwl-parallax]').imagesLoaded().then(function() {
                    b.stellar({
                        hideDistantElements: false,
                    });
                });
            },

            /* scrolledTop: set a global parameter with the amount of top scrolling
            *	Used by themeScroll
            ====================================================================*/
            scrolledTop: function() {
                var o = $.qantumthemesMainObj,
                    s = window.pageYOffset || document.documentElement.scrollTop,
                    d = 0;
                d = o.scrolledTop - s;
                if (d != 0) {
                    o.scroDirect = d;
                }
                o.scrolledTop = s;
                return s;
            },

            /* Sticky header preparation
            ====================================================================*/
            stickyBarLinkPrep: function() {

                var o = $.qantumthemesMainObj,
                    ab = $('#wpadminbar'),
                    ah = ab.outerHeight(),
                    fm = $('#firwlMenu'),
                    fh = fm.outerHeight(),
                    cando = o.fn.areClipPathShapesSupported();
                if (false === cando) return;
                o.OTS = $("#firwl-Sticky"); // Object To Stick (BAR container)
                if (o.OTS.length === 0) return;
                o.OTSc = $('#firwl-StickyCon'); // Object To Stick CONTENT (internal menu)
                var OTS = o.OTS,
                    OTSh = OTS.outerHeight();
                OTS.css({
                    'height': Math.round(OTSh) + 'px'
                });
                OTS.closest('.firwl-vc-row-container').addClass('firwl-stickybar-parent'); // 7 may
                o.StickMeTo = 0;
                o.whenToStick = $('.firwl-stickybar-parent').position().top - OTSh;
                if (o.stickyheader.length > 0) {
                    o.whenToStick -= fh;
                    o.StickMeTo += fh;
                }
                if (ab.length >= 1) {
                    o.whenToStick -= ah;
                    o.StickMeTo += ah;
                }
                o.whenToStick = Math.floor(o.whenToStick);
                o.StickMeTo = Math.floor(o.StickMeTo);

            },
            /* Sticky header
            ====================================================================*/
            stickyBarLink: function(st) {
                var o = $.qantumthemesMainObj,
                    smt = o.StickMeTo,
                    wts = o.whenToStick,
                    cando = o.fn.areClipPathShapesSupported();
                if (o.OTS.length === 0 || false === cando) return;
                if (st >= wts) {
                    o.OTS.addClass("firwl-stickme");
                    o.OTSc.addClass('firwl-paper').css({
                        'top': smt + 'px'
                    });
                } else {
                    o.OTSc.removeClass('firwl-paper');
                    o.OTS.removeClass("firwl-stickme");
                }
            },

            /* Sticky menu
            ====================================================================*/
            stickyMenu: {
                pageScrolled: function(st, direction) {
                    var o = $.qantumthemesMainObj,
                        c = "firwl-headerbar__sticky__s";
                    if (direction === 'up') {
                        o.headerbar.removeClass(c);
                    } else {
                        if (st > 100) {
                            o.headerbar.addClass(c);
                        }
                    }
                }
            },

            /* Item menu right align: add class if item is > half
            ====================================================================*/
            menuItemAlign: function() {
                var o = $.qantumthemesMainObj,
                    b = o.body,
                    items = b.find('#firwlMenuBar > li.menu-item'),
                    hw = b.width() / 2;
                if (items.length == 0) {
                    return;
                }
                items.each(function(i, c) {
                    var t = $(c);
                    if (t.offset().left > hw) {
                        t.addClass('firwl-iright');
                    }
                });
            },

            /* Theme clock: perform some actions at some interval
            ====================================================================*/
            themeScroll: function() {
                var o = $.qantumthemesMainObj,
                    f = o.fn,
                    st,
                    os;
                if (o.clock !== false) {
                    clearInterval(o.clock);
                }
                o.body.attr('data-firwl-scrolled', 0);
                o.clock = setInterval(
                    function() {
                        f.scrolledTop();
                        st = o.scrolledTop;
                        os = o.oldScroll;
                        if (os !== st) {
                            o.oldScroll = st;
                            f.stickyBarLink(st);
                            o.body.attr('data-firwl-scrolled', st);
                            f.qtScrollSpy.update(st);
                            if (st > (os + 50)) {
                                f.stickyMenu.pageScrolled(st, 'down');
                            }
                            if (st < (os - 50) && st < 400) {
                                f.stickyMenu.pageScrolled(st, 'up');
                            }
                        }
                    }, 80
                );
            },


            /* Countdown
            ====================================================================*/
            countDown: {
                cd: $(".firwl-countdown"),
                cdf: this,
                pad: function(n, size) {
                    return (n < size) ? ("0" + n) : n;
                },
                showclock: function() {
                    var cd = $(".firwl-countdown"),
                        T = $.qantumthemesMainObj.fn.countDown;
                    if (cd.length < 1) {
                        T.remove(cd);
                        return;
                    }
                    if (!cd.data('firwl-date') || !cd.data('firwl-time')) {
                        T.remove(cd);
                        return;
                    }

                    var days, hours, min,
                        cdf = T.cdf,
                        html = '',
                        fieldNow = cd.data('firwl-now'),
                        nowdate = new Date(fieldNow),
                        curDate = new Date(),
                        fieldDate = cd.data('firwl-date').split('-'),
                        fieldTime = cd.data('firwl-time').split(':'),
                        futureDate = new Date(fieldDate[0], fieldDate[1] - 1, fieldDate[2], fieldTime[0], fieldTime[1]),
                        sec = futureDate.getTime() / 1000 - curDate.getTime() / 1000,
                        msec = futureDate.getTime() - curDate.getTime();
                    if (sec <= 0 || isNaN(sec)) {
                        T.remove(cd);
                        return cd;
                    }

                    days = Math.floor(sec / 86400);
                    sec = sec % 86400;
                    hours = Math.floor(sec / 3600);
                    sec = sec % 3600;
                    min = Math.floor(sec / 60);
                    sec = Math.floor(sec % 60);
                    msec = Math.floor(msec % 1000);
                    if (days != 0) {
                        html += '<span>' + T.pad(days, 10) + '</span>';
                    }
                    html += '<span>' + T.pad(hours, 10) + '</span>';
                    html += '<span>' + T.pad(min, 10) + '</span>';
                    html += '<span>' + T.pad(sec, 10) + '</span>';
                    html += '<span class="firwl-mss">' + T.pad(msec, 100) + '</span>';
                    cd.html(html);
                },
                remove: function(cd) {
                    var T = $.qantumthemesMainObj.fn.countDown;
                    cd.closest('.firwl-countdown__container').remove();
                    if (T.qtClockInterval) {
                        clearInterval(T.qtClockInterval);
                    }
                },
                init: function() {
                    var T = $.qantumthemesMainObj.fn.countDown;
                    if ($(".firwl-countdown").length < 1) {
                        return;
                    }
                    T.showclock();
                    T.qtClockInterval = setInterval(function() {
                        T.showclock();
                    }, 12); // arbitrary delay for refresh to avoid js overload. 
                }
            },

            /* Scrollspy
            ====================================================================*/
            qtScrollSpy: {
                init: function() {
                    function qtScrollSpyInit() {
                        var o = $.qantumthemesMainObj,
                            cando = o.fn.areClipPathShapesSupported(),
                            b = o.body,
                            intmenu = $('#firwl-Sticky'),
                            offset = 0,
                            sh = o.stickyheader,
                            adminbar = $("#wpadminbar"),
                            sections = [],
                            pagemiddle = Math.floor($(window).height() / 2);
                        o.scrollspycontainer = b.find("[data-firwl-scrollspy]");
                        if (intmenu.length > 0) {
                            offset = offset + 70;
                        }
                        if (sh.length > 0) {
                            offset = offset + sh.find('#firwlMenu').outerHeight();
                        }
                        if (adminbar.length > 0) {
                            offset = offset + adminbar.outerHeight();
                        }
                        pagemiddle = Math.floor(pagemiddle + (offset / 2));
                        b.attr('data-scrollspy-half', pagemiddle);
                        o.scrollspycontainer.find("a[href^='#']").each(function(i, c) {
                            var link = $(c),
                                to,
                                hash = link.attr('href'),
                                section = $(hash);
                            if (section.length > 0) {
                                var top = Math.floor(section.offset().top),
                                    bottom = top + Math.floor(section.outerHeight()),
                                    middle = (top + ((bottom - top) / 2)),
                                    to = top - offset;
                                section.attr('data-scrollspy-mid', middle);
                                if (cando) { // No Edge
                                    link.unbind('click')
                                        .off('click')
                                        .on('click', function(e) {
                                            e.preventDefault();
                                            window.scrollTo({
                                                top: to,
                                                left: 0,
                                                behavior: 'smooth'
                                            });
                                            return false;
                                        });
                                }
                            }
                        });
                    }
                    var initScroll = setTimeout(qtScrollSpyInit, 600);
                },
                update: function(st) {
                    var o = $.qantumthemesMainObj,
                        b = o.body,
                        hp = Number(b.attr('data-scrollspy-half')),
                        s = $('[data-scrollspy-mid]'),
                        d, a = [],
                        link,
                        timeout = false,
                        menu = $("#firwl-StickyCon");
                    s.each(function(i, c) {
                        var t = $(c),
                            d = Math.abs((Number(t.attr('data-scrollspy-mid')) - st) - hp);
                        a.push(
                            [d, t.attr('id')]
                        );
                    });
                    a.sort(function(a, b) {
                        return a[0] - b[0]
                    });
                    if (undefined !== a[0]) {
                        link = a[0][1];
                        if (timeout) {
                            clearTimeout(timeout);
                        }
                        timeout = setTimeout(function(o) {
                            menu.find('.firwl-active').removeClass('firwl-active');
                            menu.find('a[href="#' + link + '"]').addClass('firwl-active');
                        }, 300);
                    }
                }
            },


            /* Owl
            ====================================================================*/
            owlCallback: function(event) {
                // Provided by the core
                var element = event.target; // DOM element, in this example .owl-carousel
                var name = event.type; // Name of the event, in this example dragged
                var namespace = event.namespace; // Namespace of the event, in this example owl.carousel
                var items = event.item.count; // Number of items
                var item = event.item.index; // Position of the current item
                // Provided by the navigation plugin
                var pages = event.page.count; // Number of pages
                var page = event.page.index; // Position of the current page
                var size = event.page.size; // Number of items per page
            },
            owlCarousel: function() {
                if (!jQuery.fn.owlCarousel) {
                    return;
                }
                $('.firwl-owl-carousel').each(function(i, c) {
                    var T = $(c),
                        idc = $(c).attr("id"),
                        itemIndex,
                        controllerTarget;
                    T.owlCarousel({
                        loop: T.data('loop'),
                        margin: T.data('gap'),
                        nav: T.data('nav'),
                        dots: T.data('dots'),
                        navText: ['<i class="firwl-arrow firwl-arrow__l"></i>', '<i class="firwl-arrow firwl-arrow__r"></i>'],
                        center: T.data('center'),
                        stagePadding: T.data('stage_padding'),
                        autoplay: T.data('autoplay_timeout') > 0,
                        autoplayTimeout: T.data('autoplay_timeout'),
                        autoplayHoverPause: T.data('pause_on_hover'),
                        responsive: {
                            0: {
                                items: T.data('items_mobile')
                            },
                            420: {
                                items: T.data('items_mobile_hori')
                            },
                            600: {
                                items: T.data('items_tablet')
                            },
                            1025: {
                                items: T.data('items')
                            }
                        },
                    });
                    if (T.hasClass('firwl-multinav-main')) {
                        controllerTarget = T.data('target');
                        T.parent().find('.firwl-multinav__controller').find('a:first-child').addClass('current');
                        T.on('changed.owl.carousel', function(e) {
                            if (e.item) {
                                itemIndex = T.find('.active [data-index]').data('index') + 1;
                                var index = e.item.index,
                                    count = e.item.count;
                                if (index > count) {
                                    index -= count;
                                }
                                if (index <= 0) {
                                    index += count;
                                }
                                T.parent().find('.firwl-multinav__controller .current').removeClass('current');
                                T.parent().find('.firwl-multinav__controller').find('[data-multinav-controller="' + itemIndex + '"]').addClass('current');
                            }
                        });
                    }

                    T.on('click', "[data-multinav-controller]", function(e) {
                        e.preventDefault();
                        var t = $(this),
                            i = t.data("multinav-controller"),
                            targ = t.data("multinav-target");
                        $('#' + targ).trigger('stop.owl.autoplay', i);
                        $('#' + targ).trigger('to.owl.carousel', i);
                        T.parent().find('.firwl-multinav__controller .owl-item a').removeClass('current');
                        t.addClass('current');
                    });
                });
            },


            qtGlitch: {
                /**
                 * [init initialize glitching interval]
                 * This function triggers the glitch effect to texts, images and particles with a predetermined interval.
                 * You set the parameters as global object parameters
                 * glitchInterval
                 * glitchPause
                 */
                init: function(duration, pause) {
                    var o = $.qantumthemesMainObj,
                        fg = o.fn.qtGlitch,
                        loop = duration + pause;

                    $(".firwl-glitchpicture").imagesLoaded().fadeIn(300).then(function() {
                        // Start on open
                        fg.glitchStart(o);
                        setTimeout(
                            function() {
                                fg.glitchStop(o);
                            }, duration
                        );
                        // Restart after 12 seconds
                        var stopGlitch = setInterval(
                            function() {
                                fg.glitchStart(o);
                                setTimeout(
                                    function() {
                                        fg.glitchStop(o);
                                    }, duration
                                );

                            }, loop
                        );
                    });

                },
                glitchStart: function(o) {
                    $(".firwl-glitchtxt, .firwl-decor").addClass('glitching');
                    o.fn.qtGlitchingParticles.start($(".firwl-particles__auto"));
                    if ('function' === typeof($.fn.mgGlitch)) {
                        $(".firwl-glitchpicture").find("img").mgGlitch({
                            destroy: false,
                            glitch: true,
                            scale: false,
                            blend: true,
                            blendModeType: 'screen',
                            glitch1TimeMin: 600,
                            glitch1TimeMax: 300,
                            glitch2TimeMin: 10,
                            glitch2TimeMax: 115,
                        });
                    }
                },
                glitchStop: function(o) {
                    $(".firwl-glitchtxt, .firwl-decor").removeClass('glitching');
                    o.fn.qtGlitchingParticles.stop($(".firwl-particles__auto"));
                    if ('function' !== typeof($.fn.mgGlitch)) return;
                    var t = $(".glitch-glitchpicture img:first-child");
                    t.mgGlitch({
                        destroy: true,
                        glitch: false
                    });
                    t.removeClass('glitching');
                    $('.back').removeClass('back');
                    $('.front-1, .front-2, .front-3').remove();
                }
            },



            /**
             * Add glitching particles on headers
             */
            qtGlitchingParticles: {
                init: function(selector) {
                    selector.find('hr').remove();
                    selector.each(function(i, c) {
                        var that = $(this),
                            items = 8,
                            i, t, l,
                            repint;

                        if (that.length <= 0) {
                            return;
                        }
                        that.find('hr').remove();
                        for (i = 0; i < items; i++) {
                            that.append('<hr>');
                        }
                        // Now we will change the position of the particles to make them more realistic
                        function reposition(that) {
                            for (i = 0; i <= items; i++) {
                                that.find('hr').each(function(i, c) {
                                    t = $(c);
                                    l = Math.floor(Math.random() * 20);
                                    t.css({
                                        'left': Math.floor(Math.random() * 90) + '%',
                                        'top': Math.floor(Math.random() * 100) + '%',
                                        'width': 6 + Math.floor(Math.random() * 6) + 'px',
                                        'height': 6 + Math.floor(Math.random() * 6) + 'px'
                                    });
                                });
                            }
                        }
                        clearInterval(repint);
                        repint = setInterval(function() {
                            reposition(that);
                        }, 600);
                        reposition(that);
                    });
                },
                start: function(selector) {
                    selector.addClass('active');
                },
                stop: function(selector) {
                    selector.removeClass('active');
                }
            },

            resetOverlay: function() {
                $('.firwl-overlayopen').removeClass('firwl-overlayopen');
            },

            /**
             * Add animated menu index
             */
            qtMenuDecor: {
                init: function() {
                    var o = $.qantumthemesMainObj,
                        f = o.fn,
                        m = $("#firwlMenu"),
                        items = $('#firwlMenuBar > li'),
                        ancestor = $('#firwlMenuBar > .current-menu-ancestor'),
                        current = $('#firwlMenuBar > .current-menu-item'),
                        first = $('#firwlMenuBar > li:first-child'),
                        Oof, Ow, ci = false,
                        resetT = false;
                    if ($('#firwlIndx').length == 0) {
                        m.append('<span id="firwlIndx" class="firwl-primary"></span>');
                    }
                    if (ancestor.length > 0) {
                        ci = ancestor;
                    } else if (current.length > 0) {
                        ci = current;
                    } else {
                        ci = first;
                    }
                    if (ci.length > 0) {
                        Oof = Math.round(ci.offset().left) + 'px',
                            Ow = Math.round(ci.outerWidth() - 8) + 'px';
                        f.qtMenuDecor.upd(Oof, Ow);
                        var startIndex = setTimeout(
                            function() {
                                $('#firwlIndx').addClass('firwl-inz');
                            }, 600
                        );
                    }
                    items.off('mouseenter');
                    items.off('mouseout');
                    items.on('mouseenter, mouseover', function(i, c) {
                        var t = $(this),
                            of = Math.round(t.offset().left) + 'px',
                            w = Math.round(t.outerWidth() - 8) + 'px';
                        f.qtMenuDecor.upd( of , w);
                        if (resetT) {
                            clearTimeout(resetT);
                        }
                    }).on('mouseout', function() {
                        resetT = setTimeout(
                            function() {
                                f.qtMenuDecor.upd(Oof, Ow);
                            }, 300
                        );
                    });
                },
                upd: function(x, w) {
                    jQuery('#firwlIndx').css({
                        'transform': 'translateX(' + x + ')',
                        'width': w
                    });
                }
            },

            /**====================================================================
             *
             *	After ajax page initialization
             * 	Used by QT Ajax Pageloader. 
             * 	MUST RETURN TRUE IF ALL OK.
             * 
             ====================================================================*/
            initializeAfterAjax: function() {
                var o = $.qantumthemesMainObj,
                    f = o.fn;
                f.resetOverlay();
                f.countDown.init();
                f.YTreszr();
                f.switchClass();
                f.activates();
                f.ipadBgFix();
                f.qtParallax();
                f.qtVcVideobg();
                f.qtScrollSpy.init();
                f.owlCarousel();
                f.qtMenuDecor.init();
                f.qtGlitchingParticles.init(jQuery(".firwl-particles__auto"));
                f.qtGlitch.init(o.glitchInterval, o.glitchPause); // duration + pause

                return true;
            },


            /* Trigger custom functions on window resize, with a delay for performance enhacement
            ====================================================================*/
            windoeResized: function() {
                var rst,
                    o = $.qantumthemesMainObj,
                    f = o.fn,
                    w = o.window,
                    ww = w.width(),
                    wh = w.height();

                $(window).on('resize', function(e) {
                    clearTimeout(rst);
                    rst = setTimeout(function() {
                        f.owlCarousel();
                        f.qtScrollSpy.init();
                        f.menuItemAlign();
                        if (w.height() != wh) {
                            f.stickyBarLinkPrep();
                            f.themeScroll();
                        }
                        if (w.width() != ww) {
                            f.stickyBarLinkPrep();
                            f.YTreszr();
                        }
                        // Page Builder functions FRONTEND
                        if ($('body').hasClass('vc_editor')) {
                            f.qtGlitchingParticles.init(jQuery(".firwl-particles__auto"));
                        }
                    }, 500);
                });
            },

            /**====================================================================
             *
             * 
             *  Functions to run once on first page load
             *  
             *
             ====================================================================*/
            init: function() {
                var f = $.qantumthemesMainObj.fn;
                f.treeMenu();
                f.stickyBarLinkPrep();
                f.themeScroll();
                f.initializeAfterAjax();
                f.areClipPathShapesSupported();
                f.menuItemAlign();
                f.windoeResized(); // Always last
            },
        }
        /**
         * ======================================================================================================================================== |
         * 																																			|
         * 																																			|
         * END SITE FUNCTIONS 																														|
         * 																																			|
         *																																			|
         * ======================================================================================================================================== |
         */
    };
    /**====================================================================
     *
     *	Page Ready Trigger
     * 
     ====================================================================*/
    jQuery(document).ready(function() {
        $.qantumthemesMainObj.fn.init();
    });
})(jQuery);