import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null)
  const [latestMessage, setLatestMessage] = useState("")
  const [messages, setMessages] = useState("")

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080")
    socket.onopen = () => {
      console.log("Connected")
      setSocket(socket)
    }
    socket.onmessage = (message) => {
      console.log('Received message:', message.data)
      setLatestMessage(message.data)
    }
    socket.onclose = () => {
      console.log("Disconnected")
    }
    return () => {
      socket.close()
    }
  }, [])

  if (!socket) {
    return (
      <>
        <p>Loading...</p>
      </>
    )
  }

  return (
<div>

<input type="text" onChange= {e => setMessages(e.target.value)} />
<button onClick={() => socket.send(messages)}>Send</button>

{latestMessage}
</div>
  )
}

export default App
