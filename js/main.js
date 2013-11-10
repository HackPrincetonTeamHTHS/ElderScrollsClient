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
    var counter = $('#countdown-modal span');
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
$('#countdown-modal').modal('hide');

startGame(imagesource, 1, 5);