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
      @setModalMessage 'Ready...'
    @timeline[1000] = () ->
      @setModalMessage 'Go!'
    @timeline[1500] = () ->
      $('#countdown-modal').modal('hide')
      @flashPreview()
    @timeline[1500 + 2000] = () ->
      @animateTimer @runTime
    @timeline[1500 + 2000 + @runTime] = () ->
      $('#countdown-modal').modal('show')
      @setModalMessage 'Time\'s Up!'
    @timeline[1500 + 2000 + @runTime + 500] = () ->
      window.switchPage 'end-page'
      @animateMeter @finishTime
    @timeline[1500 + 2000 + @runTime + 500 + @finishTime] = () ->
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
      try clearTimeout timeoutId
      catch e
    for intervalId in @intervalList
      try clearInterval intervalId
      catch e
    for animation in @animations
      try animation.stop()
      catch e
#    window.switchPage('home-page')

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
        if (this.value/max > 0.5)
          hue=240
        if (this.value/max < 0.5 && this.value/max >= 0.25)
          hue = ((.5*max-this.value)/(.25*max))*120+240
        if (this.value/max <=0.25)
          hue=360
        dial.val(this.value).trigger('change').trigger 'configure', {
          fgColor: 'hsl('+hue+', 100%, 50%)',
          inputColor: 'hsl('+hue+', 100%, 50%)'
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