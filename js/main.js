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



function animateTimer(time, callback) {
    var max = time/1000;
    var dial = $('.time');

    dial.trigger('configure', {
        'min': 0,
        'max': max
    });

    $({value: max}).animate({value: 0}, {
        duration: time,
        easing: 'linear',
        step: function() {
            var hue = this.value/max*120;
            dial.val(this.value).trigger('change').trigger('configure', {
                fgColor: 'hsl('+hue+', 100%, 80%)',
                inputColor: 'hsl('+hue+', 100%, 80%)'
            });
        },
        complete: callback
    });
}

function nextRoundCountdown(time,complete) {
    $('#loading-bar').css('width',0);
    var start = new Date().getTime();
    var interval = setInterval(function() {
        var now = time-(new Date().getTime()-start);
        if( now < 0) {
            clearInterval(interval);
            complete();
        }
        else updateMeter(now, time);
    },10);
}
function updateMeter(time, max) {
    var pwidth = (1-time/max)*100+'%';
    $('#loading-bar').css('width',pwidth);
}

var imagesource='http://businessnetworking.com/wp-content/uploads/2012/04/happy-face.jpg';
function showPreview(img, time, callback) {
    $('#preview').attr('src', img);
    $('#preview-content').css('display','block');
    animateTimer(time, function() {
        $('#preview-content').fadeOut(100, function() {
            $('#preview').attr('src', '');
            callback();
        });
    });
}

function startGame(img, time1, time2) {

    var counter = $('.modal-stuff p');
    counter.html('3...');
    $('#countdown-modal').modal('show');
    setTimeout(function() {
        counter.html('2...');
    }, 1000);
    setTimeout(function() {
        counter.html('1...');
    }, 2000);
    setTimeout(function() {
        counter.html('GO!');
    }, 3000);
    setTimeout(function() {
        $('#countdown-modal').modal('hide');
        showPreview(img, time1, function() {
            animateTimer(time2, function() {
                counter.html("Time's Up!");
                $('#countdown-modal').modal('show');
                var img = document.getElementById("the-canvas").toDataURL("image/png")//.replace("image/png", "image/octet-stream");
                /*$.ajax({
                 url: "/tcoeff",
                 data: {"img":img},
                 type: "post",
                 success: function(d){
                 $("#results").text(d);
                 }
                 });*/
                redirectToResults();
            });
        });
    }, 3500);
}
function redirectToResults() {
    switchPage('end-page');
    $('#countdown-modal').modal('hide');
}

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

require(['../classes/' + 'Client'], function (Client) {
    window.client = new Client();
    window.client.onReady(function() {
        window.client.me.changeRoom(getTargetRoom());
        window.client.onUpdate('running', function(isRunning) {
            if (isRunning) {
                console.log("Room started");
                startGame(imagesource, 1000, window.client.room.get('settings')['runTime']);
            }
        });
    });
});
function switchPage(id) {
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
        startGame(imagesource, 1000, 5000);
    }
    if (id=='end-page') {
        $("#nav-btn").addClass("hidden");
        $('#countdown-modal').modal('hide');
        $("#action-title").text("Match Results");
        $("#play-nav > .button:not(#back-btn)").addClass("hidden");
        $("#back-btn").css({"display":"block!important"});
        nextRoundCountdown(3000, function() {
            switchPage('play-page');
        });
    }
    newp.css('z-index','');
}

startGame(imagesource, 1000, 1000);
$('#countdown-modal').modal('hide');
