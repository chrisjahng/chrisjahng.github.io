//resize functions
function ancho() {
    var myWidth = 0,
        myHeight = 0;
    if (typeof(window.innerWidth) == 'number') {
        //Non-IE
        myWidth = window.innerWidth;
    } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        //IE 6+ in 'standards compliant mode'
        myWidth = document.documentElement.clientWidth;
    } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
        //IE 4 compatible
        myWidth = document.body.clientWidth;
    }
    if (device==1) {
        w=940;
        if (mobile==1) w=640;
        return w;
    } else {
        return myWidth-15 ;
    }
}

function alto() {
    var myWidth = 0,
        myHeight = 0;
    if (typeof(window.innerWidth) == 'number') {
        //Non-IE
        myHeight = window.innerHeight;
    } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        //IE 6+ in 'standards compliant mode'
        myHeight = document.documentElement.clientHeight;
    } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
        //IE 4 compatible
        myHeight = document.body.clientHeight;
    }
    return myHeight;
}


function resiz() {

    menuan=ancho()/2;
    menuan=650;
    //$('#cabecera').width(menuan);
    //$('#cabecera').css('margin-left',-menuan/2);


    $('.videoplayer').each(function() {
        prop=parseFloat($(this).attr('prop'));
        $(this).height(Math.floor($(this).width()/prop));
    });






}

function masonry_refresh(){

    $('#intro').height(alto());

    //$('.fotolist, .prolist').fadeIn();
    doscrollthings();
    setTimeout("$('#superpage').height($('#page_"+apsel+"').height());",100);
}


function doscrollthings() {

    sc=$(window).scrollTop();
    $("#page_"+apsel+" .cuad:not(.cuadshow)").each(function() {
        //console.log(this.id);
        desf=0;
        posy=$(this).position().top+desf;
        if (posy<(alto()+sc)) {
            r=Math.random()*500;
            setTimeout("$('#"+this.id+"').switchClass('cuadhide','cuadshow');",r);

        }

    });
}

var hashspeed=600;


function changehash(hash,speed) {

    if (hash=='') hash=ap;

    apsel=hash;
    c=$('#bot_'+hash).attr('class');
    if (c=='menuright') {

        $('.menuleft').attr('class','menuleft2');
        $('.menucenter').attr('class','menuleft');
        $('.menuright').attr('class','menucenter');
        setTimeout("$('.menuleft2').attr('class','menuright2'); ",500);
        setTimeout("$('.menuright2').attr('class','menuright');",900);

        $('.pageleft').attr('class','page pageleft2');
        $('.pagecenter').attr('class','page pageleft');
        $('.pageright').attr('class','page pagecenter');
        setTimeout("$('.pageleft2').attr('class','page2 pageright'); ",700);

    }
    if (c=='menuleft') {
        $('.menuright').attr('class','menuright2');
        $('.menucenter').attr('class','menuright');
        $('.menuleft').attr('class','menucenter');
        setTimeout("$('.menuright2').attr('class','menuleft2'); ",500);
        setTimeout("$('.menuleft2').attr('class','menuleft');",900);

        $('.pageright').attr('class','page pageright2');
        $('.pagecenter').attr('class','page pageright');
        $('.pageleft').attr('class','page pagecenter');
        setTimeout("$('.pageright2').attr('class','page2 pageleft'); ",700);

    }

    //alert($('.pagecenter .projecto_ficha').length);
    if ($('.pagecenter .projecto_ficha').length>0) {
        $.get( "/includes/ajax_prolist.php", function( data ) {
            $( "#projlist" ).html( data );
            $('.footer').show();
            resiz();
            setTimeout("$('#superpage').height($('.pagecenter').height());",300);
            doscrollthings();
            prepareformobile()
            //alert( "Load was performed." );
        });

    }

    if ($('.pagecenter .lab_ficha').length>0) {
        $.get( "/includes/ajax_lablist.php", function( data ) {
            $( "#lablist" ).html( data );
            $('.footer').show();
            resiz();
            setTimeout("$('#superpage').height($('.pagecenter').height());",300);
            doscrollthings();
            $('.fondolab').fadeIn();
            prepareformobile()
            //alert( "Load was performed." );
        });

    }

    if (apsel=='lab') { $('.fondolab').fadeIn(); } else { $('.fondolab').fadeOut(); }

    $('#superpage').height($('#page_'+hash).height());
    doscrollthings();

}

var intro=0;
if (device) intro=0;
if (ap!='home') intro=0;
var moves=0;
var hash;

function inicio() {
    var wait=200;
    jQuery.easing.def = 'easeInOutCubic';

    $(document).ready(function() {
        $(window).keydown(function(event){
            if(event.keyCode == 13) {
                event.preventDefault();
                return false;
            }
        });
    });

    if (device==0) {
        $(window).resize(function() {
            resiz();
        });
    }

    $(window).scroll(function() {
        if ((intro==1)) { intro=0; setTimeout("showall();",400); }
        doscrollthings();
    });


    $(window).bind('hashchange', function() { //detect hash change
        var hash = window.location.hash.slice(1); //hash to string (= "myanchor")
        changehash(hash);
    });

    hash = window.location.hash.slice(1);
    if (hash!='') {
        setTimeout("changehash('"+hash+"',0);",20);
        if (ap=='home') wait=0;
    }



    $('#logo').fadeIn(500);
    $('#superpage').height(2000);
    //resiz();
    setTimeout("resiz();",600);

    if ((intro==1) && (hash=='')) {
        $('.footer').hide();
        $('.page').css('background-color','#fff');
        $('#intro').fadeIn(1000);
        setTimeout("seintro();",800);

    } else {
        intro==0;

        showall();
    }

    prepareformobile();



}

function prepareformobile() {
    if (device==1) {
        $('.procuad .supera').hide();
        $('.procuad').mouseenter(function() {
            $('.supera',this).show();
        });
        $('.procuad').mouseleave(function() {
            $('.supera',this).hide();
        });

        $('.fotolist .procuad .labhover').hide();

        $('.fotolist .procuad').mouseenter(function() {
            $('.labhover',this).show();
        });
        $('.fotolist .procuad').mouseleave(function() {
            $('.labhover',this).hide();
        });

    }
}

function seintro() {
    $(window).mousemove(function( event ) {
        moves++;
        if ((moves>45) && (intro==1)) { intro=0; setTimeout("showall();",20); }
    });
    $(window).mouseup(function( event ) {

        if ((intro==1)) { intro=0; setTimeout("showall();",20); }
    });
}

function showall() {
    $('#intro').stop().fadeOut(600);
    $('#superpage').fadeIn(400);
    dur=600;
    //if ((hash!='') || (ap!='home')) dur=0;
    setTimeout("$('#menu').animate({'margin-top':32,'opacity':1},"+dur+");",50);
    setTimeout("resiz();",30);
    //$('#superpage').height($('#page_'+apsel).height());
    $('.footer, h4').fadeIn();
    if (fsolo!=1) $('.page').css('background-color','#eff0f1; ');
    if (device==0)  if (ap=='lab') $('.fondolab').fadeIn();
}

function showinfo() {

    if ($('.projcolmas').hasClass('mas1')) {
        $('.proinfo').slideDown(400);
        $('.projcolmas').attr('class','projcolmas mas2');
        setTimeout("resiz();",500);
    } else {
        $('.proinfo').slideUp(200);
        $('.projcolmas').attr('class','projcolmas mas1');
        setTimeout("resiz();",500);
    }




}

