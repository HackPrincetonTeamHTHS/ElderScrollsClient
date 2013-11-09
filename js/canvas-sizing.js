function sizeCanvas() {
    var container = $('#canvas-pane');
    var containerRatio = container.width() / container.height();
    var canvasWrapper = $('#canvas-wrapper');
    if (containerRatio <= 1) {
        canvasWrapper.css('width', '100%').css('height', '').css('top', (container.height() - canvasWrapper.height()) / 2);

    }
    if (containerRatio > 1) {
        canvasWrapper.css('height', '100%').css('width', canvasWrapper.height()).css('top', '');

    }

    var canvas = $('#the-canvas');
    canvas.css('transform', 'scale(' + $('#canvas-content').width() / canvas.width() + ')');

}
var canBeCalled = true;
function limitedSizeCanvas() {
    if (!canBeCalled) return;
    sizeCanvas();
    canBeCalled = false;
    setTimeout(function () {
        canBeCalled = true;
    }, 80);
}