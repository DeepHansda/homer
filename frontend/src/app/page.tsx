"use client";

import Chat from "@/componets/chat";
import { AppContext } from "@/componets/mainLayout";
import { useVoiceRecorder } from "@/lib/useVoiceRecorder";
import { Button, Chip, Spacer } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const [streamingData, setStreamingData] = useState("");
  const {designations,getAllDesignations,messages} = useContext(AppContext)

  const { recording, previewAudio, startRecording, stopRecording } =
    useVoiceRecorder({ setStreamingData });

  console.log(streamingData);

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

  console.log(previewAudio);

  return (
    <main className="px-8">
      <div className="my-6">
        {
          designations?.map((designation) => (
            <Button size="sm" radius="sm" variant="shadow" color="secondary" className="uppercase">
              {designation?.title}
            </Button>
          ))
        }
      </div>
      
      <div className="flex flex-col gap-y-8">
        {messages && <p>{messages}</p>}
        <Chat/>
        <Chat/>
        <Chat/>
        <Chat/>

      </div>
    </main>
  );
}
