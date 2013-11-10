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

    $('.button').click(function(){
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
    $('#next-round-timer').html(time/1000);
    var start = new Date().getTime();
    var interval = setInterval(function() {
        var now = time-(new Date().getTime()-start);
        if( now < 0) {
            clearInterval(interval);
            complete();
        }
        else updateMeter(now);
    },10);
}
function updateMeter(time) {
    var newnum = (Math.round(time/100)/10).toString();
    if (newnum.length==1) {
        newnum=newnum+'.0';
    }
    $('#next-round-timer').html(newnum);
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
var gameStarted = false;
function startGame(img, time1, time2) {
    if (gameStarted) {
        return;
    }
    gameStarted = true;

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
                console.log(img);
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
    setTimeout(function() {
        window.location = "../end/index.html";
    }, 3000);
}
$('#countdown-modal').modal('show');

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
    $('.page-wraper').each(function() {
        if($(this).attr('id')!=id) {
            $(this).hide();
        }
    });
    newp.css('z-index','');
}