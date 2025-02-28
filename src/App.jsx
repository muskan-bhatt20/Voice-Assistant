import './App.css'
import { CiMicrophoneOn } from "react-icons/ci";
import speakimg from "./assets/speak.gif"
import va from "./assets/cute.webp"
import img from "./assets/aiVoice.gif"
import { useContext, useState } from 'react';
import { dataContext } from './context/UserContext';
function App() {
 const {recognition,speaking,setSpeaking,recogTxt,response,setResponse}= useContext(dataContext)
 console.log(import.meta.env.VITE_API_KEY)
  return (
    <>
     <div className='main'>
      <img src={va} alt=""  id='NOVA'/>
      <span>I'm NOVA, Your Advanced Virtual Assistant</span>
      {!speaking?
      <button onClick={() =>{ setSpeaking(true)
        setResponse(false)
      recognition.start()}}>Click here<CiMicrophoneOn /></button>
      :
      <div className='image'>
       {!response?
       <img src={speakimg} alt="" id='speakimg' />
        :
       <img src={img} alt="" id='speakimg' />
        }
   
    <p>{recogTxt}</p>
      </div>
      }
    
     </div>
    </>
  )
}

export default App
