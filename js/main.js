$(document).ready(function(){
    var startVal = parseFloat($('.time').attr('value'));
    $(".time").knob({
        width: 100,
        height: 100,
        'min':0,
        'max': startVal,
        readOnly: true,
        step: 0.01,
        fgColor: 'hsl(120, 100%, 80%)',
        inputColor: 'hsl(120, 100%, 80%)',
        font: 'Roboto'
    });

    $('.button:not(#back-btn)').click(function(){
        if (!($(this).hasClass('down'))) {
            $('.button').removeClass('down');
            $(this).addClass('down');
        }
    });

    $('#edit-btn').click(function(){
        size=6;
        col='#000000';
    });

    $('#delete-btn').click(function(){
        size=25;
        col='#ffffff';
    });

    $('#back-btn').click(function() {

        if ($('#back-btn-menu').css("display")=="block") {
            $('#back-btn-menu').css({"display":""});
        }
        else $('#back-btn-menu').css({"display":"block"});

    });

    $('#back-btn-menu').click(function() {
        if ($(this).css("display")=="block") {
            $('.page-wrapper').hide();
            $('#countdown-modal').modal('hide');
            $('#home-page').show();
            $("#nav-btn").removeClass("hidden");
            $("#play-nav > .button").addClass("hidden");
        }
    });

});

var imagesource='http://businessnetworking.com/wp-content/uploads/2012/04/happy-face.jpg';

/**
 * Determine the room to enter from the URL hash
 * @returns Number target room
 */
function getTargetRoom() {
    hash = window.location.hash
    if (hash[0] == "#") {
        return parseInt(hash.substr(1));
    } else {
        return -1;
    }
}

var client;
require(['../classes/' + 'Client'], function (Client) {
    client = new Client();
    client.onReady(function() {
        client.onUpdate('running', function(isRunning) {
            if (isRunning) {
                console.log("Room started");
                startGame(imagesource, 1000, client.room.get('settings')['runTime']);
            }
        });
    });
});

function switchPage(id) {
    console.log("switchPage: id", id);
    var newp = $(document.getElementById(id));
    newp.css('z-index',10).show();
    $('.page-wrapper').each(function() {
        if($(this).attr('id')!=id) {
            $(this).hide();
        }
    });
    if (id=='play-page') {
        $("#nav-btn").addClass("hidden");
        $("#play-nav > .button").removeClass("hidden");
        $("#action-title").text("Game Name");
        stage.clear();
    }
    if (id=='end-page') {
        $("#nav-btn").addClass("hidden");
        $('#countdown-modal').modal('hide');
        $("#action-title").text("Match Results");
        $("#play-nav > .button:not(#back-btn)").addClass("hidden");
        $("#back-btn").css({"display":"block!important"});

    }
    newp.css('z-index','');
}


setTimeout(function() {
    window.testgame2 = new Game(imagesource, 5000, 1000);
    testgame2.start();
}, 1000);