import { useEffect, useState } from 'react'
import ChatMessage from './ChatMessage'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from '../utils/chatSlice'
import { generate, randomMessage } from '../utils/helper'

const LiveChat = () => {
  const dispatch = useDispatch()
  const message = useSelector((store) => store.chat.message)

  const [liveMessage, setLiveMessage] = useState('')
  useEffect(() => {
    const timer = setInterval(() => {
      // whenever we use setinterval or set timer we need to clear it out

      dispatch(
        addMessage({
          name: generate(),
          message: randomMessage(5),
        })
      )
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <div className="w-full h-[600px] ml-2 p-2 border border-black bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse">
        <div>
          {message.map((m, index) => (
            <ChatMessage key={index} name={m.name} message={m.message} />
          ))}
        </div>{' '}
      </div>
      <form
        className="w-full p-2 ml-2 border border-black flex"
        onSubmit={(e) => {
          e.preventDefault()
          dispatch(addMessage({ name: 'Savio', message: liveMessage }))
          setLiveMessage('')
        }}
      >
        {' '}
        <input
          className="px-2 w-96"
          type="text"
          placeholder="type a message"
          value={liveMessage}
          onChange={(e) => {
            setLiveMessage(e.target.value)
          }}
        />{' '}
        <button className="px-2 mx-2 bg-green-100"> send </button>
      </form>
    </>
  )
}

export default LiveChat
