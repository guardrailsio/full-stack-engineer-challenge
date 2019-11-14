const setup = (open, listener) => {
  var announce = new WebSocket(
    'wss://connect.websocket.in/GuardDat?room_id=announce'
  )

  announce.onopen = function (event) {
    open()
  }

  announce.onmessage = function (event) {
    listener()
  }
}

module.exports = setup
