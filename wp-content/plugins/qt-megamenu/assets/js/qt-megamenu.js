/**
 * @package qt-megamenu
 */

(function($) {
    "use strict";

    $.qtMegaMenuObj = {
        body: $("body"),
        window: $(window),
        document: $(document),
        htmlAndbody: $('html,body'),
        highPerfScroll: true,
        /**
         * ======================================================================================================================================== |
         * 																																			|
         * 																																			|
         * START PLUGIN FUNCTIONS 																													|
         * 																																			|
         *																																			|
         * ======================================================================================================================================== |
         */
        fn: {
            MMactivate: function() {
                $('[class*=qt-megamenu-is-]').each(function(i, c) {

                    var that, // menu item
                        classes, // classes of the menu item
                        megamenu_id, // id of the megamenu post
                        posY, // position where we need to place the megamenu content
                        content, // html content
                        megamenu_item,
                        megacontent, // item of the megamenu
                        animInterval; // delay opening

                    that = $(c);
                    that.find('ul').css({
                        'display': 'none'
                    });
                    classes = that.attr('class').split(' ');
                    // get the ID of the megamenu
                    megamenu_id = $.grep(classes, function(elem) {
                        return elem.toLowerCase().indexOf('qt-megamenu-is-') > -1;
                    });
                    if (megamenu_id.length > 0) {
                        megamenu_id = megamenu_id[0].split('qt-megamenu-is-').join('');
                    }
                    if ('undefined' === typeof(megamenu_id) || "" === megamenu_id) {
                        return;
                    }

                    megamenu_item = $('#qt-megamenu-item-' + megamenu_id);
                    if (megamenu_item.hasClass('qt-megamenu-isset')) {
                        return;
                    }
                    megamenu_item.addClass('qt-megamenu-isset');
                    that.attr('data-megamenu', megamenu_id);
                    /// ================== INTERACTIVITY HERE ====================
                    megacontent = $('#qt-megamenu-item-' + that.data('megamenu'));
                    that.on('click', function(e) {
                        e.preventDefault();
                        return false;
                    });
                    that.on('mouseenter, mouseover', function() {
                        if (animInterval !== false) {
                            clearTimeout(animInterval);
                        }
                        animInterval = setTimeout(
                            function() {
                                megacontent.addClass('open');
                            }, 160
                        );
                    });
                    that.on('mouseleave', function() {
                        if (animInterval !== false) {
                            clearTimeout(animInterval);
                        }
                        animInterval = setTimeout(
                            function() {
                                megacontent.removeClass('open');
                            }, 200
                        );
                    });
                    megacontent.on('mouseenter', function() {
                        if (animInterval !== false) {
                            clearTimeout(animInterval);
                        }
                        animInterval = setTimeout(
                            function() {
                                megacontent.addClass('open');
                            }, 160
                        );
                    });
                    megacontent.on('mouseleave', function() {
                        if (animInterval !== false) {
                            clearTimeout(animInterval);
                        }
                        animInterval = setTimeout(
                            function() {
                                megacontent.removeClass('open');
                            }, 500
                        );
                    });
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
                var f = $.qtMegaMenuObj.fn;
                f.MMactivate();
            },
        }
        /**
         * ======================================================================================================================================== |
         * 																																			|
         * 																																			|
         * END PLUGIN FUNCTIONS 																													|
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
        $.qtMegaMenuObj.fn.init();
    });
})(jQuery);