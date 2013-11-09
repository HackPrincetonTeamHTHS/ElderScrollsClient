/**
 * Created with JetBrains PhpStorm.
 * User: andrewmillman
 * Date: 11/9/13
 * Time: 2:01 AM
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function() {

    $(".container.navigation").click(function() {
        $(".collapsable").toggleClass("collapsed");
        $(this).css({"background-color":"rgb(104, 173, 226)"}).animate(
           {"background-color":"#8e44ad"},500);
    });

});