$(document).ready(function() {

    var highlight = "#90a9ec";
    $(".container.navigation, #shadow").click(function() {
        $(".collapsable").toggleClass("collapsed");
        $(".container.navigation").css({"background-color":highlight}).animate(
           {"background-color":"#4575d4"},500);
        $(this).queue(function( next ) {
                // Do some stuff...
                next();
            });
    });

    $(".row.descrip").click(function() {
        var color = "#ededed"; //odd indices are white because the spinner offsets indices
        if ($(this).is(":nth-child(even)"))
            color = "#ffffff";
        $(this).css({"background-color":highlight}).animate(
            {"background-color":color},500);
        $(this).queue(function( next ) {
                // Do some stuff...
                next();
            });;
    })

    require(['classes/' + 'Client'], function(Client) {
        window.client = new Client();

    })
});