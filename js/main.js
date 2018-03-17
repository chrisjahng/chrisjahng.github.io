// !Initialize

var duration = 1000;
var easing = 'easeInOutCubic';
var highest_page = 0;
$(document).ready(function() {

// !Initialize view
    $('.back-to-top').hide();
    $('.active').find('.page-number').show();

// !Initialize layout
    if(window.location.hash){
        //determine active page
        var active_page = $(window.location.hash);
        var active_link = $('.menu-item a[rel='+window.location.hash+']').closest('li');
        //determine next page and prev page / next or first
        if(active_page.next().length == 0) {
            var next_page = $('.page:first-child');
            var next_link = $('.menu-item:first-child');
        } else {
            var next_page = active_page.next()
            var next_link = active_link.next()
        }
        if(active_page.prev().length == 0) {
            var prev_page = $('.page:last-child');
            var prev_link = $('.menu-item:last-child');
        } else {
            var prev_page = active_page.prev()
            var prev_link = active_link.prev()
        }
        //update classes
        $('.page, .menu-item').removeClass('active').removeClass('next').removeClass('previous');
        active_page.addClass('active');
        active_link.addClass('active');
        next_page.addClass('next');
        next_link.addClass('next');
        prev_page.addClass('previous');
        prev_link.addClass('previous');
        //update dom
        $('#content').prepend(active_page).prepend(next_page);
        active_page.find('.page-number').show();;
        $('#navigation').append(active_link).append(next_link);
    } else if($('#single').length != 0){
        active_id = "#"+$('#single').attr('class');
        var active_link = $('.menu-item a[rel='+active_id+']').closest('li');
        if(active_link.next().length == 0) {
            var next_link = $('.menu-item:first-child');
        } else {
            var next_link = active_link.next()
        }
        if(active_link.prev().length == 0) {
            var prev_link = $('.menu-item:last-child');
        } else {
            var prev_link = active_link.prev()
        }
        //update classes
        $('.menu-item').removeClass('active').removeClass('next').removeClass('previous');
        active_link.addClass('active');
        next_link.addClass('next');
        prev_link.addClass('previous');
        //update dom
        $('#navigation').append(active_link).append(next_link);
    };

// Illustration columns
    var first_column = $(document.createElement('div'));
    first_column.addClass('first column clearfix');
    var second_column = $(document.createElement('div'));
    second_column.addClass('second column clearfix');
    var third_column = $(document.createElement('div'));
    third_column.addClass('third column clearfix');
    var column_counter = 1;

    $.each($("#illustration .work"), function (index){
        $(this).width('100%').css({'float':'none','margin':'0px'});
        if(column_counter == 1){$(this).appendTo(first_column); column_counter = 2;}
        else if(column_counter == 2){$(this).appendTo(second_column); column_counter = 3;}
        else {$(this).appendTo(third_column); column_counter = 1;}
        if ($("#illustration .work").length == 1){
            $('#illustration').append(first_column).append(second_column).append(third_column);
        }
    });

// Graphic design columns
    var first_column = $(document.createElement('div'));
    first_column.addClass('first column clearfix');
    var second_column = $(document.createElement('div'));
    second_column.addClass('second column clearfix');
    var third_column = $(document.createElement('div'));
    third_column.addClass('third column clearfix');
    column_counter = 1;


    $.each($("#graphic-design .work"), function (index){
        $(this).width('100%').css({'float':'none','margin':'0px'});
        if(column_counter == 1){$(this).appendTo(first_column); column_counter = 2;}
        else if(column_counter == 2){$(this).appendTo(second_column); column_counter = 3;}
        else {$(this).appendTo(third_column); column_counter = 1;}
        if ($("#graphic-design .work").length == 1){
            $('#graphic-design').append(first_column).append(second_column).append(third_column);
        }
    });

// News columns
    var first_column = $(document.createElement('div'));
    first_column.addClass('first thin-column clearfix');
    var second_column = $(document.createElement('div'));
    second_column.addClass('second thin-column clearfix');
    column_counter = 1;

    $.each($("#news .post"), function (index){
        $(this).removeClass('thin-column');
        if(column_counter == 1){$(this).appendTo(first_column); column_counter = 2;}
        else {$(this).appendTo(second_column); column_counter = 1;}
        if ($("#news .post").length == 1){
            $("#news").append(first_column).append(second_column);
        }
    });

    $('body').show();

// !Back to Top
    $('.back-to-top').live('click', function(event){
        $('body,html').animate({scrollTop: 0}, duration);
        return false;
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    });
// !Next page
    $('#home .next').live('click', function(event){
        if( !$(this).is(':animated')) {
            //Initialize
            $('.back-to-top').fadeOut();

            //animate next to active
            $('#content .next').animate({'left' : '5%', 'margin-right' : '6%', 'margin-left' : '6%', 'backgroundColor' : '#FFFFFF' }, duration, easing, function(){$(this).addClass('active').removeClass('next');}).find('.page-number').fadeIn().find('.back-to-top').fadeIn();

            //animate active to previous
            $('#content .active').animate({'left' : '-73%', 'margin-right' : '0%', 'margin-left' : '0%', 'backgroundColor' : '##EFF0F1' }, duration, easing, function(){$(this).addClass('previous').removeClass('active');}).find('.page-number').fadeOut().find('.back-to-top').fadeOut();;

            //animate previous to next
            $('#content .previous').css({ 'left' : '-73%'}).animate({'left' : '-151%'}, duration, easing, function(){$(this).remove();})
                .clone().addClass('next').removeClass('previous').appendTo('#content').css({ 'left' : '173%'}).animate({'left' : '95%'}, duration);

            //animate menu
            $('#navigation').css('text-align','left');
            $('#navigation .previous').animate({'width' : '0', 'opacity' : '0'}, duration, easing, function(){
                $(this).addClass('next').removeClass('previous').appendTo('#navigation').css({ 'width' : '33.3%'}).fadeTo(duration, 1);});
            $('#navigation .active').addClass('previous').removeClass('active');
            $('#navigation .next').addClass('active').removeClass('next');
            event.stopPropagation();
            return false;

            //Button up
            $('.back-to-top').fadeIn();
        }
    });

// !Prev page
    $('#home .previous').live('click', function(event){
        if( !$(this).is(':animated')) {
            //Initialize
            $('.back-to-top').fadeOut();

            //animate next to active
            $('#content .previous').css({ 'left' : '-73%'}).animate({'left' : '5%', 'margin-right' : '6%', 'margin-left' : '6%', 'backgroundColor' : '#FFFFFF' }, duration, easing, function(){$(this).addClass('active').removeClass('previous');}).find('.page-number').fadeIn(duration,'easeInOutCubic').find('.back-to-top').fadeIn();

            //animate active to previous
            $('#content .active').animate({'left' : '95%', 'margin-right' : '0%', 'margin-left' : '0%', 'backgroundColor' : '##EFF0F1' }, duration, easing, function(){$(this).addClass('next').removeClass('active');}).find('.page-number').fadeOut().find('.back-to-top').fadeOut();

            //animate previous to active
            $('#content .next').animate({'left' : '173%'}, duration, easing, function(){$(this).remove();})
                .clone().addClass('previous').removeClass('next').prependTo('#content').css({'left' : '-151%'}).animate({'left' : '-73%'}, duration);

            //animate menu
            $('#navigation').css('text-align','right');
            $('#navigation .next').animate({'width' : '0', 'opacity' : '0'}, duration, easing, function(){
                $(this).addClass('previous').removeClass('next').prependTo('#navigation').css({ 'width' : '33.3%'}).fadeTo(duration, 1);});
            $('#navigation .active').addClass('next').removeClass('active');
            $('#navigation .previous').addClass('active').removeClass('previous');
            event.stopPropagation();
            return false;

            //Button up
            $('.back-to-top').fadeIn();
        }
    });
});
