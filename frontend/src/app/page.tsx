"use client";

import { useVoiceRecorder } from "@/lib/useVoiceRecorder";
import { useState } from "react";

export default function Home() {
  const [streamingData, setStreamingData] = useState("");

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

  console.log(previewAudio);

  return (
    <main className="">
      
    </main>
  );
}
