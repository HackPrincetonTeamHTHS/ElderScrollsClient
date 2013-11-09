function nextRoundCountdown(startVal) {
    $('#next-round-timer').html(startVal.toString());
    var downcount = setTimeout(function(){
        var newnum = (Math.round((parseFloat($('#next-round-timer').html())-.1)*100)/100).toString();
        if (newnum.length==1) {
            newnum=newnum+'.0';
        }
        $('#next-round-timer').html(newnum);
        if (parseFloat($('#next-round-timer').html())<=0) {
            console.log('Next Round Beginning!');
        } else {
            setTimeout(arguments.callee, 100);
        }
    }, 100);
}

nextRoundCountdown(10);