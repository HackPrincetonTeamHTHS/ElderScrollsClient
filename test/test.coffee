require ['../classes/' + 'Client'], (Client) ->
  window.c = new Client

  $("#test").click (e) ->
    e.preventDefault()

    c.me.updateDrawing("" + Math.random())

  c.onReady () ->
    console.log 'ready'
    setTimeout () =>
      c.onUpdate 'running', (isRunning) ->
        console.log isRunning
        if isRunning
          $('body').css({'background-color': 'green'})
        else
          $('body').css({'background-color': 'red'})
    , 2000

window.switchToRoom = (id) ->
  window.c.me.changeRoom id