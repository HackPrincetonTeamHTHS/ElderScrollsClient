/*nextRoundCountdown(5000, function(){
    window.location = "../play/index.html";
});*/

function nextRoundCountdown(time,complete) {
    $('#next-round-timer').html(time/1000);
    var start = new Date().getTime();
    var interval = setInterval(function() {
        var now = time-(new Date().getTime()-start);
        if( now < 0) {
            clearInterval(interval);
            complete();
        }
        else updateMeter(now);
    },10);
}
function updateMeter(time) {
    var newnum = (Math.round(time/100)/10).toString();
    if (newnum.length==1) {
        newnum=newnum+'.0';
    }
    $('#next-round-timer').html(newnum);
}