import React, { Children, createContext, useState } from 'react'
import run from '@/gemini.js';


export const dataContext=createContext()
function UserContext({children}) {
    let[speaking,setSpeaking]=useState(false)
    let[recogTxt,setRecogTxt]=useState("listening...")
    let[response,setResponse]=useState(false)
    function speak(text){
        let txtSpeak=new SpeechSynthesisUtterance(text)
        txtSpeak.volume=1;
        txtSpeak.rate=1;
        txtSpeak.pitch=1;
        txtSpeak.lang= "hi-IN";
        window.speechSynthesis.speak(txtSpeak)
    }
    async function aiResponse(prompt){
       let text= await run(prompt)
       let newTxt = text.replace(/\*\*\*|\*\*/g, "") 
               .replace(/\*/g, "")            
               .replace(/google/gi, "Muskan Bhatt");
       setRecogTxt(newTxt)
       setResponse(true)
       speak(newTxt)
       setTimeout(()=>{
        setSpeaking(false)
       },7000)
       
    }
    let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition=new speechRecognition()
    recognition.onresult=(e) => {
       let currentIndex=e.resultIndex
       let transcript=e.results[currentIndex][0].transcript
       setRecogTxt(transcript)
       takecommand(transcript.toLowerCase())
    };
    function takecommand(command){
        if(command.includes("open")&& command.includes("youtube")){
            window.open("https://www.youtube.com/","_blank")
            speak("Opening Youtube")
            setResponse(true)
            setRecogTxt("Opening Youtube")
            setTimeout(()=>{
                setSpeaking(false)
               },5000)
            }
            else  if(command.includes("open")&& command.includes("google")){
                window.open("https://www.google.com/","_blank")
                speak("Opening Google")
                setResponse(true)
                setRecogTxt("Opening Google")
                setTimeout(()=>{
                    setSpeaking(false)
                   },5000)
                }
                else if(command.includes("time")){
                    let time = new Date().toLocaleString(undefined,{hour:"numeric", minute:'numeric'})
                    speak(time)
                    setResponse(true)
                    setRecogTxt(time)
                    setTimeout(()=>{
                    setSpeaking(false)
                   },10000)
                }
                else if(command.includes("date")){
                    let date = new Date().toLocaleString(undefined,{day:"numeric", month:'short'})
                    speak(date)
                    setResponse(true)
                    setRecogTxt(date)
                    setTimeout(()=>{
                    setSpeaking(false)
                   },8000)
                }
            else{
                aiResponse(command)
            }
    }
    const value= {
        recognition,
        speaking,setSpeaking,
        recogTxt,setRecogTxt,
        response,setResponse
    }
  return (
    <div>
        <dataContext.Provider value={value}>
        {children}
        </dataContext.Provider>
     
    </div>
  )
}

export default UserContext

