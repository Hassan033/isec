/**
 * @package qt-megafooter
 */

(function($) {
    "use strict";

    $.qtMegaFooterObj = {
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
                $('[class*=qt-megafooter-is-]').each(function(i, c) {

                    var that, //  item
                        classes, // classes of the  item
                        megafooter_id, // id of the megafooter post
                        posY, // position where we need to place the megafooter content
                        content, // html content
                        megafooter_item,
                        megacontent, // item of the megafooter
                        animInterval; // delay opening

                    that = $(c);
                    that.find('ul').css({
                        'display': 'none'
                    });
                    classes = that.attr('class').split(' ');
                    // get the ID of the megafooter
                    megafooter_id = $.grep(classes, function(elem) {
                        return elem.toLowerCase().indexOf('qt-megafooter-is-') > -1;
                    });
                    if (megafooter_id.length > 0) {
                        megafooter_id = megafooter_id[0].split('qt-megafooter-is-').join('');
                    }
                    if ('undefined' === typeof(megafooter_id) || "" === megafooter_id) {
                        return;
                    }

                    megafooter_item = $('#qt-megafooter-item-' + megafooter_id);
                    if (megafooter_item.hasClass('qt-megafooter-isset')) {
                        return;
                    }
                    megafooter_item.addClass('qt-megafooter-isset');
                    that.attr('data-megafooter', megafooter_id);
                    /// ================== INTERACTIVITY HERE ====================
                    megacontent = $('#qt-megafooter-item-' + that.data('megafooter'));
                    that.on('click', function(e) {
                        e.preventDefault();
                        return false;
                    });
                    that.on('mouseenter', function() {
                        if (animInterval !== false) {
                            clearTimeout(animInterval);
                        }
                        animInterval = setTimeout(
                            function() {
                                megacontent.addClass('open');
                            }, 200
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
                            }, 200
                        );
                    });
                    megacontent.on('mouseleave', function() {
                        if (animInterval !== false) {
                            clearTimeout(animInterval);
                        }
                        animInterval = setTimeout(
                            function() {
                                megacontent.removeClass('open');
                            }, 700
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
                var f = $.qtMegaFooterObj.fn;
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
        $.qtMegaFooterObj.fn.init();
    });
})(jQuery);