function nextRoundCountdown(startVal) {
    $('#next-round-timer').html(startVal.toString());
    var downcount = setTimeout(function(){
        $('#next-round-timer').html(Math.round((parseFloat($('#next-round-timer').html())-.1)*100)/100);
        if (parseFloat($('#next-round-timer').html())<=0) {
            console.log('Next Round Beginning!');
        } else {
            setTimeout(arguments.callee, 100);
        }
    }, 100);
}

nextRoundCountdown(10);