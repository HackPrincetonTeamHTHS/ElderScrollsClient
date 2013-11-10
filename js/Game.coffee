class Game
  constructor: (@image, @runTime, @finishTime) ->
    @timeoutList = []
    @intervalList = []
    @animations = []
    @started = false
    @callback = () ->

    @timeline = {}
    @timeline[0] = () ->
      window.switchPage 'play-page'
      $('#countdown-modal').modal('show')
      @setModalMessage '3...'
    @timeline[1000] = () ->
      @setModalMessage '2...'
    @timeline[2000] = () ->
      @setModalMessage '1...'
    @timeline[3000] = () ->
      @setModalMessage 'GO!'
    @timeline[3500] = () ->
      $('#countdown-modal').modal('hide')
      @flashPreview()
    @timeline[3500 + 2000] = () ->
      @animateTimer @runTime
    @timeline[3500 + 2000 + @runTime] = () ->
      $('#countdown-modal').modal('show')
      @setModalMessage 'Time\'s Up!'
    @timeline[3500 + 2000 + @runTime + 1000] = () ->
      window.switchPage 'end-page'
      @animateMeter @finishTime
    @timeline[3500 + 2000 + @runTime + 1000 + @finishTime] = () ->
      @callback()

  setTimeout: (f, time) ->
    i = setTimeout(f, time)
    @timeoutList.push i

  setInterval: (f, time) ->
    i = setInterval(f, time)
    @intervalList.push i

  setModalMessage: (message) ->
    $('.modal-stuff p').html message

  start: (callback = () ->) ->
    if @started
      return false
    @started = true

    @callback = callback
    _this_ = this
    for time, f of @timeline
      console.log "start: time", time
      f2 = (f3) ->
        return () ->
          console.log 'abc'
          f3.bind(_this_)()
      @setTimeout f2(f), time

    return true

  updateScores: (scores) ->
    # TODO: updateScores()

  stop: () ->
    for timeoutId in @timeoutList
      clearTimeout timeoutId
    for intervalId in @intervalList
      clearInterval intervalId
    for animation in @animations
      animation.stop()
    window.switchPage('home-page')

  flashPreview: (callback = () ->) ->
    $('#preview').attr('src', @image)
    $('#preview-content').css('display','block')
    @animateTimer 2000, () =>
      a = $('#preview-content').fadeOut 100, () ->
        $('#preview').attr('src', '')
        callback()
      @animations.push a

  animateTimer: (time, callback = () ->) ->
    max = time/1000
    dial = $('.time')

    dial.trigger 'configure', {
      'min': 0,
      'max': max
    }

    a = $({value: max}).animate {value: 0}, {
      duration: time,
      easing: 'linear',
      step: () ->
        hue = this.value/max*120;
        dial.val(this.value).trigger('change').trigger 'configure', {
          fgColor: 'hsl('+hue+', 100%, 80%)',
          inputColor: 'hsl('+hue+', 100%, 80%)'
        }
      complete: callback
    }
    @animations.push a

  animateMeter: (time, callback = () ->) ->
    a = $({value: 0}).animate {value: 100}, {
      duration: time,
      easing: 'linear',
      step: () ->
        pwidth = this.value + '%';
        $('#loading-bar').css('width', pwidth)
      complete: callback
    },
    @animations.push a

window.Game = Game