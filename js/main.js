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


dial = $('.time');
function startTimer(time,complete) {
    var maxt = time/1000;
    var start = new Date().getTime();
    dial.val(time/1000).attr('value', time/1000).trigger('change').trigger('configure', {
        'min':0,
        'max': maxt
    });
    var interval = setInterval(function() {
        var now = time-(new Date().getTime()-start);
        if( now < 0) {
            clearInterval(interval);
            complete();
        }
        else updateDial(now, maxt*1000);
    },10);
}
function updateDial(time, max) {
    var hue = time/max*120;
    console.log(hue);
    dial.val(time/1000).attr('value', time/1000).trigger('change').trigger('configure', {
        fgColor: 'hsl('+hue+', 100%, 80%)',
        inputColor: 'hsl('+hue+', 100%, 80%)'
    });
}

var imagesource='http://businessnetworking.com/wp-content/uploads/2012/04/happy-face.jpg';
function showPreview(img, time, callback) {
    $('#preview').attr('src', img);
    $('#preview-content').css('display','block');
    startTimer(time, function() {
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
            startTimer(time2, function() {
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
