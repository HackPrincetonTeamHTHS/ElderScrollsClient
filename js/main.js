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
            stopCurrentGame();
            switchPage('home-page');
        }
    });

});

var imagesource='http://businessnetworking.com/wp-content/uploads/2012/04/happy-face.jpg';

var client, currentGame;
var currentRoomId = -1;
require(['../classes/' + 'Client'], function (Client) {
    client = new Client();
    window.client = client;
    client.onReady(function () {
        var $roomListContainer = $('.the-room-listing').first();
        var $roomScoresContainer = $('#leaderboard-wrapper');
        var $roomFinishContainer = $('.card-container').first();

        client.onUpdate('running', function (isRunning) {
            if (isRunning) {
                console.log("Room started");
                stopCurrentGame();
                currentRoomId = client.room['id'];
                var runTime = client.room.get('settings')['runTime'];
                var finishTime = client.room.get('settings')['finishTime'];
                var image = 'data:image/png;base64,' + client.room.get('currentImage')['image'];
                currentGame = new Game(image, runTime, finishTime);
                currentGame.start();
            } else {
                try {
                    var roundStats = client.room.get('roundStats');
                    console.log('roundStats', roundStats);
                    var template = '<div class="card"><div align="center"><img class="profile" src="<%= drawingData %>"></div><div class="card-caption"><%= name %><div class="card-desc"><%= drawingScore %></div></div></div>';

                    $roomFinishContainer.html('');
                    var imageData = 'data:image/png;base64,' + client.room.get('currentImage')['image'];
                    $(_.template(template, {drawingData: imageData, name: 'Original Image', drawingScore:''})).appendTo($roomFinishContainer);
                    _.each(roundStats, function(item) {
                        var html = _.template(template, item);
                        $(html).appendTo($roomFinishContainer);
                    });
                    currentGame.finish(roundStats);
                } catch (e) {
                    console.log(e);
                }
            }
        });

        client.socket.on('roomSummary', function(data) {
            console.log(data);

            // Filter out the lobby from the room listing
            data = _.filter(data, function(item) {
                return item['id'] != -1;
            });

            // Update the room listing if the user is currently in the lobby
            if (currentRoomId == -1) {
                var difficultyMap = {
                    1: 'easy',
                    2: 'medium',
                    3: 'hard'
                };

                $roomListContainer.html("");
                // Create each room element
                _.each(data, function(item) {
                    item['difficultyString'] = difficultyMap[item['difficulty']];
                    var html = _.template('<a class="row descrip" data-room-id="<%= id %>" href="#"><div class="diff <%= difficultyString %>"></div><div class="game-info"><div class="game-title"><%= name %></div><div class="player-count"><%= playerCount %> players</div><div class="game-time"><%= runTime/1000 %> seconds per round</div></div></a>', item);
                    $(html).appendTo($roomListContainer);
                });
            } else {
                // Update the room scores if the user is currently in a room
                data = _.find(data, function(item) {
                    return item['id'] == currentRoomId;
                });

                $roomScoresContainer.html("");
                // Create each score element
                _.each(data.userScores, function(item) {
                    var html = _.template('<div class="player"><div class="name"><%= name %></div><div class="score"><%= drawingScore %></div></div>', item);
                    $(html).appendTo($roomScoresContainer);
                })
            }


        });

        $roomListContainer.delegate('a.descrip', 'click', function(e) {
            var roomId = $(e.target).attr('data-room-id');
            console.log(roomId);
            $('.modal-stuff p').html('Loading...');
            $('#countdown-modal').modal('show');
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
    currentRoomId = -1;
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