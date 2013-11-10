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
        size=10;
        col='#000000';
    });

    $('#delete-btn').click(function(){
        size=30;
        col='#ffffff';
    });
});

function timesUp() {
    console.log('Done!');
}

dial = $('.time');
function startTimer(time, callback) {
    var hue=120;
    dial.val(time).attr('value', time).trigger('change').trigger('configure', {
        'min':0,
        'max': dial.attr('value')
    });
    dial.val(time).attr('value', time).trigger('change').trigger('configure', {
        'min':0,
        'max': dial.attr('value')
    });

    setTimeout(function(){
        var newtime = parseFloat(dial.val())-0.01;
        hue = newtime/parseFloat(dial.val())*120;
        dial.val(newtime).attr('value', newtime).trigger('change').trigger('configure', {
            fgColor: 'hsl('+hue+', 100%, 80%)',
            inputColor: 'hsl('+hue+', 100%, 80%)'
        });
        if (hue < 0) {
            callback();
        } else {
            setTimeout(arguments.callee, 10);
        }
    }, 10);
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
function startGame(img, time1, time2) {
    showPreview(img, time1, function() {
        startTimer(time2, function() {
            console.log('done');
        });
    });
    if (id == 'home-page') {
        stopCurrentGame();
        $('.page-wrapper').hide();
        $('#countdown-modal').modal('hide');
        $('#home-page').show();
        $("#nav-btn").removeClass("hidden");
        $("#play-nav > .button").addClass("hidden");
    }
    if (id == 'play-page') {
        $("#nav-btn").addClass("hidden");
        $("#play-nav > .button").removeClass("hidden");
        $("#action-title").text("Game Name");
        stage.clear();
        init();
        sizeCanvas();
    }
    if (id == 'end-page') {
        $("#nav-btn").addClass("hidden");
        $('#countdown-modal').modal('hide');
        $("#action-title").text("Match Results");
        $("#play-nav > .button:not(#back-btn)").addClass("hidden");
        $("#back-btn").css({"display": "block!important"});

    }
    newp.css('z-index', '');
}


setTimeout(function () {
    window.testgame2 = new Game(imagesource, 5000, 1000);
//    testgame2.start();
}, 1000);