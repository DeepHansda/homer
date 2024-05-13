"use client";

import Chat from "@/componets/chat";
import { AppContext } from "@/componets/mainLayout";
import { useVoiceRecorder } from "@/lib/useVoiceRecorder";
import { Button, Chip, Spacer } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const {designations,messages,getAllDesignations} = useContext(AppContext);
  console.log(messages)
  // const msg = new SpeechSynthesisUtterance();
  // const speak = (msg) => {
  //   stopRecording();
  //   msg.text = text;
  //   window.speechSynthesis.speak(msg);
  // };

  // const stopVoice = () => {
  //   window.speechSynthesis.cancel();
  // }
  // useEffect(() => {
  //   speak(msg);
  // }, [text]);

  useEffect(() => {
    getAllDesignations()
  },[])


  return (
    <main className="px-8">
      {designations.length > 0  && <div className="my-6">
        {
          designations?.map((designation) => (
            <Button size="sm" radius="sm" variant="shadow" color="secondary" className="uppercase">
              {designation?.title}
            </Button>
          ))
        }
      </div>}
      
      <div className="flex flex-col gap-y-8">
        {/* {messages && <p>{messages}</p>} */}
      {messages.map((message) => (<Chat message={message}/>))}

      </div>
    </main>
  );
}
