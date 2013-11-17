$(document).ready(function () {

    /*$.ajax({
     url:"/ajax/getcurrentgames",
     type:"GET",
     dataType: "json",
     success: function(data) {

     $.each(data, function(i, obj) {
     $(".container#main").append('<a class="row descrip"><div class="diff medium"></div><div class="game-info"><div class="game-title">;lklk</div><div class="player-count">13 players</div><div class="game-time">15 sec </div></div></a>');
     });
     }

     });*/

    var highlight = "#00d1a8";
    $(".container.navigation, #shadow").click(function () {
        $(".collapsable").toggleClass("collapsed");
        $(".container.navigation").css({"background-color": highlight}).animate(
            {"background-color": "#004b91"}, 500);
        $(this).queue(function (next) {
            // Do some stuff...
            next();
        });
    });

    $("#back-btn").click(function () {
        $(this).css({"background-color": highlight}).animate(
            {"background-color": "#004b91"}, 500);
        $(this).queue(function (next) {
            // Do some stuff...
            next();
        });
    });

    /*$(".row.descrip").click(function () {
        var color = "#ededed"; //odd indices are white because the spinner offsets indices
        if ($(this).is(":nth-child(even)"))
            color = "#ffffff";
        $(this).css({"background-color": highlight}).animate(
            {"background-color": color}, 500);
        $(this).queue(function (next) {
            // Do some stuff...
            next();
        });
        ;
    })*/

    require(['classes/' + 'Client'], function (Client) {
        window.client = new Client();

    })
});
