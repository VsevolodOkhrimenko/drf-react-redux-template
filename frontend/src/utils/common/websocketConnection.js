// import notificationSound from 'static/sounds/notification.wav'
import { setSnackbar } from 'utils/common/actions'
import Config from 'config'


const { wsUrl } = Config.network
let ws = null
let tryReconnect = true
// const notificationAudio = new Audio(notificationSound)

export const closeWebsocketConnection = () => {
  if (ws) {
    tryReconnect = false
    ws.close()
    ws = null
  }
}

const websocketConnection = (authToken) => {
  return (dispatch) => {
    let connectionAttempts = 0

    tryReconnect = true

    // notificationAudio.load()
    // notificationAudio.type = ' audio/wav'

    // function playAudio(audio) {
    //   const playPromise = audio.play()
    //   if (typeof playPromise !== 'undefined') {
    //     playPromise.then(function () {
    //     }).catch(function (error) {
    //       console.log(error)
    //     })
    //   }
    // }

    const wsOpen = () => {
      console.log('openConnection')
    }

    const wsError = () => {}

    const wsMessage = (event) => {
      console.log(event)
      const parsed = JSON.parse(event.data)
      console.log(parsed)
      // if (parsed.type === 'request.send') {
      //   dispatch(wsAppendRequest(parsed.payload))
      // } else if (parsed.type === 'notification.send') {
      //   dispatch(wsAppendNotification(parsed.payload))
      // }
    }

    const wsClose = () => {
      connectionAttempts = connectionAttempts + 1
      if (connectionAttempts < 3 && tryReconnect) {
        console.log('Connection closed. Try to reconnect in 3 sec...')
      }
      if (connectionAttempts === 3) {
        console.log('WebSocket connectin error. Please reload the page')
        dispatch(setSnackbar('WebSocket connectin error. Please reload the page', 'error'))
      }
      setTimeout(() => {
        connect()
      }, 3000)
    }

    const connect = () => {
      const endpoint = `${wsUrl}/notifications/`
      const authHeader = 'Token'
      if (authToken) {
        ws = new WebSocket(endpoint, [authHeader, authToken])
        ws.onmessage = wsMessage
        ws.onopen = wsOpen
        ws.onerror = wsError
        ws.onclose = wsClose
        connectionAttempts = 0
        dispatch(setSnackbar(null))
      }
    }

    connect()
  }
}

export default websocketConnection
