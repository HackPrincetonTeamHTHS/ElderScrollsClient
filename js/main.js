$(document).ready(function () {
    var startVal = parseFloat($('.time').attr('value'));
    $(".time").knob({
        width: 100,
        height: 100,
        'min': 0,
        'max': startVal,
        readOnly: true,
        step: 0.01,
        fgColor: 'hsl(120, 100%, 80%)',
        inputColor: 'hsl(120, 100%, 80%)',
        font: 'Roboto'
    });

    $('.button:not(#back-btn)').click(function () {
        if (!($(this).hasClass('down'))) {
            $('.button').removeClass('down');
            $(this).addClass('down');
        }
    });

    $('#edit-btn').click(function () {
        size = 6;
        col = '#000000';
    });

    $('#delete-btn').click(function () {
        size = 25;
        col = '#ffffff';
    });

    $('#back-btn').click(function () {

        if ($('#back-btn-menu').css("display") == "block") {
            $('#back-btn-menu').css({"display": ""});
        }
        else $('#back-btn-menu').css({"display": "block"});

    });

    $('#back-btn-menu').click(function () {
        if ($(this).css("display") == "block") {
            switchPage('home-page');
        }
    });

});

var imagesource='http://businessnetworking.com/wp-content/uploads/2012/04/happy-face.jpg';

var client, currentGame;
require(['../classes/' + 'Client'], function (Client) {
    client = new Client();
    client.onReady(function () {
        var $roomListContainer = $('.the-room-listing').first();

        client.onUpdate('running', function (isRunning) {
            if (isRunning) {
                console.log("Room started");
                stopCurrentGame();
                var runTime = client.room.get('settings')['runTime'];
                var finishTime = client.room.get('settings')['finishTime'];
                var image = 'data:image/png;base64,' + client.room.get('currentImage')['image'];
                currentGame = new Game(image, runTime, finishTime);
                currentGame.start();
            }
        });

        client.socket.on('roomSummary', function(data) {
            console.log(data);

            // Filter out the lobby from the room listing
            data = _.filter(data, function(item) {
                return item['id'] != -1;
            });

            var difficultyMap = {
                1: 'easy',
                2: 'medium',
                3: 'hard'
            };

            $roomListContainer.html("");
            // Create each room element
            _.each(data, function(item) {
                item['difficultyString'] = difficultyMap[item['difficulty']];
                var html = _.template('<a class="row descrip" data-room-id="<%= id %>" href="#"><div class="diff <%= difficultyString %>"></div><div class="game-info"><div class="game-title"><%= name %></div><div class="player-count"><%= playerCount %> players</div><div class="game-time"><%= runTime %> sec</div></div></a>', item);
                $(html).appendTo($roomListContainer);
            });
        });

        $roomListContainer.delegate('a.descrip', 'click', function(e) {
            var roomId = $(e.target).attr('data-room-id');
            console.log(roomId);
            joinRoom(client, roomId);
            e.preventDefault();
        });

        setInterval(function() {
            var canvasData = document.getElementById('the-canvas').toDataURL();
            console.log(canvasData);
            client.me.set('drawingData', canvasData);
        }, 1000);
    });
});

function joinRoom(client, id) {
    client.me.changeRoom(id);
}

function leaveRoom(client) {
    client.me.changeRoom(-1);
}

function stopCurrentGame() {
    if (typeof currentGame !== 'undefined' && typeof currentGame.stop === 'function') {
        currentGame.stop();
    }
}

function switchPage(id) {
    var newp = $(document.getElementById(id));
    newp.css('z-index', 10).show();
    $('.page-wrapper').each(function () {
        if ($(this).attr('id') != id) {
            $(this).hide();
        }
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